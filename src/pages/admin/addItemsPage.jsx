import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";

export default function AddItemsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state || {};

  const [productKey, setProductKey] = useState(product.key || "");
  const [productName, setProductName] = useState(product.name || "");
  const [productPrice, setProductPrice] = useState(product.price || "");
  const [productCategory, setProductCategory] = useState(
    Array.isArray(product.category)
      ? product.category.join(", ")
      : product.category || ""
  );
  const [productWidth, setProductWidth] = useState("");
  const [productHeight, setProductHeight] = useState("");
  const [productDepth, setProductDepth] = useState("");
  const [productDescription, setProductDescription] = useState(
    product.description || ""
  );
  const [productImage, setProductImage] = useState([]);

  // Handle file input
  const handleFileChange = (e) => {
    setProductImage(Array.from(e.target.files));
  };

  // Validate form inputs
  function validateForm() {
    if (
      !productKey ||
      !productName ||
      !productPrice ||
      !productCategory ||
      !productDescription ||
      productImage.length === 0
    ) {
      toast.error("Please fill in all required fields.");
      return false;
    }
    if (isNaN(productPrice) || productPrice <= 0) {
      toast.error("Price must be a valid number greater than 0.");
      return false;
    }
    if (
      (productWidth && isNaN(productWidth)) ||
      (productHeight && isNaN(productHeight)) ||
      (productDepth && isNaN(productDepth))
    ) {
      toast.error("Dimensions must be valid numbers.");
      return false;
    }
    return true;
  }

  async function handleUpdateItem() {
    // if (!validateForm()) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not authorized to update items.");
      return;
    }

    try {
      const imageUrls = await Promise.all(
        productImage.map((file) => mediaUpload(file))
      );

      console.log(imageUrls);

      const updatedItem = {
        key: productKey,
        name: productName,
        price: parseFloat(productPrice),
        category: productCategory.split(",").map((category) => category.trim()),
        dimensions: [productWidth, productHeight, productDepth]
          .filter((dim) => dim) // Remove empty dimensions
          .join("*"),
        description: productDescription,
        image: imageUrls,
        availability: true,
      };
      console.log(updatedItem);
      let result;
      if (product._id) {
        result = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/${product._id}`,
          updatedItem,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Item updated successfully!");
      } else {
        console.log("hello");
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/`,
          updatedItem,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        toast.success("Item added successfully!");
      }

      navigate("/admin/items");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Error updating item");
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">
        {product._id ? "Update Item" : "Add Item"}
      </h1>

      <div className="w-[400px] border border-gray-300 bg-white shadow-md rounded-lg p-6 flex flex-col items-center gap-4">
        <span>key</span>
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

        <select
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Category</option>
          <option value="Audio">Audio</option>
          <option value="Lights">Lights</option>
        </select>

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

        <textarea
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full p-2 border rounded"
        />

        <div className="w-full flex gap-2">
          <button
            onClick={handleUpdateItem}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition"
          >
            <CiCirclePlus size={20} />{" "}
            {product._id ? "Update Item" : "Add Item"}
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
