import Header from "../components/Header"
import Footer from "../components/Footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#fae4b4] text-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy 🔒</h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <p className="mb-6">
            At MovieMagic, we take your privacy seriously. This policy outlines how we collect, use, and protect your
            personal information. 🛡️
          </p>
          <h2 className="text-2xl font-bold mb-4">Information We Collect 📊</h2>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Personal information (e.g., name, email) when you create an account 👤</li>
            <li>Viewing history and preferences to personalize recommendations 🎯</li>
            <li>Comments and reviews you post on our platform 💬</li>
            <li>Technical information about your device and browsing 🖥️</li>
          </ul>
          <h2 className="text-2xl font-bold mb-4">How We Use Your Information 🔍</h2>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>To provide and improve our movie recommendation service 🚀</li>
            <li>To personalize your experience on MovieMagic 🌈</li>
            <li>To communicate with you about your account and our services 📨</li>
            <li>To analyze usage patterns and improve our website 📈</li>
          </ul>
          <h2 className="text-2xl font-bold mb-4">Data Protection 🛡️</h2>
          <p className="mb-6">
            We implement a variety of security measures to maintain the safety of your personal information. Your data
            is encrypted and stored on secure servers. 🔐
          </p>
          <h2 className="text-2xl font-bold mb-4">Your Rights 📜</h2>
          <p className="mb-6">
            You have the right to access, correct, or delete your personal information. You can also opt-out of
            marketing communications at any time. 🚫
          </p>
          <h2 className="text-2xl font-bold mb-4">Updates to This Policy 🔄</h2>
          <p className="mb-6">
            We may update this privacy policy from time to time. We will notify you of any changes by posting the new
            policy on this page. 📢
          </p>
          <h2 className="text-2xl font-bold mb-4">Contact Us 📬</h2>
          <p>If you have any questions about this privacy policy, please contact us at privacy@moviemagic.com. 💌</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

