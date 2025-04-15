import { useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileNavPanel from "./mobileNavPanel";

export default function Header() {
  const [navPanelOpen, setNavPanelOpen] = useState(false);
  const token = localStorage.getItem("token"); // Get token from local storage

  return (
    <header className="w-full h-[100px] shadow-xl flex justify-center items-center relative bg-amber-500">
      <img
        src="/logo.jpg"
        alt="logo"
        className="w-[100px] h-[100px] object-cover border-[3px] absolute left-1 rounded-full"
      />
      <Link
        to="/*"
        className=" hidden md:block text-[25px] font-bold  m-1 text-blue-700"
      >
        Home
      </Link>
      <Link
        to="/contact"
        className="hidden md:block text-[25px] font-bold  m-1 text-blue-700"
      >
        Contact
      </Link>
      <Link
        to="/gallery"
        className="hidden md:block text-[25px] font-bold m-1 text-blue-700"
      >
        Gallery
      </Link>
      <Link
        to="/items"
        className=" hidden md:block text-[25px] font-bold  m-1 text-blue-700"
      >
        Items
      </Link>
      <Link
        to="/booking"
        className=" hidden md:block text-[25px] font-bold  m-1 absolute right-24"
      >
        <FaCartShopping />
      </Link>
      <GiHamburgerMenu
        className="absolute right-5 text-[24px] md:hidden"
        onClick={() => {
          setNavPanelOpen(true);
        }}
      />
      {token != null && ( // Ensure token is defined before using it
        <button
          className=" hidden md:block absolute right-5 text-[24px] "
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      )}
      <MobileNavPanel isOpen={navPanelOpen} setOpen={setNavPanelOpen} />
    </header>
  );
}
