import Header from "../components/Header"
import Footer from "../components/Footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#fae4b4] text-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Contact Us 📬</h1>
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
          <p className="mb-6 text-center">
            We'd love to hear from you! Whether you have a question, suggestion, or just want to say hello, drop us a
            message below. 👋
          </p>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 font-bold">
                Name 😊
              </label>
              <Input type="text" id="name" placeholder="Your name" required />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-bold">
                Email 📧
              </label>
              <Input type="email" id="email" placeholder="your@email.com" required />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-2 font-bold">
                Subject 📌
              </label>
              <Input type="text" id="subject" placeholder="What's this about?" required />
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-bold">
                Message 💬
              </label>
              <Textarea id="message" placeholder="Your message here..." rows={5} required />
            </div>
            <Button type="submit" className="w-full">
              Send Message 🚀
            </Button>
          </form>
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Other Ways to Reach Us 🌟</h2>
            <p className="mb-2">
              <span className="font-bold">Email:</span> hello@moviemagic.com 📧
            </p>
            <p className="mb-2">
              <span className="font-bold">Phone:</span> +1 (555) 123-4567 ☎️
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

