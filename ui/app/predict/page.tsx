import { HealthParameterForm } from "@/components/health-parameter-form"
import { ParameterExplanations } from "@/components/parameter-explanations"

export default function PredictPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Heart Attack Risk Prediction
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Enter your health parameters below to assess your heart attack risk factors. Choose between multiclass or
              binary prediction modes for different levels of detail.
            </p>
          </div>
          <div className="w-full max-w-3xl">
           <ParameterExplanations />
            <HealthParameterForm />
          </div>
        </div>
      </div>
    </main>
  )
}
