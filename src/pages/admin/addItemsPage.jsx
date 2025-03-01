import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddItemsPage() {
  const [productKey, setProductKey] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productWidth, setProductWidth] = useState("");
  const [productHeight, setProductHeight] = useState("");
  const [productDepth, setProductDepth] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");

  const navigate = useNavigate();

  // Function to validate form inputs
  function validateForm() {
    if (
      !productKey ||
      !productName ||
      !productPrice ||
      !productCategory ||
      !productDescription ||
      !productImage
    ) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    if (isNaN(productPrice) || productPrice <= 0) {
      toast.error("Price must be a valid number greater than 0.");
      return false;
    }
    if (isNaN(productWidth) || isNaN(productHeight) || isNaN(productDepth)) {
      toast.error("Dimensions must be valid numbers.");
      return false;
    }
    return true;
  }

  // Function to add an item
  async function handleAddItems() {
    if (!validateForm()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not authorized to add items.");
      return;
    }

    const newItem = {
      key: productKey,
      name: productName,
      price: parseFloat(productPrice),
      category: productCategory.split(",").map((cat) => cat.trim()), // Convert string to array
      dimensions: {
        width: parseFloat(productWidth),
        height: parseFloat(productHeight),
        depth: parseFloat(productDepth),
      },
      description: productDescription,
      imageUrl: productImage,
      availability: true,
    };

    try {
      const result = await axios.post(
        "http://localhost:3000/api/products",
        newItem,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(result.data.message);
      navigate("/admin/items");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.error || "Error adding item");
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Add Item</h1>

      <div className="w-[400px] border border-gray-300 bg-white shadow-md rounded-lg p-6 flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Product Key"
          value={productKey}
          onChange={(e) => setProductKey(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          placeholder="Product Price ($)"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Category (comma-separated)"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <div className="w-full flex gap-2">
          <input
            type="number"
            placeholder="Width"
            value={productWidth}
            onChange={(e) => setProductWidth(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Height"
            value={productHeight}
            onChange={(e) => setProductHeight(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Depth"
            value={productDepth}
            onChange={(e) => setProductDepth(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <input
          type="text"
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          placeholder="Product Image URL"
          value={productImage}
          onChange={(e) => setProductImage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        />

        {/* Buttons */}
        <div className="w-full flex gap-2">
          <button
            onClick={handleAddItems}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition"
          >
            <CiCirclePlus size={20} /> Add Item
          </button>
          <button
            onClick={() => navigate("/admin/items")}
            className="w-full px-4 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
