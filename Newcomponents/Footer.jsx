function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12 ">
      <div className="max-w-7xl mx-auto px-6 py-8 grid  grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Online Store</h2>
          <p className="text-sm text-gray-400">
            Your one-stop shop for all your needs. High quality. Affordable
            prices.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-amber-400">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-amber-400">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-amber-400">
                Contact
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-amber-400">
                Login
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-blue-400">
              🐦
            </a>
            <a href="#" className="hover:text-blue-600">
              📘
            </a>
            <a href="#" className="hover:text-pink-400">
              📸
            </a>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 text-center text-sm py-4 text-gray-400">
        &copy; {new Date().getFullYear()} Online Store. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
