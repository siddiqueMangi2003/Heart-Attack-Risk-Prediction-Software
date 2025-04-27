import Link from "next/link"

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about heart health and our risk prediction tool.
            </p>
          </div>

          <div className="space-y-8">
            {/* Search Bar */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search frequently asked questions..."
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                >
                  Search
                </button>
              </div>
            </div>

            {/* FAQ Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-600 text-left">
                <h3 className="font-medium">About Heart Disease</h3>
                <p className="text-sm text-muted-foreground">Risk factors, symptoms, and prevention</p>
              </button>
              <button className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-purple-600 text-left">
                <h3 className="font-medium">Using Our Tool</h3>
                <p className="text-sm text-muted-foreground">How to use the risk prediction calculator</p>
              </button>
              <button className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 border-green-600 text-left">
                <h3 className="font-medium">Account & Privacy</h3>
                <p className="text-sm text-muted-foreground">Managing your data and account</p>
              </button>
            </div>

            {/* FAQ Accordion */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-semibold">General Questions</h2>
              </div>

              <div className="divide-y">
                {/* Question 1 */}
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer">
                    <h3 className="text-lg font-medium">What is CardioGuard's heart attack risk prediction tool?</h3>
                    <span className="transition group-open:rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-muted-foreground">
                      CardioGuard's heart attack risk prediction tool is an advanced algorithm that analyzes various
                      health parameters to estimate your risk of experiencing a heart attack in the next 10 years. The
                      tool considers factors such as age, gender, blood pressure, cholesterol levels, smoking status,
                      family history, and other relevant health metrics. By inputting your health data, you receive a
                      personalized risk assessment along with recommendations for reducing your risk through lifestyle
                      modifications and medical interventions when appropriate.
                    </p>
                  </div>
                </details>

                {/* Question 2 */}
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer">
                    <h3 className="text-lg font-medium">How accurate is the risk prediction?</h3>
                    <span className="transition group-open:rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-muted-foreground mb-4">
                      Our risk prediction model has been validated with large-scale clinical data and demonstrates an
                      accuracy rate of approximately 85%. The model is based on established cardiovascular risk
                      algorithms that have been enhanced with machine learning techniques to improve prediction
                      accuracy.
                    </p>
                    <p className="text-muted-foreground">
                      It's important to understand that the tool provides an estimate of risk rather than a definitive
                      prediction. Many factors can influence heart health, and some rare or personal factors may not be
                      captured by the model. Always consult with healthcare professionals for a comprehensive evaluation
                      of your cardiovascular health.
                    </p>
                  </div>
                </details>

                {/* Question 3 */}
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer">
                    <h3 className="text-lg font-medium">What health parameters should I know before using the tool?</h3>
                    <span className="transition group-open:rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-muted-foreground mb-4">
                      To get the most accurate risk assessment, you should have the following information available:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-4">
                      <li>Age and gender</li>
                      <li>Blood pressure readings (systolic and diastolic)</li>
                      <li>Cholesterol levels (total cholesterol, HDL, LDL)</li>
                      <li>Blood sugar or diabetes status</li>
                      <li>Smoking status (current, former, never)</li>
                      <li>Height and weight (for BMI calculation)</li>
                      <li>Family history of heart disease</li>
                      <li>Current medications (especially those for blood pressure, cholesterol, or diabetes)</li>
                    </ul>
                    <p className="text-muted-foreground">
                      If you don't have all this information, you can still use the tool, but your risk assessment may
                      be less accurate. Consider getting a health check-up to obtain these important health metrics.
                    </p>
                  </div>
                </details>

                {/* Question 4 */}
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer">
                    <h3 className="text-lg font-medium">How often should I check my heart attack risk?</h3>
                    <span className="transition group-open:rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-muted-foreground">
                      We recommend reassessing your heart attack risk annually, or whenever you experience significant
                      changes in your health status or lifestyle. Regular monitoring allows you to track changes in your
                      risk profile over time and evaluate the effectiveness of any preventive measures you've
                      implemented. If you have existing cardiovascular conditions or multiple risk factors, your
                      healthcare provider may recommend more frequent assessments. Always follow your doctor's guidance
                      regarding the frequency of health check-ups and risk assessments.
                    </p>
                  </div>
                </details>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-semibold">Understanding Your Results</h2>
              </div>

              <div className="divide-y">
                {/* Question 5 */}
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer">
                    <h3 className="text-lg font-medium">What do the risk categories mean?</h3>
                    <span className="transition group-open:rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-muted-foreground mb-4">
                      Our risk assessment categorizes your heart attack risk into three levels:
                    </p>
                    <div className="space-y-4">
                      <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <h4 className="font-medium text-green-800">Low Risk (Less than 5%)</h4>
                        <p className="text-sm text-green-700">
                          A low risk means you have a less than 5% chance of experiencing a heart attack in the next 10
                          years. Continue maintaining a healthy lifestyle to keep your risk low.
                        </p>
                      </div>
                      <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h4 className="font-medium text-yellow-800">Moderate Risk (5-10%)</h4>
                        <p className="text-sm text-yellow-700">
                          A moderate risk indicates a 5-10% chance of experiencing a heart attack in the next 10 years.
                          Consider lifestyle modifications and regular check-ups to manage your risk factors.
                        </p>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                        <h4 className="font-medium text-red-800">High Risk (Greater than 10%)</h4>
                        <p className="text-sm text-red-700">
                          A high risk means you have more than a 10% chance of experiencing a heart attack in the next
                          10 years. Consult with a healthcare provider to develop a comprehensive risk reduction plan.
                        </p>
                      </div>
                    </div>
                  </div>
                </details>

                {/* Question 6 */}
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer">
                    <h3 className="text-lg font-medium">
                      If I have a high risk score, does that mean I'll have a heart attack?
                    </h3>
                    <span className="transition group-open:rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-muted-foreground mb-4">
                      No, a high risk score does not mean you will definitely have a heart attack. It indicates that,
                      based on your current health parameters, you have an elevated probability compared to someone with
                      a lower risk score. Risk prediction is about probabilities, not certainties.
                    </p>
                    <p className="text-muted-foreground mb-4">
                      The good news is that many risk factors for heart disease are modifiable. By making lifestyle
                      changes and following medical advice, you can significantly reduce your risk. Many people with
                      high risk scores never experience heart attacks because they take proactive steps to improve their
                      cardiovascular health.
                    </p>
                    <p className="text-muted-foreground">
                      A high risk score should be viewed as an opportunity for early intervention rather than a
                      predetermined outcome. Consult with your healthcare provider to develop a personalized plan for
                      reducing your risk.
                    </p>
                  </div>
                </details>

                {/* Question 7 */}
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer">
                    <h3 className="text-lg font-medium">How can I lower my heart attack risk?</h3>
                    <span className="transition group-open:rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-muted-foreground mb-4">
                      There are several evidence-based strategies for reducing heart attack risk:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-4">
                      <li>
                        <span className="font-medium">Adopt a heart-healthy diet:</span> Focus on fruits, vegetables,
                        whole grains, lean proteins, and healthy fats. Limit sodium, saturated fats, and added sugars.
                      </li>
                      <li>
                        <span className="font-medium">Exercise regularly:</span> Aim for at least 150 minutes of
                        moderate-intensity aerobic activity or 75 minutes of vigorous activity per week, plus
                        muscle-strengthening activities twice weekly.
                      </li>
                      <li>
                        <span className="font-medium">Maintain a healthy weight:</span> If you're overweight, even
                        modest weight loss (5-10% of your body weight) can improve heart health.
                      </li>
                      <li>
                        <span className="font-medium">Quit smoking:</span> Smoking cessation rapidly reduces heart
                        attack risk, with benefits beginning within 24 hours.
                      </li>
                      <li>
                        <span className="font-medium">Limit alcohol consumption:</span> If you drink, do so in
                        moderation (up to one drink daily for women and up to two for men).
                      </li>
                      <li>
                        <span className="font-medium">Manage stress:</span> Practice stress-reduction techniques such as
                        mindfulness, meditation, or yoga.
                      </li>
                      <li>
                        <span className="font-medium">Control chronic conditions:</span> Work with your healthcare
                        provider to manage conditions like high blood pressure, high cholesterol, and diabetes.
                      </li>
                      <li>
                        <span className="font-medium">Take medications as prescribed:</span> If your doctor has
                        prescribed medications for blood pressure, cholesterol, or diabetes, take them consistently.
                      </li>
                      <li>
                        <span className="font-medium">Get regular check-ups:</span> Monitor your health metrics and
                        adjust your prevention strategy as needed.
                      </li>
                    </ul>
                    <p className="text-muted-foreground">
                      For personalized recommendations, consult with your healthcare provider. They can help you
                      prioritize risk reduction strategies based on your specific health profile.
                    </p>
                  </div>
                </details>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 border-b">
                <h2 className="text-2xl font-semibold">Technical Questions</h2>
              </div>

              <div className="divide-y">
                {/* Question 8 */}
                <details className="group">
                  <summary className="flex justify-between items-center p-6 cursor-pointer">
                    <h3 className="text-lg font-medium">
                      Is my health data secure when using the risk prediction tool?
                    </h3>
                    <span className="transition group-open:rotate-180">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0">
                    <p className="text-muted-foreground mb-4">
                      Yes, we take data security and privacy very seriously. CardioGuard implements multiple layers of
                      protection for your health information:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground mb-4">
                      <li>
                        All data is encrypted both in transit and at rest using industry-standard encryption protocols.
                      </li>
                      <li>We comply with healthcare data protection regulations, including HIPAA where applicable.</li>
                      <li>Our systems undergo regular security audits and vulnerability assessments.</li>
                      <li>We implement strict access controls, ensuring only authorized personnel can access data.</li>
                      <li>You maintain control over your data and can request its deletion at any time.</li>
                    </ul>
                    <p className="text-muted-foreground">
                      For more detailed information about our data security practices, please review our{" "}
                      <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>
                      .
                    </p>
                  </div>
                </details>
              </div>
            </div>

            {/* Still Have Questions */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-md p-8 text-white">
              <h2 className="text-2xl font-semibold mb-4">Still Have Questions?</h2>
              <p className="mb-6">
                If you couldn't find the answer you were looking for, our team is here to help. Contact us for
                personalized assistance with any questions about heart health or using our risk prediction tool.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
                >
                  Contact Support
                </Link>
                <Link
                  href="/heart-health-guide"
                  className="px-6 py-3 bg-blue-500 bg-opacity-20 text-white font-medium rounded-lg shadow-md hover:bg-opacity-30 transition-all duration-300 text-center"
                >
                  Explore Heart Health Guide
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
