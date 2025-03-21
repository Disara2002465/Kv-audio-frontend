import { useEffect, useState } from "react";
import { formatDate, localCart } from "../../utils/cart";
import BookingItem from "../../components/bookingItem";
import axios from "axios";
import toast from "react-hot-toast";

export default function BookingPage() {
  const [cart, setCart] = useState(localCart());
  const [startingDate, setStartingDate] = useState(formatDate(new Date()));
  const [endingDate, setEndingDate] = useState(
    formatDate(new Date(Date.now() + 24 * 60 * 60 * 1000))
  );
  const [total, setTotal] = useState(0);
  const daysBetween = Math.max(
    (new Date(endingDate) - new Date(startingDate)) / (1000 * 60 * 60 * 24),
    1
  );

  function reloadCart() {
    setCart(localCart());
    calculateTotal();
  }
  function calculateTotal() {
    const token = localStorage.getItem("token");
    const cartInfo = localCart();
    cartInfo.startingDate = startingDate;
    cartInfo.endingDate = endingDate;
    cartInfo.days = daysBetween;
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/quote`, cartInfo, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.data);
        setTotal(res.data.total);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  useEffect(() => {
    calculateTotal();
  }, [startingDate, endingDate]);

  function handleBookingCreation() {
    const cart = localCart();
    cart.startingDate = startingDate;
    cart.endingDate = endingDate;
    cart.days = daysBetween;

    const token = localStorage.getItem("token");
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, cart, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.removeItem("cart");
        toast.success("Booking Created");
        setCart(localCart());
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to create booking");
      });
  }

  return (
    <div className="w-full h-full flex flex-col items-center ">
      <h3 className="text-lg font-semibold text-red-900 bg-white">
        Create Booking
      </h3>
      <div className="w-full flex flex-col items-center gap-4 mt-4">
        <label className="flex flex-col">
          <span className="text-accent font-semibold">Starting Date:</span>
          <input
            type="date"
            value={startingDate}
            onChange={(e) => setStartingDate(e.target.value)}
            className="border border-secondary rounded-md p-2"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-accent font-semibold">Ending Date:</span>
          <input
            type="date"
            value={endingDate}
            onChange={(e) => setEndingDate(e.target.value)}
            className="border border-secondary rounded-md p-2"
          />
        </label>
        <p className="text-lg font-semibold text-blue-700 bg-white">
          Total Days: {daysBetween}
        </p>
      </div>
      <div className="w-full flex flex-col items-center mt-4">
        {cart.orderedItems.map((item) => {
          return (
            <BookingItem
              itemKey={item.key}
              key={item.key}
              qty={item.qty}
              refresh={reloadCart}
            />
          );
        })}
      </div>
      <div className="w-full flex justify-center mt-4">
        <p className="text-accent font-semibold">Total: {total.toFixed(2)}</p>
      </div>
      <div className="w-full flex justify-center mt-4">
        <button
          className="bg-accent text-white bg-blue-700 px-4 py-2 rounded-md"
          onClick={handleBookingCreation}
        >
          Create Booking
        </button>
      </div>
    </div>
  );
}
