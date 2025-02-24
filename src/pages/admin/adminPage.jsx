import { BsGraphDown } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { Routes, Route, Link } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="w-full h-screen flex">
      {/* Sidebar */}
      <div className="w-[400px] h-full bg-green-200 p-4">
        <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center gap-2">
          <BsGraphDown /> Dashboard
        </button>

        <Link to="/admin/bookings" className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
          <FaRegBookmark /> Booking
        </Link>

        <Link to="/admin/items" className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center">
          <MdOutlineSpeaker /> Items
        </Link>

        <button className="w-full h-[40px] text-[25px] font-bold flex justify-center items-center gap-2">
          <FaRegUser /> User
        </button>
      </div>

      {/* Main Content */}
      <div className="w-[calc(100vw-400px)] bg-blue-900 p-4 text-white">
        <Routes>
          <Route path="bookings" element={<h1>Booking</h1>} />
          <Route path="items" element={<h1>Items</h1>} />
        </Routes>
      </div>
    </div>
  );
}
