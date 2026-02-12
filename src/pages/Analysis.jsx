import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Analysis() {
  const [apiData, setApiData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const data = localStorage.getItem("skinstricApiResponse");
      if (data) setApiData(JSON.parse(data));
    } catch (e) {
      console.error(e);
      setApiData(null);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => navigate("/select", { replace: true }), 8000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white">
      <header className="w-full h-[80px] relative bg-white">
        <div className="absolute -top-4 right-0 -mr-[300px]">
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors disabled:pointer-events-none h-9 px-4 py-2 scale-75 text-[#FCFCFC] text-xs bg-[#1A1B1C] leading-4">
            ENTER CODE
          </button>
        </div>

        <div className="absolute -top-4 left-[-330px]">
          <div className="flex flex-row pt-1 scale-75 justify-start items-center">
            <Link
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 line-clamp-4 leading-4 text-[#1A1B1C]"
              to="/"
            >
              SKINSTRIC
            </Link>
            <img className="w-1 h-4" src="/Image/left-bracket.svg" alt="" />
            <p className="text-[#1a1b1c83] text-opacity-70 font-semibold text-sm ml-1.5 mr-1.5">
              INTRO
            </p>
            <img className="w-1 h-4" src="/Image/right-bracket.svg" alt="" />
          </div>
        </div>
      </header>

      <div className="min-h-[92vh] flex flex-col bg-white relative md:pt-16 justify-center transition-all duration-300">
        <div className="absolute -top-14 left-[-295px]">
          <h1 className="font-semibold text-xs md:text-sm">A.I. ANALYSIS</h1>
          <p className="text-xs mt-1 text-gray-600 uppercase leading-6">
            Analysis complete. Redirecting to selection...
          </p>
        </div>

        <div className="flex-[0.4] md:flex-1 flex flex-col items-center xl:justify-center relative">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Demographics Analysis Complete</h2>

            {apiData ? (
              <div className="bg-gray-100 p-6 rounded-lg max-w-md mx-auto">
                <h3 className="text-lg font-semibold mb-3">Results:</h3>

                {apiData.race && (
                  <div className="mb-3">
                    <strong>Race:</strong>
                    <div className="text-sm">
                      {Object.entries(apiData.race).map(([k, v]) => (
                        <div key={k}>{k}: {(Number(v) * 100).toFixed(1)}%</div>
                      ))}
                    </div>
                  </div>
                )}

                {apiData.age && (
                  <div className="mb-3">
                    <strong>Age:</strong>
                    <div className="text-sm">
                      {Object.entries(apiData.age).map(([k, v]) => (
                        <div key={k}>{k}: {(Number(v) * 100).toFixed(1)}%</div>
                      ))}
                    </div>
                  </div>
                )}

                {apiData.gender && (
                  <div className="mb-3">
                    <strong>Gender:</strong>
                    <div className="text-sm">
                      {Object.entries(apiData.gender).map(([k, v]) => (
                        <div key={k}>{k}: {(Number(v) * 100).toFixed(1)}%</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 text-yellow-900 p-4 rounded-lg max-w-md mx-auto">
                No saved analysis found. Redirecting…
              </div>
            )}

            <p className="mt-6 text-gray-600">Automatically redirecting in 8 seconds...</p>
          </div>
        </div>

        <div className="absolute bottom-16 left-[-330px]">
          <Link className="relative" to="/result">
            <span className="text-sm font-semibold">BACK</span>
          </Link>
        </div>

        <div className="absolute bottom-16 right-0 -mr-[300px]">
          <Link className="relative" to="/select">
            <span className="text-sm font-semibold">CONTINUE</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
