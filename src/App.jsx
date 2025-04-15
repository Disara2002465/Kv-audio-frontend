import "./App.css";
import AdminPage from "./pages/admin/adminPage";
import HomePage from "./pages/home/homePage";
import Testing from "./components/testing";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login/login";
import RegisterPage from "./pages/register/register";
import { Toaster } from "react-hot-toast";
import BookingPage from "./pages/home/bookingPage";
import VerifyEmail from "./pages/verifyEmail/verifyEmail";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="774884262961-qvgcnjafktv5hpcpcunojcf2opvdsbcu.apps.googleusercontent.com">
      <BrowserRouter>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/testing" element={<Testing />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<BookingPage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/*" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
