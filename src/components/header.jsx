import { FaCartPlus } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full h-[100px] shadow-xl flex justify-center items-center relative bg-amber-500">
      <img
        src="/logo.jpg"
        alt="logo"
        className="w-[100px] h-[100px] object-cover border-[3px] absolute left-1 rounded-full"
      />
      <Link to="/*" className="text-[25px] font-bold  m-1 text-blue-700">
        Home
      </Link>
      <Link to="/contact" className="text-[25px] font-bold  m-1 text-blue-700">
        Contact
      </Link>
      <Link to="/gallery" className="text-[25px] font-bold m-1 text-blue-700">
        Gallery
      </Link>
      <Link to="/items" className="text-[25px] font-bold  m-1 text-blue-700">
        Items
      </Link>
      <Link
        to="/booking"
        className="text-[25px] font-bold  m-1 absolute right-3"
      >
        <FaCartShopping />
      </Link>
    </header>
  );
}
