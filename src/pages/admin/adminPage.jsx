import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark, FaRegUser } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { Routes, Route, Link } from "react-router-dom";
import AdminItemsPage from "./adminItemsPage";
import AddItemsPage from "./addItemsPage";
import UpdateItemsPage from "./updateItemPage";
import AdminUsersPage from "./adminUsersPage";
import AdminOrdersPage from "./adminBookingPage";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
  const [userValidated, setUserValidated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const user = res.data;
        if (user.role !== "admin") {
          setUserValidated(true);
        } else {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        console.error(err);
        setUserValidated(false);
      });
  }, []); // Corrected the useEffect hook

  return (
    <div className="w-full h-screen flex">
      {/* Sidebar */}
      <div className="w-[200px] h-full bg-green-200 p-4 flex flex-col gap-2">
        <Link
          to="/admin/dashboard"
          className="w-full h-[40px] text-[20px] font-bold flex items-center gap-2 p-2 hover:bg-green-300 rounded-md"
        >
          <BsGraphDown /> Dashboard
        </Link>

        <Link
          to="/admin/orders"
          className="w-full h-[40px] text-[20px] font-bold flex items-center gap-2 p-2 hover:bg-green-300 rounded-md"
        >
          <FaRegBookmark /> Orders
        </Link>

        <Link
          to="/admin/items"
          className="w-full h-[40px] text-[20px] font-bold flex items-center gap-2 p-2 hover:bg-green-300 rounded-md"
        >
          <MdOutlineSpeaker /> Items
        </Link>

        <Link
          to="/admin/users"
          className="w-full h-[40px] text-[20px] font-bold flex items-center gap-2 p-2 hover:bg-green-300 rounded-md"
        >
          <FaRegUser /> Users
        </Link>
      </div>

      {/* Main Content */}
      <div className="w-[calc(100vw-200px)] p-4 bg-gray-100 text-black">
        {userValidated && (
          <Routes>
            <Route path="/dashboard" element={<h1>Dashboard</h1>} />
            <Route path="/orders" element={<AdminOrdersPage />} />
            <Route path="/users" element={<AdminUsersPage />} />
            <Route path="/items" element={<AdminItemsPage />} />
            <Route path="/items/add" element={<AddItemsPage />} />
            <Route path="/items/edit" element={<UpdateItemsPage />} />
          </Routes>
        )}
      </div>
    </div>
  );
}
