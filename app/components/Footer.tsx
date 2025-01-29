export default function Footer() {
  return (
    <footer className="bg-[#cf5a00] text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p>© 2023 MovieMagic Recommendations 🎬 All rights reserved.</p>
        <div className="mt-4">
          <a href="/about" className="text-[#fae4b4] hover:underline mx-2">
            About Us 🙋‍♀️
          </a>
          <a href="/contact" className="text-[#fae4b4] hover:underline mx-2">
            Contact 📧
          </a>
          <a href="/privacy" className="text-[#fae4b4] hover:underline mx-2">
            Privacy Policy 🔒
          </a>
        </div>
        <div className="mt-4">
          <p>Made with ❤️ by Sanju Thapa for movie lovers!</p>
        </div>
      </div>
    </footer>
  )
}

