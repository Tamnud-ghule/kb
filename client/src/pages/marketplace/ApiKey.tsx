import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getQueryFn, apiRequest, queryClient } from '@/lib/queryClient';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Copy, RefreshCw, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ApiKeyResponse {
  apiKey: string;
}

export default function ApiKey() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isRevealed, setIsRevealed] = useState(false);

  // Fetch API key
  const {
    data: apiKeyData,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery<ApiKeyResponse>({
    queryKey: ["/api/api-key"],
    queryFn: getQueryFn({ on401: "throw" }),
    enabled: !!user,
  });

  // Regenerate API key mutation
  const regenerateKeyMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("POST", "/api/regenerate-api-key");
      return refetch();
    },
    onSuccess: () => {
      toast({
        title: "API Key Regenerated",
        description: "Your API key has been successfully regenerated."
      });
      setIsRevealed(true);
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Handle copy to clipboard
  const handleCopyToClipboard = () => {
    if (apiKeyData?.apiKey) {
      navigator.clipboard.writeText(apiKeyData.apiKey)
        .then(() => {
          toast({
            title: "Copied to Clipboard",
            description: "API key has been copied to your clipboard."
          });
        })
        .catch(() => {
          toast({
            title: "Copy Failed",
            description: "Failed to copy API key to clipboard.",
            variant: "destructive"
          });
        });
    }
  };

  // Toggle API key visibility
  const toggleReveal = () => {
    setIsRevealed(!isRevealed);
  };

  // Masked API key
  const getMaskedApiKey = (key: string) => {
    if (!key) return '';
    const prefix = key.slice(0, 5);
    const suffix = key.slice(-5);
    return `${prefix}${'•'.repeat(20)}${suffix}`;
  };

  if (isLoading) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="flex flex-col justify-center items-center h-64">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading API Key</h2>
          <p className="text-gray-600 mb-4">{error?.message || 'An error occurred'}</p>
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="flex items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <Key className="h-7 w-7 mr-2" /> API Key Management
        </h1>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your API Key</CardTitle>
          <CardDescription>
            Use this API key to access datasets programmatically through our API.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <div className="flex">
                <Input
                  id="apiKey"
                  type={isRevealed ? 'text' : 'password'}
                  value={isRevealed ? apiKeyData?.apiKey : getMaskedApiKey(apiKeyData?.apiKey || '')}
                  readOnly
                  className="flex-1 font-mono"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-2"
                  onClick={toggleReveal}
                >
                  {isRevealed ? 'Hide' : 'Reveal'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-2"
                  onClick={handleCopyToClipboard}
                  disabled={!apiKeyData?.apiKey}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="outline"
            onClick={() => regenerateKeyMutation.mutate()}
            disabled={regenerateKeyMutation.isPending}
            className="flex items-center"
          >
            {regenerateKeyMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Regenerating...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate API Key
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
          <CardDescription>
            Learn how to use our API to access your purchased datasets programmatically.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Authentication</h3>
              <p className="text-gray-600 mb-2">Include your API key in the header of all requests:</p>
              <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
                <code>
                  Authorization: Bearer {apiKeyData?.apiKey ? (isRevealed ? apiKeyData.apiKey : getMaskedApiKey(apiKeyData.apiKey)) : 'your-api-key'}
                </code>
              </pre>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Endpoints</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800">List Your Purchases</h4>
                  <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
                    <code>GET /api/purchases</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800">Get Dataset Details</h4>
                  <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
                    <code>GET /api/purchases/:datasetId</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800">Download Dataset</h4>
                  <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-x-auto">
                    <code>GET /api/download/:datasetId</code>
                  </pre>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Response Format</h3>
              <p className="text-gray-600 mb-2">All responses are returned in JSON format, except for file downloads.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Rate Limits</h3>
              <p className="text-gray-600">
                API requests are limited to 100 requests per minute per API key.
                If you exceed this limit, you'll receive a 429 status code.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
