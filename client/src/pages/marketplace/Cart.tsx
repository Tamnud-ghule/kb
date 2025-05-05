import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Link, useLocation } from 'wouter';
import { getQueryFn, apiRequest, queryClient } from '@/lib/queryClient';
import { useAuth } from '@/hooks/use-auth';
import { Dataset } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Loader2, ShoppingCart, X, ArrowRight, Package, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  item: {
    id: number;
    userId: number;
    datasetId: number;
    addedAt: string;
  };
  dataset: Dataset;
}

export default function Cart() {
  const [location, navigate] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch cart items
  const {
    data: cartItems,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery<CartItem[]>({
    queryKey: ["/api/cart"],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: !!user,
  });

  // Calculate total price
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const sum = cartItems.reduce((total, item) => total + item.dataset.price, 0);
      setTotalPrice(sum);
    } else {
      setTotalPrice(0);
    }
  }, [cartItems]);

  // Remove item mutation
  const removeItemMutation = useMutation({
    mutationFn: async (datasetId: number) => {
      await apiRequest("DELETE", `/api/cart/${datasetId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Item removed",
        description: "Dataset has been removed from your cart"
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Purchase mutation
  const purchaseMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", "/api/purchase");
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Purchase successful",
        description: `You have successfully purchased ${cartItems?.length} dataset(s)`
      });
      navigate("/purchases");
    },
    onError: (error: Error) => {
      toast({
        title: "Purchase failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Handle remove item
  const handleRemoveItem = (datasetId: number) => {
    removeItemMutation.mutate(datasetId);
  };

  // Handle purchase
  const handlePurchase = () => {
    if (!cartItems || cartItems.length === 0) {
      toast({
        title: "Empty cart",
        description: "Your cart is empty. Add some datasets before purchasing.",
        variant: "destructive"
      });
      return;
    }
    
    purchaseMutation.mutate();
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
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Cart</h2>
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
          <ShoppingCart className="h-7 w-7 mr-2" /> Your Cart
        </h1>
        <Link href="/datasets">
          <Button variant="outline" className="flex items-center">
            Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {!cartItems || cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some datasets to your cart to see them here.</p>
          <Link href="/datasets">
            <Button>Browse Datasets</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">{cartItems.length} Dataset{cartItems.length !== 1 ? 's' : ''} in Cart</h2>
              </div>
              <ul>
                {cartItems.map(({ item, dataset }) => (
                  <li key={item.id} className="border-b border-gray-200 last:border-0">
                    <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">{dataset.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">{dataset.recordCount?.toLocaleString() || 'Unknown'} records • Last updated: {new Date(dataset.lastUpdated || '').toLocaleDateString()}</p>
                        <div className="text-sm">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2">
                            {dataset.dataFormat || 'CSV'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center mt-4 md:mt-0">
                        <span className="text-lg font-semibold text-gray-900 mr-4">${dataset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(dataset.id)}
                          disabled={removeItemMutation.isPending}
                          className="text-gray-500 hover:text-red-500"
                        >
                          {removeItemMutation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <X className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-center mb-2 font-semibold">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900 text-xl">${totalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={handlePurchase}
                disabled={purchaseMutation.isPending || cartItems.length === 0}
              >
                {purchaseMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Complete Purchase
                    <Download className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <p className="text-sm text-gray-500 mt-4 text-center">
                By completing your purchase, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
