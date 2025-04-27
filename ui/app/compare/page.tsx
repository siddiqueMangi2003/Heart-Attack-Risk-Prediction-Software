"use client";
// 1. Update Navbar (app/components/Navbar.tsx or wherever your layout is)
// Assuming you have a navigation layout file
// Add this inside your nav links:

{
    /* <Link href="/compare" className="hover:underline">Compare</Link> */
  }
  
  // 2. Create compare/page.tsx with dummy content
  
  
  import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
  import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
  
  export default function ComparePage() {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background to-blue-50">
        <div className="container mx-auto px-4 py-8 space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Model Comparison Dashboard
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select a dataset and compare the performance of different machine learning models.
            </p>
          </div>
  
          <div className="max-w-sm mx-auto">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Dataset" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dataset1">UCI Dataset</SelectItem>
                <SelectItem value="dataset2">Custom Hospital Dataset</SelectItem>
              </SelectContent>
            </Select>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Gradient Boosting</CardTitle>
                <CardDescription>Best performer on UCI dataset.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Accuracy: 92% | AUC: 0.89</p>
                <p className="text-sm mt-2">
                  Gradient Boosting is a powerful ensemble algorithm that builds models sequentially to reduce errors.
                </p>
              </CardContent>
            </Card>
  
            <Card>
              <CardHeader>
                <CardTitle>Random Forest</CardTitle>
                <CardDescription>Balanced model for interpretability and accuracy.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Accuracy: 88% | AUC: 0.86</p>
                <p className="text-sm mt-2">
                  Random Forest aggregates multiple decision trees and is robust to overfitting.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    );
  }
  