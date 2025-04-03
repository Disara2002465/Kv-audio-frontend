import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center h-screen bg-cover bg-center"
        style={{ backgroundImage: "url(h6.jpg)" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-center text-white p-10"
        >
          <h1 className="text-5xl font-bold">Welcome to Our Platform</h1>
          <p className="mt-4 text-lg">Delivering excellence with innovation</p>
          <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Get Started
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 text-center">
        <h2 className="text-4xl font-bold">Our Features</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white rounded-lg shadow-lg"
          >
            <img src="/h4.jpg" alt="Feature 1" className="rounded-md" />
            <h3 className="mt-4 text-xl font-semibold">Feature One</h3>
            <p className="mt-2">Description of the first feature.</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white rounded-lg shadow-lg"
          >
            <img src="/h5.jpg" alt="Feature 2" className="rounded-md" />
            <h3 className="mt-4 text-xl font-semibold">Feature Two</h3>
            <p className="mt-2">Description of the second feature.</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white rounded-lg shadow-lg"
          >
            <img src="/home2.jpg" alt="Feature 3" className="rounded-md" />
            <h3 className="mt-4 text-xl font-semibold">Feature Three</h3>
            <p className="mt-2">Description of the third feature.</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-blue-600 text-white text-center py-16">
        <h2 className="text-3xl font-bold">Get in Touch</h2>
        <p className="mt-4">We’d love to hear from you!</p>
        <button className="mt-6 px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-200">
          Contact Us
        </button>
      </section>
    </div>
  );
}
