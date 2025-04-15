import { motion } from "framer-motion";
import {
  FaFacebook,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.message) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/inquiries`,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

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
        {/* Left Section */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/contact.jpg"
            alt="Contact Us"
            className="w-full rounded-xl shadow-md"
          />
          <div className="flex items-center text-gray-700 space-x-3">
            <FaMapMarkerAlt className="text-blue-500" />
            <span>No:23, Kandy road, Kadawatha</span>
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
            <a
              href="https://www.facebook.com/groups/397208119429824/?ref=share&mibextid=NSMWBT"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800"
            >
              <FaFacebook className="cursor-pointer" />
            </a>
          </div>
        </motion.div>

        {/* Right Section - Form */}
        <motion.form
          className="space-y-4"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name *"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email (Optional)"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message *"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Contact;
