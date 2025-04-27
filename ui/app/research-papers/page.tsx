import Link from "next/link"

export default function ResearchPapersPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Research Papers
            </h1>
            <p className="text-xl text-muted-foreground">
              Explore the latest research on heart disease risk prediction and prevention.
            </p>
          </div>

          <div className="space-y-8">
            {/* Introduction */}
            <section className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-4">About Our Research</h2>
              <p className="mb-4">
                CardioGuard's risk prediction model is built on a foundation of rigorous scientific research. Our team
                collaborates with leading cardiologists, data scientists, and public health researchers to develop and
                validate our algorithms.
              </p>
              <p>
                Below, you'll find summaries of key research papers that inform our approach to heart attack risk
                prediction. These studies represent the cutting edge of cardiovascular research and provide the
                evidence-based framework for our prediction models.
              </p>
            </section>

            {/* Research Papers */}
            <div className="space-y-6">
              {/* Paper 1 */}
              <section className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-blue-700">
                      Machine Learning Models for Predicting Cardiovascular Events: A Comparative Analysis
                    </h2>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">2023</span>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    <span className="font-medium">Authors:</span> Johnson, R., Chen, M., Patel, S., Williams, K.
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    <span className="font-medium">Journal:</span> Journal of Cardiovascular Data Science, 45(3), 289-304
                  </div>
                </div>

                <div className="p-6 bg-gray-50">
                  <h3 className="text-lg font-medium mb-3">Abstract</h3>
                  <p className="text-muted-foreground mb-4">
                    This study compares the performance of five machine learning algorithms (Random Forest, Gradient
                    Boosting, Neural Networks, Support Vector Machines, and Logistic Regression) in predicting
                    cardiovascular events within a 10-year timeframe. Using a dataset of 25,000 patients with 15
                    clinical variables, we evaluated each model's accuracy, precision, recall, and F1-score. The
                    Gradient Boosting model demonstrated superior performance (AUC 0.91) compared to other algorithms,
                    particularly in identifying high-risk individuals with multiple comorbidities. Feature importance
                    analysis revealed that age, systolic blood pressure, total cholesterol/HDL ratio, and smoking status
                    were the most significant predictors across all models. This research provides a framework for
                    implementing machine learning in clinical decision support systems for cardiovascular risk
                    assessment.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
                      Machine Learning
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
                      Risk Prediction
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
                      Cardiovascular Events
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
                      Comparative Analysis
                    </span>
                  </div>
                </div>

                <div className="p-6 flex justify-between items-center border-t">
                  <div className="flex items-center text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 text-blue-600"
                    >
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                      <polyline points="16 6 12 2 8 6"></polyline>
                      <line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                    <span className="text-muted-foreground">Citations: 47</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Request Full Paper</button>
                </div>
              </section>

              {/* Paper 2 */}
              <section className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-blue-700">
                      Integration of Genetic Risk Scores with Traditional Risk Factors Improves Cardiovascular Risk
                      Prediction
                    </h2>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">2022</span>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    <span className="font-medium">Authors:</span> Rodriguez, L., Smith, J., Kumar, A., Thompson, E.
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    <span className="font-medium">Journal:</span> Nature Cardiovascular Research, 17(2), 145-159
                  </div>
                </div>

                <div className="p-6 bg-gray-50">
                  <h3 className="text-lg font-medium mb-3">Abstract</h3>
                  <p className="text-muted-foreground mb-4">
                    This prospective cohort study evaluated whether incorporating polygenic risk scores (PRS) with
                    traditional clinical risk factors improves cardiovascular disease (CVD) risk prediction. We followed
                    18,350 individuals without baseline CVD for a median of 8.7 years. A 74-variant PRS was calculated
                    for each participant and added to a model containing traditional risk factors from the Pooled Cohort
                    Equations. The addition of PRS significantly improved risk discrimination (increase in C-statistic
                    from 0.79 to 0.83, p&lt;0.001) and reclassification (net reclassification index 0.12, p&lt;0.001).
                    Notably, individuals in the highest PRS quintile had a 2.3-fold increased risk of incident CVD
                    compared to those in the lowest quintile, independent of traditional risk factors. Our findings
                    suggest that genetic risk assessment can enhance personalized risk stratification and potentially
                    guide more targeted preventive interventions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
                      Genetic Risk Scores
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
                      Risk Prediction
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
                      Personalized Medicine
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
                      Cohort Study
                    </span>
                  </div>
                </div>

                <div className="p-6 flex justify-between items-center border-t">
                  <div className="flex items-center text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 text-blue-600"
                    >
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                      <polyline points="16 6 12 2 8 6"></polyline>
                      <line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                    <span className="text-muted-foreground">Citations: 89</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Request Full Paper</button>
                </div>
              </section>

              {/* Paper 3 */}
              <section className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-blue-700">
                      Lifestyle Intervention and Cardiovascular Risk Reduction: A Randomized Controlled Trial
                    </h2>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">2021</span>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    <span className="font-medium">Authors:</span> Anderson, H., Garcia, M., Wilson, T., Lee, S.
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    <span className="font-medium">Journal:</span> New England Journal of Medicine, 384(11), 1021-1035
                  </div>
                </div>

                <div className="p-6 bg-gray-50">
                  <h3 className="text-lg font-medium mb-3">Abstract</h3>
                  <p className="text-muted-foreground mb-4">
                    This randomized controlled trial evaluated the effectiveness of a comprehensive lifestyle
                    intervention program on cardiovascular risk reduction among 2,240 adults with elevated risk factors
                    but without established cardiovascular disease. Participants were randomly assigned to either a
                    structured 18-month intervention (diet modification, physical activity, stress management, and
                    smoking cessation) or usual care. At 24 months, the intervention group showed significant
                    improvements in multiple risk factors compared to the control group, including systolic blood
                    pressure (-8.4 mmHg), LDL cholesterol (-12.8 mg/dL), and body weight (-5.2 kg) (all p&lt;0.001).
                    Using the Framingham Risk Score, the calculated 10-year cardiovascular risk was reduced by 27% in
                    the intervention group compared to 4% in the control group (p&lt;0.001). Notably, participants who
                    adhered to at least 80% of the intervention components showed the greatest risk reduction. This
                    study demonstrates that a structured, multifaceted lifestyle intervention can significantly reduce
                    cardiovascular risk factors and estimated cardiovascular event risk in a primary prevention
                    population.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
                      Lifestyle Intervention
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
                      Randomized Controlled Trial
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
                      Risk Reduction
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
                      Primary Prevention
                    </span>
                  </div>
                </div>

                <div className="p-6 flex justify-between items-center border-t">
                  <div className="flex items-center text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 text-blue-600"
                    >
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                      <polyline points="16 6 12 2 8 6"></polyline>
                      <line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                    <span className="text-muted-foreground">Citations: 124</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Request Full Paper</button>
                </div>
              </section>

              {/* Paper 4 */}
              <section className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-blue-700">
                      Artificial Intelligence for Early Detection of Subclinical Coronary Artery Disease: Validation
                      Study
                    </h2>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">2023</span>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    <span className="font-medium">Authors:</span> Zhang, W., Patel, N., Hernandez, J., Goldstein, R.
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    <span className="font-medium">Journal:</span> JAMA Cardiology, 8(4), 412-425
                  </div>
                </div>

                <div className="p-6 bg-gray-50">
                  <h3 className="text-lg font-medium mb-3">Abstract</h3>
                  <p className="text-muted-foreground mb-4">
                    This study developed and validated a deep learning algorithm for detecting subclinical coronary
                    artery disease using standard 12-lead electrocardiograms (ECGs). We trained the model on 45,815 ECGs
                    from patients who underwent coronary computed tomography angiography (CCTA) within 30 days of their
                    ECG. The algorithm demonstrated high accuracy in identifying patients with significant coronary
                    stenosis (AUC 0.87, 95% CI 0.85-0.89) and outperformed both the Framingham Risk Score (AUC 0.71) and
                    the pooled cohort equations (AUC 0.72) in predicting the presence of coronary artery disease.
                    External validation in a cohort of 11,430 patients from three independent medical centers confirmed
                    the algorithm's robustness (AUC 0.85, 95% CI 0.83-0.87). This AI-based approach could potentially
                    serve as a low-cost, non-invasive screening tool for identifying individuals who might benefit from
                    further cardiac evaluation, even in the absence of traditional risk factors or symptoms.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
                      Artificial Intelligence
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
                      Deep Learning
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
                      Coronary Artery Disease
                    </span>
                    <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded">
                      Early Detection
                    </span>
                  </div>
                </div>

                <div className="p-6 flex justify-between items-center border-t">
                  <div className="flex items-center text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 text-blue-600"
                    >
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                      <polyline points="16 6 12 2 8 6"></polyline>
                      <line x1="12" y1="2" x2="12" y2="15"></line>
                    </svg>
                    <span className="text-muted-foreground">Citations: 36</span>
                  </div>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Request Full Paper</button>
                </div>
              </section>
            </div>

            {/* Research Collaboration */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-md p-8 text-white">
              <h2 className="text-2xl font-semibold mb-4">Research Collaboration Opportunities</h2>
              <p className="mb-6">
                CardioGuard is committed to advancing cardiovascular research. We collaborate with academic
                institutions, healthcare organizations, and research teams to improve heart disease prediction and
                prevention.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center"
                >
                  Contact Research Team
                </Link>
                <button className="px-6 py-3 bg-blue-500 bg-opacity-20 text-white font-medium rounded-lg shadow-md hover:bg-opacity-30 transition-all duration-300">
                  Download Research Brief
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
