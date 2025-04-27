import Link from "next/link"

export default function HeartHealthGuidePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Heart Health Guide
            </h1>
            <p className="text-xl text-muted-foreground">
              Essential information to help you maintain a healthy heart and reduce your risk of heart disease.
            </p>
          </div>

          <div className="space-y-12">
            {/* Introduction */}
            <section className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-4">Understanding Heart Health</h2>
              <p className="mb-4">
                Heart disease remains the leading cause of death globally. However, many risk factors for heart disease
                are modifiable through lifestyle changes and proper medical care. This guide provides evidence-based
                recommendations to help you maintain a healthy heart and reduce your risk of cardiovascular disease.
              </p>
              <p>
                Remember that individual health needs vary, and it's important to consult with healthcare professionals
                for personalized advice. Use this guide as a starting point for discussions with your doctor about your
                heart health.
              </p>
            </section>

            {/* Diet Section */}
            <section className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-start mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                    <line x1="6" y1="1" x2="6" y2="4"></line>
                    <line x1="10" y1="1" x2="10" y2="4"></line>
                    <line x1="14" y1="1" x2="14" y2="4"></line>
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold">Heart-Healthy Diet</h2>
              </div>

              <p className="mb-4">
                A heart-healthy diet is one of the most effective ways to prevent heart disease. Focus on these key
                dietary principles:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Foods to Include</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Fruits and vegetables (aim for 5+ servings daily)</li>
                    <li>Whole grains (brown rice, whole wheat bread, oats)</li>
                    <li>Lean proteins (fish, poultry, legumes, nuts)</li>
                    <li>Healthy fats (olive oil, avocados, nuts, seeds)</li>
                    <li>Low-fat dairy or dairy alternatives</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Foods to Limit</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Processed foods high in sodium</li>
                    <li>Saturated and trans fats</li>
                    <li>Refined carbohydrates and added sugars</li>
                    <li>Excessive alcohol consumption</li>
                    <li>Red and processed meats</li>
                  </ul>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-lg mb-2">The DASH Diet</h3>
                <p>
                  The Dietary Approaches to Stop Hypertension (DASH) diet is specifically designed to help lower blood
                  pressure. It emphasizes fruits, vegetables, whole grains, and lean proteins while limiting sodium,
                  saturated fats, and added sugars. Research shows the DASH diet can lower blood pressure in as little
                  as two weeks.
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Mediterranean Diet</h3>
                <p>
                  The Mediterranean diet is associated with reduced risk of heart disease. This eating pattern
                  emphasizes olive oil, fish, fruits, vegetables, beans, and whole grains, with moderate consumption of
                  wine and limited red meat. Studies show it can reduce the risk of heart attacks and strokes by up to
                  30%.
                </p>
              </div>
            </section>

            {/* Exercise Section */}
            <section className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-start mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path d="M18.6 14.4c.8-.8.8-2 0-2.8l-8.1-8.1a4.8 4.8 0 0 0-6.8 6.8l8.1 8.1c.8.8 2 .8 2.8 0Z"></path>
                    <path d="m22 22-5.5-5.5"></path>
                    <circle cx="16.5" cy="7.5" r="1.5"></circle>
                    <path d="M10.2 17.8 13 15m-8.3-3.3L7 9.2"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold">Physical Activity</h2>
              </div>

              <p className="mb-6">
                Regular physical activity strengthens your heart, improves circulation, and helps manage weight and
                stress. The American Heart Association recommends:
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="border border-blue-200 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Aerobic Exercise</h3>
                  <p className="mb-2">
                    Aim for at least 150 minutes of moderate-intensity or 75 minutes of vigorous-intensity aerobic
                    activity per week.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Examples: Brisk walking, swimming, cycling, dancing, jogging
                  </p>
                </div>

                <div className="border border-blue-200 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Strength Training</h3>
                  <p className="mb-2">
                    Include muscle-strengthening activities at least 2 days per week, working all major muscle groups.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Examples: Weight lifting, resistance bands, bodyweight exercises
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2">Getting Started</h3>
                <ul className="space-y-2">
                  <li>
                    <span className="font-medium">Start slowly:</span> If you're new to exercise, begin with short
                    sessions and gradually increase duration and intensity.
                  </li>
                  <li>
                    <span className="font-medium">Find activities you enjoy:</span> You're more likely to stick with
                    exercise if it's something you like doing.
                  </li>
                  <li>
                    <span className="font-medium">Break it up:</span> Three 10-minute walks throughout the day provide
                    similar benefits to one 30-minute walk.
                  </li>
                  <li>
                    <span className="font-medium">Consult your doctor:</span> Before starting a new exercise program,
                    especially if you have existing health conditions.
                  </li>
                </ul>
              </div>
            </section>

            {/* Lifestyle Section */}
            <section className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-start mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold">Lifestyle Factors</h2>
              </div>

              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-medium text-lg mb-2">Quit Smoking</h3>
                  <p>
                    Smoking damages blood vessels, reduces oxygen in the blood, and increases blood pressure and heart
                    rate. Quitting smoking can reduce your risk of heart disease by up to 50% within one year.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-medium text-lg mb-2">Manage Stress</h3>
                  <p>
                    Chronic stress can contribute to high blood pressure and other heart disease risk factors. Healthy
                    stress management techniques include mindfulness meditation, deep breathing exercises, physical
                    activity, adequate sleep, and maintaining social connections.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-medium text-lg mb-2">Limit Alcohol</h3>
                  <p>
                    Excessive alcohol consumption can raise blood pressure and contribute to heart failure. If you drink
                    alcohol, do so in moderation: up to one drink per day for women and up to two drinks per day for
                    men.
                  </p>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="font-medium text-lg mb-2">Prioritize Sleep</h3>
                  <p>
                    Poor sleep quality and insufficient sleep duration are associated with increased risk of
                    hypertension, diabetes, and heart disease. Aim for 7-9 hours of quality sleep per night and maintain
                    a consistent sleep schedule.
                  </p>
                </div>
              </div>
            </section>

            {/* Regular Checkups Section */}
            <section className="bg-white rounded-xl shadow-md p-8">
              <div className="flex items-start mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-600"
                  >
                    <path d="M16 2H8a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"></path>
                    <path d="M9 22v-4h6v4"></path>
                    <path d="M8 6h8"></path>
                    <path d="M8 10h8"></path>
                    <path d="M8 14h8"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold">Regular Health Monitoring</h2>
              </div>

              <p className="mb-6">
                Regular health checkups are essential for early detection and management of heart disease risk factors.
                Work with your healthcare provider to monitor:
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Key Metrics to Track</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Blood pressure (target: less than 120/80 mm Hg)</li>
                    <li>Cholesterol levels (LDL, HDL, total cholesterol, triglycerides)</li>
                    <li>Blood glucose levels</li>
                    <li>Body Mass Index (BMI) and waist circumference</li>
                    <li>Resting heart rate</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">Recommended Screenings</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Blood pressure: At least once every 2 years, more often if elevated</li>
                    <li>Cholesterol: Every 4-6 years for adults with normal levels</li>
                    <li>Diabetes screening: Every 3 years starting at age 45</li>
                    <li>Electrocardiogram (ECG): As recommended by your doctor based on risk factors and symptoms</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-md p-8 text-white">
              <h2 className="text-2xl font-semibold mb-4">Take Control of Your Heart Health Today</h2>
              <p className="mb-6">
                Understanding your personal risk factors is the first step toward better heart health. Use our heart
                attack risk prediction tool to assess your current risk level and receive personalized recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/predict"
                  className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
                >
                  Check Your Risk
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-blue-500 bg-opacity-20 text-white font-medium rounded-lg shadow-md hover:bg-opacity-30 transition-all duration-300 text-center"
                >
                  Speak with a Specialist
                </Link>
              </div>
            </section>

            {/* References */}
            <section className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">References</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>American Heart Association. (2023). Dietary Recommendations for Healthy Living.</li>
                <li>World Health Organization. (2023). Physical Activity Guidelines for Cardiovascular Health.</li>
                <li>
                  Journal of the American College of Cardiology. (2022). Lifestyle Modifications for Cardiovascular Risk
                  Reduction.
                </li>
                <li>
                  National Heart, Lung, and Blood Institute. (2023). Guidelines for the Prevention of Heart Disease and
                  Stroke.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
