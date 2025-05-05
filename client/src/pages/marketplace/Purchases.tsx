import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getQueryFn, apiRequest } from '@/lib/queryClient';
import { useAuth } from '@/hooks/use-auth';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Loader2, Package, Download, ShoppingCart, FileDown, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PurchaseItem {
  id: number;
  datasetId: number;
  title: string;
  purchaseDate: string;
  price: number;
}

interface PurchaseDetailResponse {
  purchase: {
    id: number;
    userId: number;
    datasetId: number;
    purchaseDate: string;
    amount: number;
    encryptionKey: string;
    status: string;
  };
  dataset: {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: number;
    recordCount: number;
    dataFormat: string;
    updateFrequency: string;
    lastUpdated: string;
    previewAvailable: boolean;
    filePath: string;
    categoryId: number;
    createdAt: string;
    updatedAt: string;
  };
}

export default function Purchases() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch user purchases
  const {
    data: purchases,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery<PurchaseItem[]>({
    queryKey: ["/api/purchases"],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: !!user,
  });

  // Handle download
  const handleDownload = async (datasetId: number) => {
    try {
      // First, get the purchase details with the encryption key
      const detailsResponse = await apiRequest("GET", `/api/purchases/${datasetId}`);
      const details: PurchaseDetailResponse = await detailsResponse.json();
      
      // Then download the encrypted file
      const downloadResponse = await fetch(`/api/download/${datasetId}`, {
        method: 'GET',
        credentials: 'include'
      });
      
      if (!downloadResponse.ok) {
        throw new Error('Failed to download file');
      }
      
      // Get the blob and create a download link
      const blob = await downloadResponse.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${details.dataset.slug}.encrypted`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      // Show the encryption key in a toast
      toast({
        title: "Download started",
        description: `Encryption key: ${details.purchase.encryptionKey}\nSave this key safely! You'll need it to decrypt the file.`,
        duration: 10000,
      });
    } catch (err) {
      toast({
        title: "Download failed",
        description: err instanceof Error ? err.message : 'An unknown error occurred',
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <div className="flex flex-col justify-center items-center h-64">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Purchases</h2>
          <p className="text-gray-600 mb-4">{error?.message || 'An error occurred'}</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Package className="h-7 w-7 mr-2" /> Your Purchases
        </h1>
        <Link href="/datasets">
          <Button variant="outline" className="flex items-center">
            <ShoppingCart className="mr-2 h-4 w-4" /> Browse Datasets
          </Button>
        </Link>
      </div>

      {!purchases || purchases.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Purchases Yet</h2>
          <p className="text-gray-600 mb-6">You haven't purchased any datasets yet.</p>
          <Link href="/datasets">
            <Button>Browse Datasets</Button>
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">{purchases.length} Dataset{purchases.length !== 1 ? 's' : ''} Purchased</h2>
          </div>
          <ul>
            {purchases.map((purchase) => (
              <li key={purchase.id} className="border-b border-gray-200 last:border-0">
                <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{purchase.title}</h3>
                    <p className="text-sm text-gray-500 mb-2 flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Purchased: {new Date(purchase.purchaseDate).toLocaleDateString()} at {new Date(purchase.purchaseDate).toLocaleTimeString()}
                    </p>
                  </div>
                  <div className="flex items-center mt-4 md:mt-0">
                    <span className="text-lg font-semibold text-gray-900 mr-4">
                      ${purchase.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                      onClick={() => handleDownload(purchase.datasetId)}
                    >
                      <FileDown className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="mt-8 bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">About Encrypted Files</h3>
        <p className="text-gray-600 mb-4">
          All downloads are encrypted for security. You'll need your encryption key to decrypt the files.
          The encryption key is shown when you download a file and is also stored in your purchase details.
        </p>
        <div className="bg-gray-100 p-4 rounded-md">
          <h4 className="font-medium text-gray-800 mb-2">Decryption Instructions:</h4>
          <ol className="list-decimal list-inside text-gray-600 space-y-2">
            <li>Download the encrypted file</li>
            <li>Copy your encryption key when prompted</li>
            <li>Use our <Link href="/tools"><span className="text-blue-600 hover:underline">decryption tool</span></Link> or your own AES decryption method</li>
            <li>Enter your encryption key to unlock the file</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
