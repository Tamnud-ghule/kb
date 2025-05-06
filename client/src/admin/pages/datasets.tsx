import { AdminLayout } from "../components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getQueryFn, apiRequest, queryClient } from "@/lib/queryClient";
import { Dataset, Category } from "@shared/schema";
import { Pencil, Trash2, Search, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function AdminDatasets() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch datasets
  const { data: datasets, isLoading } = useQuery<Dataset[]>({
    queryKey: ["/api/datasets"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  // Fetch categories for filtering
  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
    queryFn: getQueryFn({ on401: "throw" }),
  });

  // Delete dataset mutation
  const deleteDatasetMutation = useMutation({
    mutationFn: async (datasetId: number) => {
      await apiRequest("DELETE", `/api/admin/datasets/${datasetId}`);
    },
    onSuccess: () => {
      toast({
        title: "Dataset deleted",
        description: "The dataset has been removed successfully.",
      });
      // Invalidate and refetch datasets
      queryClient.invalidateQueries({ queryKey: ["/api/datasets"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to delete dataset",
        variant: "destructive",
      });
    },
  });

  // Handle dataset deletion
  const handleDeleteDataset = (id: number) => {
    if (window.confirm("Are you sure you want to delete this dataset? This action cannot be undone.")) {
      deleteDatasetMutation.mutate(id);
    }
  };

  // Filter datasets based on search query
  const filteredDatasets = datasets?.filter(
    (dataset) =>
      dataset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get category name by id
  const getCategoryName = (categoryId: number | null) => {
    if (!categoryId) return "Uncategorized";
    return categories?.find((cat) => cat.id === categoryId)?.name || "Unknown";
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Datasets</h1>
            <p className="text-gray-500">Manage your marketplace datasets.</p>
          </div>
          <Button 
            onClick={() => setLocation("/admin/datasets/new")} 
            className="bg-gray-900 hover:bg-gray-800"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Dataset
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Search size={18} />
          </div>
          <Input
            type="search"
            placeholder="Search datasets..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Datasets Table */}
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      Loading datasets...
                    </td>
                  </tr>
                ) : filteredDatasets && filteredDatasets.length > 0 ? (
                  filteredDatasets.map((dataset) => (
                    <tr key={dataset.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {dataset.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getCategoryName(dataset.categoryId)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${dataset.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dataset.lastUpdated ? new Date(dataset.lastUpdated).toLocaleDateString() : "Never"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dataset.recordCount || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Button
                            onClick={() => setLocation(`/admin/datasets/edit/${dataset.id}`)}
                            size="sm"
                            variant="outline"
                            className="text-xs h-8"
                          >
                            <Pencil className="h-3.5 w-3.5 mr-1" />
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDeleteDataset(dataset.id)}
                            size="sm"
                            variant="outline"
                            className="text-xs h-8 text-red-500 border-red-200 hover:bg-red-50"
                            disabled={deleteDatasetMutation.isPending}
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      {searchQuery ? "No datasets found matching your search" : "No datasets found"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
}
