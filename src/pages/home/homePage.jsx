import { Routes, Route } from "react-router-dom";
import Header from "../../components/header";
import Home from "./home";
import Contact from "./contact";
import Gallery from "./gallery";
import Items from "./items";

export default function HomePage() {
  return (
    <>
      <Header />
      <div className="h-[calc(100vh-100px)] w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/items" element={<Items />} />
          {/* <Route path="/*" element={<ErrorNotFound />} /> */}
          {/* Wildcard route for invalid paths */}
        </Routes>
      </div>
    </>
  );
}
