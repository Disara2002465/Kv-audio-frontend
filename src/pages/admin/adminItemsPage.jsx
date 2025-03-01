import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

const sampleArr = [
  {
    key: "p001",
    name: "Wireless Headphones",
    price: 49.99,
    category: ["Electronics", "Audio"],
    dimensions: { width: 15, height: 20, depth: 5 },
    description: "High-quality wireless headphones with noise cancellation.",
    availability: true,
    image: "https://example.com/images/wireless-headphones.jpg",
  },
  {
    key: "p002",
    name: "Mechanical Keyboard",
    price: 79.99,
    category: ["Electronics", "Computers"],
    dimensions: { width: 45, height: 15, depth: 5 },
    description: "RGB backlit mechanical keyboard with blue switches.",
    availability: true,
    image: "https://example.com/images/mechanical-keyboard.jpg",
  },
  {
    key: "p003",
    name: "Gaming Mouse",
    price: 29.99,
    category: ["Electronics", "Gaming Accessories"],
    dimensions: { width: 6, height: 12, depth: 3 },
    description: "Ergonomic gaming mouse with adjustable DPI.",
    availability: true,
    image: "https://example.com/images/gaming-mouse.jpg",
  },
  {
    key: "p004",
    name: "Smartwatch",
    price: 99.99,
    category: ["Electronics", "Wearables"],
    dimensions: { width: 4, height: 10, depth: 1 },
    description: "Feature-packed smartwatch with fitness tracking.",
    availability: false,
    image: "https://example.com/images/smartwatch.jpg",
  },
  {
    key: "p005",
    name: "LED Desk Lamp",
    price: 19.99,
    category: ["Home & Office", "Lighting"],
    dimensions: { width: 12, height: 40, depth: 12 },
    description: "Adjustable LED desk lamp with multiple brightness settings.",
    availability: true,
    image: "https://example.com/images/led-desk-lamp.jpg",
  },
];

export default function AdminItemsPage() {
  const [items, setItems] = useState(sampleArr);

  return (
    <div className="w-full h-full relative p-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Key</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price ($)</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Dimensions (W×H×D cm)</th>
            <th className="border p-2">Availability</th>
          </tr>
        </thead>
        <tbody>
          {items.map((product) => (
            <tr
              key={product.key}
              className="text-center border hover:bg-gray-100"
            >
              <td className="border p-2">{product.key}</td>
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">${product.price.toFixed(2)}</td>
              <td className="border p-2">{product.category.join(", ")}</td>
              <td className="border p-2">
                {product.dimensions.width}×{product.dimensions.height}×
                {product.dimensions.depth} cm
              </td>
              <td className="border p-2">
                {product.availability ? (
                  <span className="text-green-600 font-bold">Available</span>
                ) : (
                  <span className="text-red-600 font-bold">Not Available</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/admin/items/add">
        <CiCirclePlus className="text-[70px] absolute right-4 bottom-4 text-gray-700 hover:text-red-900 transition-all duration-300" />
      </Link>
    </div>
  );
}
