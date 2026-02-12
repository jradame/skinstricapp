import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";


// IMAGE ASSETS
const leftbracket = "/Image/left-bracket.svg";
const rightbracket = "/Image/right-bracket.svg";
const largediamond = "/Image/diamond-large.svg";
const mediumdiamond = "/Image/diamond-medium.svg";
const smalldiamond = "/Image/diamond-small.svg";

export default function Result() {
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [showCameraPopup, setShowCameraPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    return () => {
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [stream]);

  const compressImage = (file, maxWidth = 800, quality = 0.7) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      img.onload = () => {
        try {
          const ratio = Math.min(maxWidth / img.width, maxWidth / img.height, 1);
          canvas.width = Math.round(img.width * ratio);
          canvas.height = Math.round(img.height * ratio);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        } catch (e) {
          reject(e);
        }
      };

      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const handleCameraClick = () => setShowCameraPopup(true);

  const handleAllowCamera = async () => {
    setShowCameraPopup(false);
    setCameraLoading(true);

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setTimeout(() => {
        setCameraLoading(false);
        setStream(mediaStream);
        setShowCameraModal(true);

        setTimeout(() => {
          if (videoRef.current && mediaStream) {
            videoRef.current.srcObject = mediaStream;
            videoRef.current.play().catch((err) => console.error("Video play error:", err));
          }
        }, 200);
      }, 1000);
    } catch (error) {
      console.error("Camera access denied:", error);
      setCameraLoading(false);
      alert("Camera access denied. Allow camera permissions and try again.");
    }
  };

  const handleDenyCamera = () => setShowCameraPopup(false);

  const handleCloseCameraModal = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    setShowCameraModal(false);
  };

  const sendToAPI = async (base64) => {
    console.log("Sending image to API...");
    localStorage.setItem("uploadedImage", base64);

    let base64Data = base64;
    if (base64.includes(",")) base64Data = base64.split(",")[1];

    const payload = { image: base64Data };

    const response = await fetch(
      "https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    console.log("API Response:", result);

    if (!response.ok || !result?.success) {
      throw new Error(result?.message || `API error ${response.status}`);
    }

    if (!result?.data) throw new Error("Invalid API response format (missing data)");

    localStorage.setItem("skinstricApiResponse", JSON.stringify(result.data));
  };

  const handleCapturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageSrc = canvas.toDataURL("image/jpeg", 0.9);

    setPreview(imageSrc);
    handleCloseCameraModal();
    setLoading(true);

    try {
      await sendToAPI(imageSrc);
      setLoading(false);
      setShowSuccessPopup(true);
    } catch (e) {
      console.error(e);
      setLoading(false);
      alert("Failed to analyze image. Please try again.");
    }
  };

  const handleChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedBase64 = await compressImage(file);
      setPreview(compressedBase64);
      setLoading(true);
      await sendToAPI(compressedBase64);
      setLoading(false);
      setShowSuccessPopup(true);
    } catch (e2) {
      console.error("Upload/analyze failed:", e2);
      setLoading(false);
      alert("Failed to analyze image. Please try again.");
    }
  };

  const handleSuccessOK = () => {
    setShowSuccessPopup(false);
    navigate("/select", { replace: true });
  };

  const DiamondBackground = () => (
    <div className="absolute inset-0 flex items-center justify-center -z-10">
      <div
        className="absolute animate-spin-slow bg-black opacity-90"
        style={{
          width: "200px",
          height: "200px",
          maskImage: `url(${largediamond})`,
          WebkitMaskImage: `url(${largediamond})`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      />
      <div
        className="absolute animate-spin-slower bg-black opacity-90"
        style={{
          width: "150px",
          height: "150px",
          maskImage: `url(${mediumdiamond})`,
          WebkitMaskImage: `url(${mediumdiamond})`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      />
      <div
        className="absolute animate-spin-slowest bg-black opacity-90"
        style={{
          width: "100px",
          height: "100px",
          maskImage: `url(${smalldiamond})`,
          WebkitMaskImage: `url(${smalldiamond})`,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {cameraLoading && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center px-4">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mb-8">
            <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#9CA3AF" strokeWidth="0.5" strokeDasharray="2 4" />
            </svg>
          </div>

          <p className="text-base sm:text-lg md:text-xl text-gray-500 tracking-wider mb-16 sm:mb-24 md:mb-32">
            SETTING UP CAMERA ...
          </p>

          <img
            src="/Image/camerainfo.svg"
            alt="Camera Instructions"
            className="absolute bottom-10 sm:bottom-16 md:bottom-20 w-auto h-auto max-w-[90vw] sm:max-w-[70vw] md:max-w-[600px]"
          />
        </div>
      )}

      {loading ? (
        <div className="fixed inset-0 w-screen h-screen bg-white z-[9999] flex flex-col justify-center items-center">
          <div className="relative flex items-center justify-center scale-50 sm:scale-75 md:scale-100">
            <img src={largediamond} alt="Large-Diamond" className="animate-spin-slow" />
            <img src={mediumdiamond} alt="Medium-Diamond" className="animate-spin-slower absolute" />
            <img src={smalldiamond} alt="Small-Diamond" className="animate-spin-slowest absolute" />
            <div className="absolute flex flex-col items-center justify-center z-10">
              <p className="text-sm sm:text-base md:text-lg font-semibold text-[#1A1B1C] whitespace-nowrap">
                PREPARING YOUR ANALYSIS
              </p>
              <div className="flex space-x-2 mt-3">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <header className="flex flex-row h-[64px] w-full justify-between items-start py-3 px-4 md:px-9 mb-3 relative z-[1000]">
            <div className="flex flex-col items-start">
              <div className="flex flex-row items-center scale-[0.6] md:scale-75 origin-left">
                <Link
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 line-clamp-4 leading-[16px] text-[#1A1B1C]"
                  to="/"
                >
                  SKINSTRIC
                </Link>
                <img className="w-[4px] h-[17px]" src={leftbracket} alt="left-bracket" />
                <p className="text-[#1a1b1c83] font-semibold text-sm ml-1.5 mr-1.5">INTRO</p>
                <img className="w-[4px] h-[17px]" src={rightbracket} alt="right-bracket" />
              </div>
              <p className="font-bold text-[9px] md:text-xs mt-1 ml-6 md:ml-3 text-black">TO START ANALYSIS</p>
            </div>

            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors text-[#FCFCFC] text-[10px] bg-[#1A1B1C] h-9 px-4 py-2 scale-[0.7] md:scale-[0.8] leading-[16px]">
              ENTER CODE
            </button>
          </header>

          <div className="min-h-[92vh] flex flex-col bg-white relative md:pt-[64px] justify-center px-4 sm:px-6">
            <div className="flex flex-col items-center gap-12 sm:gap-16 md:gap-20 lg:hidden relative z-20 mt-12">
              <div className="relative flex flex-col items-center">
                <DiamondBackground />
                <img
                  src="/Image/camera-left.svg"
                  alt="Camera Icon"
                  className="w-[200px] sm:w-[250px] h-auto cursor-pointer"
                  onClick={handleCameraClick}
                />
                <div className="mt-4 text-center">
                  <p className="text-xs sm:text-sm font-normal">ALLOW A.I.</p>
                  <p className="text-xs sm:text-sm font-normal">TO SCAN YOUR FACE</p>
                </div>
              </div>

              <div className="relative flex flex-col items-center">
                <DiamondBackground />
                <img
                  src="/Image/gallery-right.svg"
                  alt="Gallery Icon"
                  className="w-[200px] sm:w-[250px] h-auto cursor-pointer"
                  onClick={() => galleryInputRef.current?.click()}
                />
                <div className="mt-4 text-center">
                  <p className="text-xs sm:text-sm font-normal">ALLOW A.I.</p>
                  <p className="text-xs sm:text-sm font-normal">ACCESS GALLERY</p>
                </div>
              </div>
            </div>

            {/* inputs */}
            <input ref={cameraInputRef} accept="image/*" className="hidden" type="file" onChange={handleChange} />
            <input ref={galleryInputRef} accept="image/*" className="hidden" type="file" onChange={handleChange} />

            <div className="lg:hidden mt-8 flex flex-col items-center">
              <h1 className="text-xs sm:text-sm font-normal mb-2">Preview</h1>
              <div className="w-24 h-24 sm:w-32 sm:h-32 border border-gray-300 overflow-hidden bg-gray-50">
                {preview && <img src={preview} alt="Preview" className="w-full h-full object-cover" />}
              </div>
            </div>

            <div className="pt-4 md:pt-0 pb-8 bg-white sticky md:static bottom-30.5 mb-0 md:mb-0">
              <div className="absolute bottom-6 sm:bottom-8 w-full flex justify-between px-4 sm:px-6 md:px-9 lg:px-13">
                <Link className="relative" aria-label="Back" to="/introduce">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                    <span className="rotate-[-45deg] text-[10px] font-semibold sm:hidden">BACK</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      {showCameraPopup && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998]" onClick={handleDenyCamera} />
          <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none p-4">
            <div className="relative pointer-events-auto">
              <img src="/Image/float-info.svg" alt="Camera Permission" className="w-auto h-auto max-w-[90vw] sm:max-w-[70vw] md:max-w-[600px]" />
              <button
                onClick={handleDenyCamera}
                className="absolute bottom-[8%] left-[15%] w-[30%] h-[12%] bg-transparent cursor-pointer"
                aria-label="Deny camera"
              />
              <button
                onClick={handleAllowCamera}
                className="absolute bottom-[8%] right-[15%] w-[30%] h-[12%] bg-transparent cursor-pointer"
                aria-label="Allow camera"
              />
            </div>
          </div>
        </>
      )}

      {showCameraModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-90 z-[9998]" />
          <div className="fixed inset-0 flex flex-col items-center justify-center z-[9999] p-4">
            <div className="w-full max-w-2xl bg-black rounded-lg overflow-hidden">
              <div className="relative aspect-video bg-black">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              </div>
              <div className="flex justify-between items-center p-3 sm:p-4 bg-[#1A1B1C]">
                <button
                  onClick={handleCloseCameraModal}
                  className="px-3 sm:px-4 py-2 bg-gray-700 text-white rounded text-xs sm:text-sm font-medium hover:bg-gray-600 transition-colors"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleCapturePhoto}
                  className="px-4 sm:px-6 py-2 bg-[#4a9eff] text-white rounded text-xs sm:text-sm font-medium hover:bg-[#3a8eef] transition-colors"
                >
                  CAPTURE
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {showSuccessPopup && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998]" />
          <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
            <div className="bg-[#2a2a2a] text-white p-6 rounded-lg max-w-sm w-full mx-4 text-center">
              <div className="mb-4">
                <p className="text-xs sm:text-sm text-gray-300 mb-2">skinstric says</p>
                <p className="text-sm sm:text-base text-white font-medium">Image analyzed successfully!</p>
              </div>
              <button
                onClick={handleSuccessOK}
                className="px-6 sm:px-8 py-2 bg-[#4a9eff] text-white rounded-full text-xs sm:text-sm font-medium hover:bg-[#3a8eef] transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
