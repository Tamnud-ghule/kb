import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { getQueryFn } from '@/lib/queryClient';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Download, Loader2, FileText, Database, Calendar } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Purchase {
  id: number;
  userId: number;
  datasetId: number;
  amount: number;
  encryptionKey: string;
  createdAt: string;
  dataset: {
    id: number;
    title: string;
    slug: string;
    description: string;
    price: number;
    recordCount: number;
    dataFormat: string;
    lastUpdated: string;
    categoryId: number;
    category: {
      id: number;
      name: string;
      slug: string;
    };
  };
}

export default function Purchases() {
  const {
    data: purchases,
    isLoading,
    error
  } = useQuery<Purchase[]>({
    queryKey: ["/api/purchases"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-6xl mx-auto py-12 px-4">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>Error loading purchases: {error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Purchases</h1>
      </div>

      {purchases && purchases.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {purchases.map((purchase) => (
            <Card key={purchase.id} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="line-clamp-1">{purchase.dataset.title}</CardTitle>
                <CardDescription>
                  Purchased {formatDistanceToNow(new Date(purchase.createdAt), { addSuffix: true })}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-gray-700 line-clamp-2">{purchase.dataset.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="flex items-center gap-1 font-normal">
                      <Database className="h-3 w-3" />
                      {purchase.dataset.recordCount.toLocaleString()} records
                    </Badge>
                    
                    <Badge variant="outline" className="flex items-center gap-1 font-normal">
                      <FileText className="h-3 w-3" />
                      {purchase.dataset.dataFormat}
                    </Badge>
                    
                    <Badge variant="outline" className="flex items-center gap-1 font-normal">
                      <Calendar className="h-3 w-3" />
                      Updated {formatDistanceToNow(new Date(purchase.dataset.lastUpdated), { addSuffix: true })}
                    </Badge>
                  </div>
                  
                  <p className="text-sm font-medium text-gray-700">
                    Purchase amount: ${purchase.amount.toFixed(2)}
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href={`/dataset/${purchase.dataset.id}`}>
                    View Details
                  </Link>
                </Button>
                
                <Button asChild>
                  <Link href={`/api/download/${purchase.dataset.id}`} target="_blank">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <Database className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No purchases yet</h3>
          <p className="text-gray-600 mb-6">Browse our data marketplace to find datasets that match your needs.</p>
          <Button asChild>
            <Link href="/datasets">Browse Datasets</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
