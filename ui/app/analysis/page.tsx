import { AnalysisCharts } from "@/components/analysis-charts"

export default function AnalysisPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Analysis of Data
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Explore the relationships between health parameters and heart attack risk through data visualizations.
            </p>
          </div>

          <AnalysisCharts />
        </div>
      </div>
    </main>
  )
}

