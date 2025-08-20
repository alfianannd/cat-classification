import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftCircle, XCircle } from "lucide-react";

// Mapping hasil prediksi ke nama yang cocok di data
const breedMap = {
  "Abyssinian Cat": "Abyssinian",
  "Bengal Cat": "Bengal",
  "Birman Cat": "Birman",
  "Bombay Cat": "Bombay",
  "British Shorthair Cat": "British Shorthair",
  "Egyptian Cat": "Egyptian",
  "Mainecoon Cat": "Mainecoon",
  "Persian Cat": "Persian",
  "Ragdoll Cat": "Ragdoll",
  "Russian Blue Cat": "Russian Blue",
  "Siamese Cat": "Siamese",
  "Sphynx Cat": "Sphynx",
};

const breedCareTips = {
  Abyssinian: [
    "Berikan waktu bermain aktif setiap hari.",
    "Rutin periksa gigi dan kuku.",
    "Sediakan tempat tinggi untuk memanjat.",
  ],
  Bengal: [
    "Berikan stimulasi mental dan mainan interaktif.",
    "Latih untuk berjalan menggunakan tali.",
    "Sediakan makanan tinggi protein.",
  ],
  Birman: [
    "Sisir bulu dua kali seminggu.",
    "Periksa mata dan telinga secara rutin.",
    "Jaga berat badan dengan makanan seimbang.",
  ],
  Bombay: [
    "Perhatikan kesehatan jantung dan berat badan.",
    "Mainkan setiap hari untuk aktivitas fisik.",
    "Rawat bulu pendek dengan kain lembut.",
  ],
  "British Shorthair": [
    "Sediakan makanan rendah kalori.",
    "Ajak bermain untuk mencegah obesitas.",
    "Periksa kesehatan gigi secara rutin.",
  ],
  Egyptian: [
    "Jaga kebersihan telinga dan kuku.",
    "Berikan area bermain aktif.",
    "Pastikan asupan makanan tinggi energi.",
  ],
  Mainecoon: [
    "Sediakan area bermain yang luas.",
    "Periksa kesehatan sendi secara rutin.",
    "Berikan pakan berkualitas tinggi.",
  ],
  Persian: [
    "Rutin menyisir bulu panjang setiap hari.",
    "Gunakan sampo khusus kucing berbulu panjang.",
    "Bersihkan mata secara teratur.",
  ],
  Ragdoll: [
    "Perhatikan tanda alergi atau sensitivitas kulit.",
    "Gunakan sampo ringan untuk perawatan bulu.",
    "Sediakan tempat tidur yang empuk.",
  ],
  "Russian Blue": [
    "Berikan waktu bermain di tempat sepi.",
    "Pastikan tidak stres terhadap lingkungan baru.",
    "Jaga pola makan dan hidrasi.",
  ],
  Siamese: [
    "Berikan banyak perhatian dan interaksi.",
    "Sediakan mainan puzzle dan interaktif.",
    "Jaga telinga tetap bersih.",
  ],
  Sphynx: [
    "Mandikan seminggu sekali untuk membersihkan minyak kulit.",
    "Jaga kehangatan tubuh dengan selimut.",
    "Periksa kulit dari ruam dan iritasi.",
  ],
};

const feedRecommendations = {
  Abyssinian: ["Hill's Science Diet Adult", "Royal Canin Fit 32"],
  Bengal: ["Acana Wild Prairie", "Orijen Six Fish"],
  Birman: ["Purina One Sensitive", "Royal Canin Birman"],
  Bombay: ["Royal Canin Indoor", "Iams ProActive Health"],
  "British Shorthair": ["Royal Canin British Shorthair", "Wellness Core Indoor"],
  Egyptian: ["Purina Pro Plan Active", "Royal Canin Egyptian Mau (alternatif)"],
  Mainecoon: ["Royal Canin Maine Coon Adult", "Orijen Cat & Kitten"],
  Persian: ["Royal Canin Persian Adult", "Hill’s Hairball Control"],
  Ragdoll: ["Royal Canin Ragdoll", "Nutro Wholesome Essentials"],
  "Russian Blue": ["Royal Canin Indoor", "Purina Pro Plan Calm"],
  Siamese: ["Royal Canin Siamese", "Hill’s Science Diet Sensitive"],
  Sphynx: ["Royal Canin Sphynx", "Purina One High Protein"],
};

const RecommendationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const image = location.state?.image;
  const rawBreed = location.state?.breed || "Unknown Breed";
  const breed = breedMap[rawBreed] || rawBreed;
  const isNotCat = breed === "Not cat";

  const careTips = breedCareTips[breed];
  const feeds = feedRecommendations[breed];

  return (
    <div className="fixed inset-0 bg-gradient-to-tr from-white via-sky-50 to-pink-50 px-6 py-10 flex flex-col items-center overflow-auto">
      {/* Tombol Kembali */}
      <button
        onClick={() => navigate("/result", { state: { image, breed: rawBreed } })}
        className="absolute top-4 left-4 text-gray-700 hover:text-indigo-700 hover:scale-110 transition z-20"
      >
        <ArrowLeftCircle className="w-9 h-9" />
      </button>

      {/* Tombol Exit */}
      <button
        onClick={() => navigate("/scan")}
        className="absolute top-4 right-4 text-gray-700 hover:text-red-500 hover:scale-110 transition z-20"
      >
        <XCircle className="w-9 h-9" />
      </button>

      {/* Header */}
      <div className="text-center mb-6 z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          {isNotCat ? "Oops! Tips tidak tersedia" : `Perawatan untuk ${breed}`}
        </h1>
      </div>

      {/* Gambar selalu tampil */}
      {image && (
        <div className="w-full max-w-sm rounded-xl overflow-hidden shadow-xl bg-white border border-gray-200 mb-6">
          <img
            src={image}
            alt="Scanned Cat"
            className="w-full h-auto object-contain"
          />
        </div>
      )}

      {/* Konten: Jika Not Cat, tampilkan icon X di 2 kolom */}
      {isNotCat ? (
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6 z-10">
          {[1, 2].map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center bg-white border border-gray-200 rounded-2xl p-6 shadow-lg h-52"
            >
              <XCircle className="w-16 h-16 text-red-400 mb-2" />
              <p className="text-gray-500 italic">Tidak tersedia</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-6 z-10">
          {/* Tips Perawatan */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-indigo-600 mb-4">
              Tips Perawatan Harian
            </h2>
            {careTips ? (
              <ul className="space-y-3 list-disc list-inside text-gray-700 text-base">
                {careTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 italic">
                Tips belum tersedia untuk ras ini.
              </p>
            )}
          </div>

          {/* Rekomendasi Pakan */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-indigo-600 mb-4">
              Rekomendasi Pakan
            </h2>
            {feeds ? (
              <ul className="space-y-3 list-disc list-inside text-gray-700 text-base">
                {feeds.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500 italic">
                Belum ada rekomendasi pakan untuk ras ini.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationPage;
