export default function PrivacyPolicyPage() {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background to-blue-50">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Privacy Policy
              </h1>
              <p className="text-xl text-muted-foreground">How we collect, use, and protect your personal information</p>
            </div>
  
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="prose prose-blue max-w-none">
                <p className="text-muted-foreground">
                  <strong>Last Updated:</strong> June 30th, 2025
                </p>
  
                <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
                <p>
                  CardioGuard ("we," "our," or "us") is committed to protecting your privacy and ensuring the security of
                  your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard
                  your information when you use our heart attack risk prediction website and services (collectively, the
                  "Service").
                </p>
                <p>
                  Please read this Privacy Policy carefully. By accessing or using our Service, you acknowledge that you
                  have read, understood, and agree to be bound by the terms of this Privacy Policy. If you do not agree
                  with our policies and practices, please do not use our Service.
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-blue-700 font-semibold">Important: We Do Not Store Your Health Data</p>
                      <p className="text-blue-600 text-sm mt-1">
                        Your health information is only temporarily processed through our prediction model and is not stored on our servers. 
                        Once your risk assessment is generated, all health data is immediately discarded and cannot be retrieved.
                      </p>
                    </div>
                  </div>
                </div>
  
                <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
                <p>We collect several types of information from and about users of our Service, including:</p>
  
                <h3 className="text-xl font-medium mt-6 mb-3">Personal Information</h3>
                <p>
                  We collect minimal information necessary for account creation:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>Email address (for account access only, not stored permanently)</li>
                </ul>

                <h3 className="text-xl font-medium mt-6 mb-3">Health Information (Not Stored)</h3>
                <p>
                  When you use our risk prediction tool, you provide health information that is <strong>temporarily processed</strong> 
                  through our AI model but <strong>never stored</strong> on our servers. This information includes:
                </p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>Age and biological sex</li>
                  <li>Chest pain type and symptoms</li>
                  <li>Resting blood pressure (systolic)</li>
                  <li>Total serum cholesterol levels</li>
                  <li>Maximum heart rate achieved during exercise</li>
                  <li>Fasting blood sugar levels</li>
                  <li>Resting electrocardiogram (ECG) results</li>
                  <li>Exercise-induced angina symptoms</li>
                  <li>ST depression measurements from exercise tests</li>
                  <li>ST segment slope from exercise ECG</li>
                  <li>Number of major vessels with significant narrowing (from angiography)</li>
                  <li>Thalassemia type from thallium stress test results</li>
                </ul>
                <p className="text-sm text-gray-600 italic">
                  <strong>Note:</strong> All health data is processed in real-time and immediately discarded after generating your risk assessment. 
                  We cannot retrieve or access this information once the assessment is complete.
                </p>
  
                <h3 className="text-xl font-medium mt-6 mb-3">Cookies and Similar Technologies</h3>
                <p>
                  We use cookies and similar tracking technologies to track activity on our Service and hold certain
                  information. Cookies are files with a small amount of data that may include an anonymous unique
                  identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
                  sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                </p>
  
                <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
                <p>We use the information only to:</p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>Provide and maintain our Service</li>
                  <li>Calculate and display your heart attack risk assessment (without storing health data)</li>
                  <li>Generate personalized health recommendations (processed in real-time)</li>
                  <li>Ensure Service security and prevent misuse</li>
                </ul>
  
                <h3 className="text-xl font-medium mt-6 mb-3">Research and Analytics</h3>
                <p>
                  We do not use individual health data for research purposes since we do not store this information. 
                  Any analytics we perform are based solely on aggregated, non-identifiable usage patterns and do not 
                  include any health information.
                </p>
  
                <h2 className="text-2xl font-semibold mt-8 mb-4">Data Retention</h2>
                <p>
                  We do not store personal information permanently. <strong>Health data is never retained</strong> - it is 
                  processed in real-time and immediately discarded after generating your risk assessment. Email addresses 
                  are used only for temporary session management and are not stored permanently.
                </p>
  
                <h2 className="text-2xl font-semibold mt-8 mb-4">Children's Privacy</h2>
                <p>
                  Our Service is not directed to individuals under the age of 18. We do not knowingly collect personal
                  information from children under 18. If you are a parent or guardian and you are aware that your child
                  has provided us with personal information, please contact us. If we become aware that we have collected
                  personal information from children without verification of parental consent, we take steps to remove
                  that information from our servers.
                </p>
  
                <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                  Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You
                  are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
                  are effective when they are posted on this page.
                </p>
  
                <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  <li>
                    By visiting the contact page on our website:{" "}
                    <a href="/contact" className="text-blue-600 hover:underline">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }