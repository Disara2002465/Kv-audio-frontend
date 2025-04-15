import React from "react";

const Gallery = () => {
  const photos = [
    "/e1.jpg",
    "/e2.jpg",
    "/e3.jpg",
    "/e4.jpeg",
    "/e5.jpg",
    "/e6.jpg",
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-wide">
        🌟 Our Event Photos 🌟
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl shadow-xl transition-shadow hover:shadow-2xl"
          >
            <img
              src={photo}
              alt={`Event ${index + 1}`}
              className="w-full h-64 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white font-semibold text-lg tracking-wide">
                🎉 Event {index + 1}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
