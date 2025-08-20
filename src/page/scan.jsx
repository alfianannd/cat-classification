import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PawPrint,
  ImagePlus,
} from "lucide-react";

const Scan = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [bounce, setBounce] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    };
    startCamera();
  }, []);

  const handleTakePicture = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 640, 400);
    const imageData = canvasRef.current.toDataURL("image/png");
    setBounce(true);
    setTimeout(() => setBounce(false), 500);
    setTimeout(() => {
      navigate("/result", { state: { image: imageData } });
    }, 600);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      navigate("/result", { state: { image: imageURL } });
    }
  };

  const decorations = [
    { src: "/images/cat10.png", style: "bottom-[62%] right-[91%] w-42" },
    { src: "/images/cat3.png", style: "bottom-[72%] right-[1%] w-65" },
    { src: "/images/cat4.png", style: "bottom-[60%] left-[15%] w-70" },
    { src: "/images/cat9.png", style: "top-[9%] right-[18%] w-50" },
    { src: "/images/cat_scan1.png", style: "top-[38%] left-[6%] w-50" },
    { src: "/images/cat8.png", style: "top-[34%] right-[3%] w-44" },
    { src: "/images/cat7.png", style: "top-[53%] left-[19%] w-46" },
    { src: "/images/cat_scan2.png", style: "top-[50%] right-[15%] w-55" },
    { src: "/images/cat5.png", style: "bottom-[28%] right-[30%] w-24" },
    { src: "/images/cat6.png", style: "top-[74%] left-[3%] w-55" },
    { src: "/images/cat_scan3.png", style: "bottom-[4%] left-[86%] w-45" },
  ];
  

  return (
    <div className="relative h-screen w-screen bg-white overflow-hidden flex flex-col items-center justify-center px-4 py-6">
      {/* Dekorasi gambar */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {decorations.map((item, index) => (
          <div key={index} className={`absolute ${item.style}`}>
            <img src={item.src} alt={`dec-${index}`} className="w-full h-auto" />
          </div>
        ))}
      </div>

      {/* Judul */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2 z-10 text-center">
        Snap or Upload Your Cat!
      </h1>

      {/* Stiker tengah */}
      <img
        src="/images/sticker.png"
        alt="Sticker"
        className="w-21 sm:w-60 md:w-73 mb-[-89px] z-10"
      />

      {/* Frame kamera + upload */}
      <div className="z-20 flex flex-col sm:flex-row items-center justify-center gap-4 mt-6 w-full max-w-6xl px-2">
        <div className="sm:self-end">
          <label className="cursor-pointer text-emerald-500 hover:text-emerald-700 transition hover:scale-110 rounded-full bg-white p-2 shadow-md">
            <ImagePlus className="w-7 h-7" />
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
        </div>

        <div className="relative w-full sm:w-[640px] aspect-video border-4 border-gray-700 rounded-xl overflow-hidden shadow-2xl bg-white flex items-center justify-center">
          <video ref={videoRef} autoPlay className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Tombol ambil foto */}
      <div className="mt-4 flex flex-col items-center z-20">
        <button
          onClick={handleTakePicture}
          className={`text-black transition hover:scale-110 ${bounce ? "animate-bounce" : ""}`}
        >
          <PawPrint className="w-10 h-10" />
        </button>
        <span className="text-sm text-black mt-1">click here</span>
      </div>

      <canvas ref={canvasRef} width={640} height={400} className="hidden" />
    </div>
  );
};

export default Scan;
