function Footer() {
  return (
    <footer className="bg-gray-900 text-white md:mt-12 ">
      <div className="max-w-7xl mx-auto md:px-2 md:grid  md:grid-cols-3 gap-8">
        <div className="flex flex-col md:block justify-center items-center ">
          <h2 className="md:text-xl font-semibold mb-4 font-mono">Desigo</h2>
          <p className="text-sm text-gray-400">
            Your one-stop shop for all your needs. High quality. Affordable
            prices.
          </p>
        </div>

        <div>
          <h3 className="md:text-lg md:block flex justify-center items-center font-semibold mb-4 ">
            Quick Links
          </h3>
          <ul className="md:space-y-2 md:block flex flex-row justify-center items-center space-x-2 text-sm">
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
          <h3 className="md:text-lg font-semibold mb-4 md:block flex justify-center items-center ">
            Follow Us
          </h3>
          <div className="flex md:block justify-center items-center space-x-4 text-xl">
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
