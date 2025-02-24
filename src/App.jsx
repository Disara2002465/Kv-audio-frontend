import "./App.css";
import AdminPage from "./pages/admin/adminPage";
import HomePage from "./pages/home/homePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/admin/*" element={<AdminPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
