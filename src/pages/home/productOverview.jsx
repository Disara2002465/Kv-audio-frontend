import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ImageSlider from "../../components/imageSlider";
import { addToCart } from "../../utils/cart";
import { toast } from "react-toastify";

export default function ProductOverview() {
  const { key } = useParams();
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${key}`)
      .then((res) => {
        setProduct(res.data);
        setLoadingStatus("loaded");
      })
      .catch((err) => {
        console.error(" Error fetching product:", err);
        setLoadingStatus("error");
      });
  }, [key]);

  if (loadingStatus === "loading") {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent animate-spin rounded-full"></div>
      </div>
    );
  }

  if (loadingStatus === "error") {
    return (
      <div className="w-full h-screen flex justify-center items-center text-red-500 text-lg">
        ❌ Error loading product details. Please try again later.
      </div>
    );
  }

  return (
    <div className="w-full h-full flex justify-center items-center p-6">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white shadow-lg p-6 rounded-lg">
        {/* Product Images */}
        <div className="w-full md:w-1/2">
          <ImageSlider
            images={product?.image || ["https://via.placeholder.com/300"]}
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 flex flex-col items-start p-6">
          <h1 className="text-3xl font-bold text-blue-500">
            {product?.name || "Unknown Product"}
          </h1>
          <h2 className="text-xl font-semibold text-gray-800 mt-2">
            {product?.category?.join(", ") || "No category available"}
          </h2>
          <p className="text-gray-700 mt-4">
            {product?.description || "No description provided."}
          </p>
          <p className="text-lg font-bold text-green-600 mt-2">
            LKR {product?.price ?? "N/A"}
          </p>
          <div className="mt-4 text-sm text-gray-600">
            <span className="font-medium">Dimensions:</span>{" "}
            {product?.dimensions ?? "Not specified"}
          </div>
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={() => {
              addToCart(product.key, 1);
              toast.success("added to Cart");
              console.log("Added to cart:", product.key);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
