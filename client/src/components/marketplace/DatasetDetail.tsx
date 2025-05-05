/**
 * DatasetDetail component - Displays detailed information about a specific dataset
 * Includes metadata, pricing, compliance information, and sample data preview
 */
import React from 'react';
import { useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

const DatasetDetail: React.FC = () => {
  // In a real implementation, we would fetch the dataset details by ID
  // For now, we'll use a hard-coded example
  const [_, params] = useRoute('/dataset/:id');
  const datasetId = params?.id;

  // Mocked dataset details
  const dataset = {
    id: datasetId,
    title: 'Healthcare Industry Metrics',
    description: 'Comprehensive healthcare industry data including patient outcomes, costs, and provider metrics. This dataset provides anonymized records covering the past 5 years from over 500 healthcare providers across North America.',
    category: 'Healthcare',
    price: '$2,499',
    compliance: ['HIPAA', 'GDPR', 'CCPA'],
    lastUpdated: 'April 30, 2025',
    recordCount: '2.3 million',
    format: 'CSV, JSON',
    dataFields: [
      { name: 'provider_id', type: 'string', description: 'Unique identifier for healthcare provider' },
      { name: 'procedure_code', type: 'string', description: 'Standard medical procedure code' },
      { name: 'cost', type: 'decimal', description: 'Cost of procedure in USD' },
      { name: 'patient_outcome', type: 'string', description: 'Categorized outcome of procedure' },
      { name: 'date', type: 'date', description: 'Date of procedure' },
      { name: 'region', type: 'string', description: 'Geographic region' },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8">
          <a href="/" className="hover:text-gray-900">Home</a> {' / '}
          <a href="/datasets" className="hover:text-gray-900">Datasets</a> {' / '}
          <a href={`/category/${dataset.category.toLowerCase()}`} className="hover:text-gray-900">{dataset.category}</a> {' / '}
          <span className="text-gray-700">{dataset.title}</span>
        </div>

        {/* Dataset Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{dataset.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            {dataset.compliance.map((item, index) => (
              <Badge key={index} variant="outline" className="bg-gray-100">
                {item} Compliant
              </Badge>
            ))}
            <Badge variant="outline" className="bg-gray-100">
              Updated: {dataset.lastUpdated}
            </Badge>
          </div>
          <p className="text-gray-600 mb-6">{dataset.description}</p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-gray-900 text-white">
              Purchase Dataset
            </Button>
            <Button variant="outline">
              Request Sample
            </Button>
          </div>
        </div>

        {/* Dataset Details */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="grid grid-cols-4 w-full max-w-md">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schema">Schema</TabsTrigger>
            <TabsTrigger value="sample">Sample</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="py-4">
            <Card>
              <CardHeader>
                <CardTitle>Dataset Overview</CardTitle>
                <CardDescription>Key information about this dataset</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Category</p>
                    <p className="text-sm text-gray-500">{dataset.category}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Price</p>
                    <p className="text-sm text-gray-500">{dataset.price}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Record Count</p>
                    <p className="text-sm text-gray-500">{dataset.recordCount}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Available Formats</p>
                    <p className="text-sm text-gray-500">{dataset.format}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-sm text-gray-500">{dataset.lastUpdated}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Compliance</p>
                    <p className="text-sm text-gray-500">{dataset.compliance.join(', ')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="schema" className="py-4">
            <Card>
              <CardHeader>
                <CardTitle>Dataset Schema</CardTitle>
                <CardDescription>Fields and data types included in this dataset</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field Name</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dataset.dataFields.map((field, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{field.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{field.type}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{field.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="sample" className="py-4">
            <Card>
              <CardHeader>
                <CardTitle>Sample Data</CardTitle>
                <CardDescription>Preview of dataset contents (limited to 5 records)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-auto">
                  <pre className="text-xs">
{`[
  {
    "provider_id": "HP12345",
    "procedure_code": "SURG-001",
    "cost": 2500.00,
    "patient_outcome": "successful",
    "date": "2024-02-15",
    "region": "Northeast"
  },
  {
    "provider_id": "HP67890",
    "procedure_code": "DIAG-127",
    "cost": 350.75,
    "patient_outcome": "follow-up required",
    "date": "2024-02-16",
    "region": "Midwest"
  },
  {
    "provider_id": "HP24680",
    "procedure_code": "PREV-321",
    "cost": 175.50,
    "patient_outcome": "successful",
    "date": "2024-02-17",
    "region": "South"
  }
]`}
                  </pre>
                </div>
                <p className="mt-4 text-xs text-gray-500">Note: This is sample data only. Actual data may vary. Full dataset contains 2.3 million records.</p>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t">
                <Button size="sm" variant="outline">
                  Request Full Sample
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="compliance" className="py-4">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Information</CardTitle>
                <CardDescription>Details about data compliance and security measures</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">HIPAA Compliance</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      All patient data has been properly de-identified according to HIPAA Safe Harbor provisions. No protected health information (PHI) is included in this dataset.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">GDPR Compliance</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Data processing agreements are in place with all data sources. All personal identifiers have been removed to ensure GDPR compliance.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">CCPA Compliance</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      This dataset adheres to California Consumer Privacy Act requirements. All data collection included proper disclosure and opt-out capabilities.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Security Measures</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Data is delivered with enterprise-grade encryption. We maintain ISO 27001 certification and undergo regular security audits.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t">
                <Button size="sm" variant="outline">
                  Download Compliance Documentation
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Related Datasets */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Related Datasets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Healthcare Provider Performance</CardTitle>
                <CardDescription>Provider metrics and ratings</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="font-medium">$1,899</div>
                <Button size="sm" variant="outline">View</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Patient Demographic Trends</CardTitle>
                <CardDescription>Population health statistics</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="font-medium">$2,199</div>
                <Button size="sm" variant="outline">View</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Insurance Claims Analysis</CardTitle>
                <CardDescription>Claim processing and outcomes</CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="font-medium">$2,699</div>
                <Button size="sm" variant="outline">View</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatasetDetail;
