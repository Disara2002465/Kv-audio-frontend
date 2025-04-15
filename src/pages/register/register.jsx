import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "./register.css";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  function handleOnSubmit(e) {
    e.preventDefault();
    console.log({ firstName, lastName, email, password, address, phone });

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, {
        firstName,
        lastName,
        email,
        password,
        address,
        phone,
      })
      .then(() => {
        toast.success("Registration Success");
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error || "An error occured");
      });
  }

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: 'url("bg.jpg")' }}
    >
      <form
        onSubmit={handleOnSubmit}
        className="backdrop-blur-xl rounded-2xl p-8 w-96 flex flex-col items-center"
      >
        <img
          src="/logo.jpg"
          alt="logo"
          className="w-24 h-24 object-cover mb-4"
        />

        <input
          type="text"
          placeholder="First Name"
          className="w-full bg-transparent border-b-2 border-white text-white text-lg outline-none py-2 my-2 text-center"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          className="w-full bg-transparent border-b-2 border-white text-white text-lg outline-none py-2 my-2 text-center"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-transparent border-b-2 border-white text-white text-lg outline-none py-2 my-2 text-center"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full bg-transparent border-b-2 border-white text-white text-lg outline-none py-2 my-2 text-center"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          className="w-full bg-transparent border-b-2 border-white text-white text-lg outline-none py-2 my-2 text-center"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full bg-transparent border-b-2 border-white text-white text-lg outline-none py-2 my-2 text-center"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full mt-6 py-3 bg-amber-400 text-xl text-white font-bold rounded-lg hover:bg-amber-500 transition duration-300"
        >
          Register
        </button>
      </form>
    </div>
  );
}
