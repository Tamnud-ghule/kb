import { Express, Request, Response, NextFunction } from "express";
import { createServer, Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { db } from "./db";
import { datasets, cartItems, purchases, categories } from "@shared/schema";
import { eq, count } from "drizzle-orm";
import CryptoJS from "crypto-js";

// Secret for encryption (should be stored securely in production)
const FILE_ENCRYPTION_SECRET = process.env.FILE_ENCRYPTION_SECRET || "your-secret-key";

// Helper function to generate a secure encryption key
function generateEncryptionKey(): string {
  const randomKey = CryptoJS.lib.WordArray.random(32).toString();
  return randomKey;
}

// Helper to encrypt file content using a key
export function encryptFileContent(content: string, key: string): string {
  return CryptoJS.AES.encrypt(content, key).toString();
}

// Helper to decrypt file content using a key
export function decryptFileContent(encryptedContent: string, key: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedContent, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes and middleware
  setupAuth(app);

  // Get all categories
  app.get("/api/categories", async (req, res, next) => {
    try {
      const allCategories = await db.select().from(categories);
      res.json(allCategories);
    } catch (error) {
      next(error);
    }
  });

  // Get category by slug
  app.get("/api/categories/:slug", async (req, res, next) => {
    try {
      const slug = req.params.slug;
      const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
      
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      
      res.json(category);
    } catch (error) {
      next(error);
    }
  });

  // Contact form submission
  app.post("/api/contact", async (req, res, next) => {
    try {
      const contactData = req.body;
      
      const contactRequest = await storage.createContactRequest(contactData);
      res.status(201).json({
        success: true,
        message: "Your request has been submitted successfully.",
        id: contactRequest.id
      });
    } catch (error) {
      next(error);
    }
  });

  // Get all datasets with category information
  app.get("/api/datasets", async (req, res, next) => {
    try {
      const datasetsWithCategories = await db
        .select({
          id: datasets.id,
          title: datasets.title,
          slug: datasets.slug,
          description: datasets.description,
          price: datasets.price,
          recordCount: datasets.recordCount,
          dataFormat: datasets.dataFormat,
          updateFrequency: datasets.updateFrequency,
          lastUpdated: datasets.lastUpdated,
          previewAvailable: datasets.previewAvailable,
          categoryId: datasets.categoryId,
          category: {
            id: categories.id,
            name: categories.name,
            slug: categories.slug,
          },
        })
        .from(datasets)
        .leftJoin(categories, eq(datasets.categoryId, categories.id));
        
      res.json(datasetsWithCategories);
    } catch (error) {
      next(error);
    }
  });

  // Get dataset by ID with category information
  app.get("/api/datasets/:id", async (req, res, next) => {
    try {
      const id = parseInt(req.params.id);
      
      const [dataset] = await db
        .select({
          id: datasets.id,
          title: datasets.title,
          slug: datasets.slug,
          description: datasets.description,
          price: datasets.price,
          recordCount: datasets.recordCount,
          dataFormat: datasets.dataFormat,
          updateFrequency: datasets.updateFrequency,
          lastUpdated: datasets.lastUpdated,
          previewAvailable: datasets.previewAvailable,
          categoryId: datasets.categoryId,
          category: {
            id: categories.id,
            name: categories.name,
            slug: categories.slug,
          },
        })
        .from(datasets)
        .leftJoin(categories, eq(datasets.categoryId, categories.id))
        .where(eq(datasets.id, id));
      
      if (!dataset) {
        return res.status(404).json({ error: "Dataset not found" });
      }
      
      res.json(dataset);
    } catch (error) {
      next(error);
    }
  });

  // Cart routes (requires authentication)
  app.get("/api/cart", async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const items = await storage.getCartItems(req.user.id);
      res.json(items);
    } catch (error) {
      next(error);
    }
  });

  app.post("/api/cart", async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const { datasetId } = req.body;
      
      if (!datasetId) {
        return res.status(400).json({ error: "Missing datasetId" });
      }
      
      // Check if dataset exists
      const [dataset] = await db.select().from(datasets).where(eq(datasets.id, datasetId));
      
      if (!dataset) {
        return res.status(404).json({ error: "Dataset not found" });
      }
      
      // Add to cart
      const cartItem = await storage.addToCart(req.user.id, datasetId);
      res.status(201).json(cartItem);
    } catch (error) {
      next(error);
    }
  });

  app.delete("/api/cart/:datasetId", async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const datasetId = parseInt(req.params.datasetId);
      await storage.removeFromCart(req.user.id, datasetId);
      res.status(200).json({ message: "Item removed from cart" });
    } catch (error) {
      next(error);
    }
  });

  // Process purchase
  app.post("/api/purchase", async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      // In a real application, integrate with Stripe or another payment processor
      // For now, we'll simulate a successful purchase
      
      // Get cart items
      const cartItems = await storage.getCartItems(req.user.id);
      
      if (cartItems.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
      }
      
      // Process each item
      const purchases = [];
      
      for (const { item, dataset } of cartItems) {
        // Generate encryption key for the dataset
        const encryptionKey = generateEncryptionKey();
        
        // Create purchase record
        const purchase = await storage.createPurchase(
          req.user.id,
          dataset.id,
          dataset.price, // Use actual price from dataset
          encryptionKey
        );
        
        purchases.push({
          dataset,
          purchase,
          encryptionKey
        });
      }
      
      // Clear the cart
      await storage.clearCart(req.user.id);
      
      res.status(201).json({
        success: true,
        message: "Purchase completed successfully",
        purchases: purchases.map(p => ({
          datasetId: p.dataset.id,
          title: p.dataset.title,
          price: p.dataset.price,
          encryptionKey: p.encryptionKey
        }))
      });
    } catch (error) {
      next(error);
    }
  });

  // Get user purchases
  app.get("/api/purchases", async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const purchases = await storage.getUserPurchases(req.user.id);
      
      // Don't send the encryption key in the list view
      const safeData = purchases.map(({ purchase, dataset }) => ({
        id: purchase.id,
        datasetId: dataset.id,
        title: dataset.title,
        purchaseDate: purchase.purchaseDate,
        price: purchase.amount
      }));
      
      res.json(safeData);
    } catch (error) {
      next(error);
    }
  });

  // Get purchase details with encryption key
  app.get("/api/purchases/:datasetId", async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const datasetId = parseInt(req.params.datasetId);
      
      // Get the purchase
      const purchase = await storage.getPurchase(req.user.id, datasetId);
      
      if (!purchase) {
        return res.status(404).json({ error: "Purchase not found" });
      }
      
      // Get the dataset details
      const [dataset] = await db.select().from(datasets).where(eq(datasets.id, datasetId));
      
      if (!dataset) {
        return res.status(404).json({ error: "Dataset not found" });
      }
      
      res.json({
        purchase,
        dataset
      });
    } catch (error) {
      next(error);
    }
  });

  // Download encrypted dataset (assuming filePath exists)
  app.get("/api/download/:datasetId", async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Not authenticated" });
    }
    
    try {
      const datasetId = parseInt(req.params.datasetId);
      
      // Verify the user has purchased this dataset
      const purchase = await storage.getPurchase(req.user.id, datasetId);
      
      if (!purchase) {
        return res.status(403).json({ error: "You have not purchased this dataset" });
      }
      
      // Get the dataset details
      const [dataset] = await db.select().from(datasets).where(eq(datasets.id, datasetId));
      
      if (!dataset || !dataset.filePath) {
        return res.status(404).json({ error: "Dataset file not found" });
      }
      
      // In a real application, this would fetch the actual file
      // For now, we'll create a simple example
      const sampleData = [
        { id: 1, name: "Example 1", value: 100 },
        { id: 2, name: "Example 2", value: 200 },
        { id: 3, name: "Example 3", value: 300 },
      ];
      
      // Encrypt the data with the purchase's encryption key
      const dataString = JSON.stringify(sampleData);
      const encryptedData = encryptFileContent(dataString, purchase.encryptionKey);
      
      // Set headers for download
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${dataset.slug}.encrypted"`);
      
      // Send the encrypted data
      res.send(encryptedData);
    } catch (error) {
      next(error);
    }
  });

  // Admin routes (requires admin authentication)
  app.get("/api/admin/purchases", async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated() || !req.user.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }
    
    try {
      // Get all purchases with joined dataset and user data
      const allPurchases = await db
        .select({
          id: purchases.id,
          userId: purchases.userId,
          datasetId: purchases.datasetId,
          purchaseDate: purchases.purchaseDate,
          amount: purchases.amount,
          status: purchases.status,
        })
        .from(purchases);
      
      res.json(allPurchases);
    } catch (error) {
      next(error);
    }
  });

  // Admin: Get all datasets (including full details)
  app.get("/api/admin/datasets", async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated() || !req.user.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }
    
    try {
      const allDatasets = await db.select().from(datasets);
      res.json(allDatasets);
    } catch (error) {
      next(error);
    }
  });

  // Admin: Create dataset
  app.post("/api/admin/datasets", async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated() || !req.user.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }
    
    try {
      const datasetData = req.body;
      
      // Generate slug if not provided
      if (!datasetData.slug) {
        datasetData.slug = datasetData.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
      }
      
      const [newDataset] = await db.insert(datasets).values(datasetData).returning();
      res.status(201).json(newDataset);
    } catch (error) {
      next(error);
    }
  });

  // Admin: Update dataset
  app.put("/api/admin/datasets/:id", async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated() || !req.user.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }
    
    try {
      const id = parseInt(req.params.id);
      const datasetData = req.body;
      
      // Update the dataset
      const [updatedDataset] = await db
        .update(datasets)
        .set(datasetData)
        .where(eq(datasets.id, id))
        .returning();
      
      if (!updatedDataset) {
        return res.status(404).json({ error: "Dataset not found" });
      }
      
      res.json(updatedDataset);
    } catch (error) {
      next(error);
    }
  });

  // Admin: Delete dataset
  app.delete("/api/admin/datasets/:id", async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated() || !req.user.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }
    
    try {
      const id = parseInt(req.params.id);
      
      // Check if dataset exists
      const [dataset] = await db.select().from(datasets).where(eq(datasets.id, id));
      if (!dataset) {
        return res.status(404).json({ error: "Dataset not found" });
      }
      
      // Check if the dataset has any associated purchases
      const purchaseList = await db.select().from(purchases).where(eq(purchases.datasetId, id));
      
      if (purchaseList.length > 0) {
        return res.status(409).json({
          error: "Cannot delete dataset that has been purchased. This would break user purchase history.",
          purchaseCount: purchaseList.length
        });
      }
      
      // Delete the dataset
      await db.delete(datasets).where(eq(datasets.id, id));
      res.status(200).json({ message: "Dataset deleted successfully" });
    } catch (error) {
      next(error);
    }
  });

  // Admin: Get all categories
  app.get("/api/admin/categories", async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated() || !req.user.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }
    
    try {
      const allCategories = await db.select().from(categories);
      res.json(allCategories);
    } catch (error) {
      next(error);
    }
  });

  // Admin: Create category
  app.post("/api/admin/categories", async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated() || !req.user.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }
    
    try {
      const categoryData = req.body;
      
      // Generate slug if not provided
      if (!categoryData.slug) {
        categoryData.slug = categoryData.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
      }
      
      const [newCategory] = await db.insert(categories).values(categoryData).returning();
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  });

  // Admin: Update category
  app.put("/api/admin/categories/:id", async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated() || !req.user.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }
    
    try {
      const id = parseInt(req.params.id);
      const categoryData = req.body;
      
      // Update slug if name changed and slug not provided
      if (categoryData.name && !categoryData.slug) {
        categoryData.slug = categoryData.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
      }
      
      // Update the category
      const [updatedCategory] = await db
        .update(categories)
        .set(categoryData)
        .where(eq(categories.id, id))
        .returning();
      
      if (!updatedCategory) {
        return res.status(404).json({ error: "Category not found" });
      }
      
      res.json(updatedCategory);
    } catch (error) {
      next(error);
    }
  });

  // Admin: Delete category
  app.delete("/api/admin/categories/:id", async (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated() || !req.user.isAdmin) {
      return res.status(403).json({ error: "Admin access required" });
    }
    
    try {
      const id = parseInt(req.params.id);
      
      // Check if category exists
      const [category] = await db.select().from(categories).where(eq(categories.id, id));
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      
      // Check if there are datasets using this category
      const datasetCount = await db
        .select()
        .from(datasets)
        .where(eq(datasets.categoryId, id));
      
      if (datasetCount.length > 0) {
        return res.status(400).json({
          error: "Cannot delete category that has datasets. Reassign datasets first."
        });
      }
      
      // Delete the category
      await db.delete(categories).where(eq(categories.id, id));
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      next(error);
    }
  });
  
  // Contact request endpoint
  app.post("/api/contact", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const contactData = req.body;
      
      // Validate contact request data
      if (!contactData.name || !contactData.email || !contactData.message) {
        return res.status(400).json({ error: "Name, email, and message are required fields" });
      }
      
      // Process and validate dates
      if (contactData.preferredDate) {
        // Make sure preferredDate is a valid Date object or string
        try {
          // Convert to a Date object and back to ISO string for storage
          contactData.preferredDate = new Date(contactData.preferredDate);
        } catch (err) {
          // If there's an error parsing the date, set it to null
          contactData.preferredDate = null;
        }
      }
      
      // Create the contact request in the database
      const newContact = await storage.createContactRequest(contactData);
      
      // Return success response
      res.status(201).json({
        id: newContact.id,
        message: "Contact request submitted successfully",
        scheduleCall: newContact.scheduleCall
      });
    } catch (error) {
      console.error("Contact form error:", error);
      next(error);
    }
  });
  
  // Create and return HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}
