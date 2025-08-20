import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeftCircle,
  Send,
  PawPrint,
  Sparkles,
  Cat,
  XCircle,
} from "lucide-react";
import axios from "axios";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const image = location.state?.image;

  const [predictedBreed, setPredictedBreed] = useState("Loading...");

  const decorations = [
    { src: "/images/cat9.png", style: "top-[8%] left-[5%] w-60" },
    { src: "/images/cat3.png", style: "bottom-[46%] right-[14%] w-60" },
    { src: "/images/cat11.png", style: "top-[71%] left-[88%] w-55" },
    { src: "/images/cat12.png", style: "top-[79%] right-[83%] w-60" },
    {
      icon: <Cat className="w-8 h-8 text-pink-400" />,
      style: "top-[30%] right-[8%]",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-purple-400" />,
      style: "bottom-[15%] left-[10%]",
    },
    {
      icon: <PawPrint className="w-10 h-10 text-blue-500" />,
      style: "top-[65%] left-[45%]",
    },
  ];

  useEffect(() => {
    if (image) {
      const fetchPrediction = async () => {
        try {
          const blob = await (await fetch(image)).blob();
          const formData = new FormData();
          formData.append("file", blob, "image.png");

          const response = await axios.post(
            "https://alfianannd-cat-classification.hf.space/predict",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          setPredictedBreed(response.data.prediction);
        } catch (error) {
          console.error("Prediction error:", error);
          setPredictedBreed("Prediction failed");
        }
      };

      fetchPrediction();
    }
  }, [image]);

  const goToRecommendation = () => {
    navigate("/recommendation", { state: { breed: predictedBreed } });
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-yellow-50 via-pink-50 to-indigo-100 overflow-hidden flex flex-col items-center justify-center px-4 py-8 z-0">
      {/* Dekorasi */}
      {decorations.map((item, index) => (
        <div key={index} className={`absolute ${item.style} z-0`}>
          {item.src ? (
            <img
              src={item.src}
              alt={`dec-${index}`}
              className="w-full h-auto"
            />
          ) : (
            item.icon
          )}
        </div>
      ))}

      {/* Tombol Exit */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 right-5 z-10 text-red-400 hover:text-red-600 hover:scale-110 transition"
      >
        <XCircle className="w-10 h-10" />
      </button>

      {/* Tombol Back */}
      <button
        onClick={() => navigate("/scan")}
        className="absolute top-5 left-5 z-10 text-indigo-600 hover:text-indigo-800 hover:scale-110 transition"
      >
        <ArrowLeftCircle className="w-10 h-10" />
      </button>

      {/* Stiker */}
      <img
        src="/images/sticker.png"
        alt="Sticker"
        className="w-24 sm:w-32 mt-2 z-10"
      />

      {/* Judul */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mt-4 z-10">
        Your Cat's Breed
      </h1>

      {/* Gambar hasil */}
      <div className="mt-6 w-full max-w-md aspect-square bg-white rounded-xl shadow-xl overflow-hidden flex items-center justify-center z-10">
        <img
          src={image}
          alt="Result"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Prediksi ras */}
      <div className="mt-4 text-center z-10">
        <h2 className="text-2xl font-semibold text-indigo-600">
          {predictedBreed}
        </h2>
      </div>

      {/* Tombol ke rekomendasi */}
      <button
        onClick={() =>
          navigate("/recommendation", {
            state: { image, breed: predictedBreed },
          })
        }
        className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-full shadow-lg transition"
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Result;
