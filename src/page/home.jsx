import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Gambar kucing
const catFaces = {
  top: ["jaki", "neto", "miko", "black", "meci", "keci"],
  bottom: ["jaki", "neto", "miko", "black", "meci", "keci"],
  left: ["sapi", "poni"],
  right: ["poni", "sapi"],
};

const getImagePath = (name) => `/images/${name}.png`;

const Sticker = ({ name }) => (
  <div className="w-[112px] h-[112px] flex items-center justify-center">
    <img
      src={getImagePath(name)}
      alt={name}
      className="max-w-full max-h-full object-contain"
    />
  </div>
);

const Home = () => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClickAnywhere = () => {
    navigate("/scan");
  };

  return (
    <div
      className="relative min-h-screen w-screen flex items-center justify-center overflow-hidden cursor-pointer"
      onClick={handleClickAnywhere}
    >
      {/* Background split */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-sky-100 z-0" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white z-0" />

      {/* TOP row */}
      <div className="absolute top-6 left-0 right-0 px-6 flex justify-between items-center z-20">
        {catFaces.top.map((name, i) => (
          <Sticker key={`top-${i}`} name={name} />
        ))}
      </div>

      {/* BOTTOM row */}
      <div className="absolute bottom-6 left-0 right-0 px-6 flex justify-between items-center z-20">
        {catFaces.bottom.map((name, i) => (
          <Sticker key={`bottom-${i}`} name={name} />
        ))}
      </div>

      {/* LEFT column */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col justify-between h-[350px] z-20">
        {catFaces.left.map((name, i) => (
          <Sticker key={`left-${i}`} name={name} />
        ))}
      </div>

      {/* RIGHT column */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col justify-between h-[350px] z-20">
        {catFaces.right.map((name, i) => (
          <Sticker key={`right-${i}`} name={name} />
        ))}
      </div>

      {/* CENTER JOJO */}
      <div
        className="z-30 text-center px-4"
        onClick={(e) => e.stopPropagation()} 
      >
        <div
          className={`w-72 h-72 md:w-80 md:h-80 mx-auto mb-2 drop-shadow-lg transition-transform duration-300 ${
            isHovered ? "" : "animate-wiggle"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src="/images/jojo.png"
            alt="Main Cat"
            className="w-full h-full object-contain"
          />
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 tracking-tight drop-shadow">
          CAT CLASSIFICATION
        </h1>
        {isHovered && (
          <h2 className="text-xl md:text-3xl font-semibold text-gray-600 mt-2">
            Know Your Cat's Breed
          </h2>
        )}
      </div>
    </div>
  );
};

export default Home;
