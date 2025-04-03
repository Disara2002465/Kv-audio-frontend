import { motion } from "framer-motion";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <motion.h1
        className="text-4xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Get in Touch
      </motion.h1>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl bg-white shadow-lg p-8 rounded-2xl">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/con.jpg"
            alt="Contact Us"
            className="w-full rounded-xl shadow-md"
          />
          <div className="flex items-center text-gray-700 space-x-3">
            <FaMapMarkerAlt className="text-blue-500" />
            <span>No:23,Kandy road,Kadawatha</span>
          </div>
          <div className="flex items-center text-gray-700 space-x-3">
            <FaPhone className="text-blue-500" />
            <span>+94 77 4885094</span>
          </div>
          <div className="flex items-center text-gray-700 space-x-3">
            <FaEnvelope className="text-blue-500" />
            <span>kv_audio77@example.com</span>
          </div>
          <div className="flex space-x-4 text-blue-600 text-2xl mt-4">
            <FaFacebook className="cursor-pointer hover:text-blue-800" />
            <FaInstagram className="cursor-pointer hover:text-pink-600" />
            <FaTwitter className="cursor-pointer hover:text-blue-400" />
          </div>
        </motion.div>

        <motion.form
          className="space-y-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <button className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition">
            Send Message
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
