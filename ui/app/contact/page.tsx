"use client"
import { useState } from "react"


export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    setSuccess(false)
    try {
      const response = await fetch("https://formspree.io/f/mpwpvbql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      })
      if (response.ok) {
        setSuccess(true)
        setForm({ name: "", email: "", subject: "", message: "" })
      } else {
        alert("Failed to send message. Please try again later.")
      }
    } catch (error) {
      alert("Failed to send message. Please try again later.")
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Have questions about our heart attack risk prediction tool? Get in touch with our team.
            </p>
          </div>
          <div className="w-full max-w-2xl">
            <div className="p-6 border rounded-lg shadow-lg bg-gradient-to-br from-white to-blue-50">
              <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Send us a message
              </h2>
              <p className="text-muted-foreground mb-6">
                Fill out the form below and our team will get back to you as soon as possible.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full p-2 border rounded-md"
                    placeholder="Your email address"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="subject">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="What is your inquiry about?"
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full p-2 border rounded-md min-h-[120px]"
                    placeholder="Please provide details about your inquiry..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-md hover:opacity-90 transition-opacity"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
                {success && (
                  <p className="text-sm text-green-600 mt-2 text-center">Message sent successfully!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
