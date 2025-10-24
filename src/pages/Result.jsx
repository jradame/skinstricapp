import React, { useRef, useState, useEffect } from 'react'
import axios from 'axios'

// ========================================
// IMAGE ASSETS
// ========================================
const leftbracket = "/Image/left-bracket.svg"
const rightbracket = "/Image/right-bracket.svg"
const largediamond = "/Image/diamond-large.svg"
const mediumdiamond = "/Image/diamond-medium.svg"
const smalldiamond = "/Image/diamond-small.svg"

// ========================================
// RESULT COMPONENT
// ========================================
const Result = () => {
  // ========================================
  // REFS
  // ========================================
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const cameraInputRef = useRef(null)
  const galleryInputRef = useRef(null)

  // ========================================
  // STATE MANAGEMENT
  // ========================================
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [cameraLoading, setCameraLoading] = useState(false)
  const [showCameraPopup, setShowCameraPopup] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [showCameraModal, setShowCameraModal] = useState(false)
  const [stream, setStream] = useState(null)

  // ========================================
  // CLEANUP EFFECT
  // ========================================
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  // ========================================
  // IMAGE COMPRESSION
  // ========================================
  const compressImage = (file, maxWidth = 800, quality = 0.7) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      const img = new Image()
      
      img.onload = () => {
        const ratio = Math.min(maxWidth / img.width, maxWidth / img.height)
        canvas.width = img.width * ratio
        canvas.height = img.height * ratio
        
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality)
        resolve(compressedBase64)
      }
      
      img.src = URL.createObjectURL(file)
    })
  }

  // ========================================
  // CAMERA HANDLERS
  // ========================================
  const handleCameraClick = () => {
    setShowCameraPopup(true)
  }

  const handleAllowCamera = async () => {
    setShowCameraPopup(false)
    setCameraLoading(true)
    
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      })
      
      setTimeout(() => {
        setCameraLoading(false)
        setStream(mediaStream)
        setShowCameraModal(true)
        
        setTimeout(() => {
          if (videoRef.current && mediaStream) {
            videoRef.current.srcObject = mediaStream
            videoRef.current.play().catch(err => console.error('Video play error:', err))
          }
        }, 200)
      }, 2000)
      
    } catch (error) {
      console.error('Camera access denied:', error)
      setCameraLoading(false)
      alert('Camera access was denied. Please allow camera permissions in your browser settings and try again.')
    }
  }

  const handleDenyCamera = () => {
    setShowCameraPopup(false)
  }

  const handleCloseCameraModal = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setShowCameraModal(false)
  }

  const handleCapturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return
    
    const video = videoRef.current
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    
    context.drawImage(video, 0, 0, canvas.width, canvas.height)
    const imageSrc = canvas.toDataURL('image/jpeg', 0.9)
    
    setPreview(imageSrc)
    handleCloseCameraModal()
    setLoading(true)
    
    try {
      await sendToAPI(imageSrc)
    } catch (error) {
      console.error('Failed to send to API:', error)
      setLoading(false)
      alert('Failed to analyze image. Please try again.')
    }
  }

  // ========================================
  // GALLERY UPLOAD HANDLER
  // ========================================
  const handleChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    try {
      const compressedBase64 = await compressImage(file)
      setPreview(compressedBase64)
      setLoading(true)
      await sendToAPI(compressedBase64)
    } catch (error) {
      console.error('Image compression failed:', error)
      setLoading(false)
    }
  }

  // ========================================
  // SUCCESS HANDLER
  // ========================================
  const handleSuccessOK = () => {
    setShowSuccessPopup(false)
    window.location.href = '/select'
  }

  // ========================================
  // API INTEGRATION
  // ========================================
  const sendToAPI = async (base64) => {
    try {
      console.log('Sending image to API...')
      
      localStorage.setItem('uploadedImage', base64)
      
      let base64Data = base64
      if (base64.includes(',')) {
        base64Data = base64.split(',')[1]
      }
      
      const payload = {
        image: base64Data
      }
      
      console.log('Sending payload with image length:', base64Data.length)
      
      const response = await fetch('https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseTwo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      })

      const result = await response.json()
      console.log('API Response:', result)
      
      if (!response.ok || !result.success) {
        throw new Error(result.message || `API Error: ${response.status}`)
      }
      
      if (result.data) {
        localStorage.setItem('skinstricApiResponse', JSON.stringify(result.data))
        setLoading(false)
        setShowSuccessPopup(true)
      } else {
        throw new Error('Invalid API response format')
      }
      
    } catch (error) {
      console.error('Analysis failed:', error)
      setLoading(false)
      alert('Failed to analyze image. Please try again.')
    }
  }

  // ========================================
  // DIAMOND BACKGROUND COMPONENT - RESPONSIVE
  // ========================================
  const DiamondBackground = () => (
    <div className="absolute inset-0 flex items-center justify-center -z-10">
      <div 
        className="absolute animate-spin-slow bg-black opacity-90"
        style={{ 
          width: '200px', 
          height: '200px',
          maskImage: `url(${largediamond})`,
          WebkitMaskImage: `url(${largediamond})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center'
        }}
      />
      <div 
        className="absolute animate-spin-slower bg-black opacity-90"
        style={{ 
          width: '150px', 
          height: '150px',
          maskImage: `url(${mediumdiamond})`,
          WebkitMaskImage: `url(${mediumdiamond})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center'
        }}
      />
      <div 
        className="absolute animate-spin-slowest bg-black opacity-90"
        style={{ 
          width: '100px', 
          height: '100px',
          maskImage: `url(${smalldiamond})`,
          WebkitMaskImage: `url(${smalldiamond})`,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          maskPosition: 'center',
          WebkitMaskPosition: 'center'
        }}
      />
    </div>
  )

  // ========================================
  // RENDER
  // ========================================
  return (
    <div className="min-h-screen bg-white">
      {/* ==================== CAMERA LOADING SCREEN - RESPONSIVE ==================== */}
      {cameraLoading && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center px-4">
          <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mb-8">
            <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="0.5"
                strokeDasharray="2 4"
              />
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 15.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5 3.5 1.567 3.5 3.5-1.567 3.5-3.5 3.5zm0-5.5c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z"/>
                <path d="M20 5h-3.172l-1.414-1.414C15.039 3.211 14.535 3 14 3h-4c-.535 0-1.039.211-1.414.586L7.172 5H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zm0 14H4V7h4.414l1.707-1.707C10.309 5.105 10.638 5 11 5h2c.362 0 .691.105.879.293L15.586 7H20v12z"/>
                <circle cx="18" cy="8.5" r="1" fill="currentColor"/>
              </svg>
            </div>
          </div>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-500 tracking-wider mb-16 sm:mb-24 md:mb-32">SETTING UP CAMERA ...</p>
          
          <img 
            src="/Image/camerainfo.svg" 
            alt="Camera Instructions" 
            className="absolute bottom-10 sm:bottom-16 md:bottom-20 w-auto h-auto max-w-[90vw] sm:max-w-[70vw] md:max-w-[600px]"
          />
        </div>
      )}

      {/* ==================== LOADING SCREEN - RESPONSIVE ==================== */}
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
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* ==================== HEADER - RESPONSIVE (MATCHES INTRODUCE) ==================== */}
          <header className="flex flex-row h-[64px] w-full justify-between items-start py-3 px-4 md:px-9 mb-3 relative z-[1000]">
            <div className="flex flex-col items-start">
              <div className="flex flex-row items-center scale-[0.6] md:scale-75 origin-left">
                <a 
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 line-clamp-4 leading-[16px] text-[#1A1B1C]" 
                  href="/"
                >
                  SKINSTRIC
                </a>
                <img className="w-[4px] h-[17px]" src={leftbracket} alt="left-bracket" />
                <p className="text-[#1a1b1c83] font-semibold text-sm ml-1.5 mr-1.5">INTRO</p>
                <img className="w-[4px] h-[17px]" src={rightbracket} alt="right-bracket" />
              </div>
              <p className="font-bold text-[9px] md:text-xs mt-1 ml-6 md:ml-3 text-black">
                TO START ANALYSIS
              </p>
            </div>

            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors text-[#FCFCFC] text-[10px] bg-[#1A1B1C] h-9 px-4 py-2 scale-[0.7] md:scale-[0.8] leading-[16px]">
              ENTER CODE
            </button>
          </header>

          {/* ==================== MAIN CONTENT - RESPONSIVE ==================== */}
          <div className="min-h-[92vh] flex flex-col bg-white relative md:pt-[64px] justify-center px-4 sm:px-6">

            {/* Mobile/Tablet: Stacked Layout */}
            <div className="flex flex-col items-center gap-12 sm:gap-16 md:gap-20 lg:hidden relative z-20 mt-12">
              
              {/* CAMERA SECTION - MOBILE */}
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

              {/* GALLERY SECTION - MOBILE */}
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

            {/* Desktop: Side-by-Side Layout */}
            <div className="hidden lg:flex lg:flex-[0.4] xl:flex-1 flex-col items-center xl:justify-center relative mb-0 md:mb-30">
              
              <div className="flex justify-center items-center gap-[300px] absolute top-[240px] w-full z-20">
                
                {/* CAMERA SECTION - DESKTOP */}
                <div className="relative flex flex-col items-center">
                  <div className="absolute inset-0 flex items-center justify-center -z-10">
                    <div 
                      className="absolute animate-spin-slow bg-black opacity-90"
                      style={{ 
                        width: '500px', 
                        height: '500px',
                        maskImage: `url(${largediamond})`,
                        WebkitMaskImage: `url(${largediamond})`,
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center'
                      }}
                    />
                    <div 
                      className="absolute animate-spin-slower bg-black opacity-90"
                      style={{ 
                        width: '450px', 
                        height: '450px',
                        maskImage: `url(${mediumdiamond})`,
                        WebkitMaskImage: `url(${mediumdiamond})`,
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center'
                      }}
                    />
                    <div 
                      className="absolute animate-spin-slowest bg-black opacity-90"
                      style={{ 
                        width: '400px', 
                        height: '400px',
                        maskImage: `url(${smalldiamond})`,
                        WebkitMaskImage: `url(${smalldiamond})`,
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center'
                      }}
                    />
                  </div>
                  
                  <img 
                    src="/Image/camera-left.svg" 
                    alt="Camera Icon" 
                    className="w-[300px] h-[150px] cursor-pointer"
                    onClick={handleCameraClick}
                  />

                  <div className="absolute -top-[88px] right-[10px] flex flex-col items-center">
                    <div className="text-xs md:text-sm font-normal mb-2 leading-[20px] text-center translate-y-[40px] translate-x-[110px]">
                      <p className="-translate-x-[34px]">ALLOW A.I.</p>
                      <p>TO SCAN YOUR FACE</p>
                    </div>
                    <img 
                      src="/Image/scanline.svg" 
                      alt="Scan Line" 
                      className="w-[60px] h-auto translate-y-[12px] rotate-180"
                    />
                  </div>
                </div>

                {/* GALLERY SECTION - DESKTOP */}
                <div className="relative flex flex-col items-center">
                  <div className="absolute inset-0 flex items-center justify-center -z-10">
                    <div 
                      className="absolute animate-spin-slow bg-black opacity-90"
                      style={{ 
                        width: '500px', 
                        height: '500px',
                        maskImage: `url(${largediamond})`,
                        WebkitMaskImage: `url(${largediamond})`,
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center'
                      }}
                    />
                    <div 
                      className="absolute animate-spin-slower bg-black opacity-90"
                      style={{ 
                        width: '450px', 
                        height: '450px',
                        maskImage: `url(${mediumdiamond})`,
                        WebkitMaskImage: `url(${mediumdiamond})`,
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center'
                      }}
                    />
                    <div 
                      className="absolute animate-spin-slowest bg-black opacity-90"
                      style={{ 
                        width: '400px', 
                        height: '400px',
                        maskImage: `url(${smalldiamond})`,
                        WebkitMaskImage: `url(${smalldiamond})`,
                        maskSize: 'contain',
                        WebkitMaskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        WebkitMaskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        WebkitMaskPosition: 'center'
                      }}
                    />
                  </div>
                  
                  <img 
                    src="/Image/gallery-right.svg" 
                    alt="Gallery Icon" 
                    className="w-[300px] h-[150px] cursor-pointer"
                    onClick={() => galleryInputRef.current?.click()}
                  />

                  <div className="absolute bottom-[-20px] left-[-40px] flex flex-col items-start">
                    <div className="text-xs md:text-sm font-normal leading-[20px] text-left">
                      <p className="mb-1 translate-x-[10px] translate-y-[92px]">ALLOW A.I.</p>
                      <p className="translate-x-[-38px] translate-y-[88px]">ACCESS GALLERY</p>
                    </div>
                    <img 
                      src="/Image/gallery-line.svg" 
                      alt="Gallery Line" 
                      className="w-[60px] h-auto translate-x-[88px] translate-y-[8px]"
                    />
                  </div>
                </div>
              </div>

              {/* PREVIEW BOX - DESKTOP */}
              <div className="absolute top-[-75px] right-7 md:top-[-50px] md:right-8 transition-opacity duration-300 opacity-100">
                <h1 className="text-xs md:text-sm font-normal mb-1">Preview</h1>
                <div className="w-24 h-24 md:w-32 md:h-32 border border-gray-300 overflow-hidden bg-gray-50">
                  {preview && <img src={preview} alt="Preview" className="w-full h-full object-cover" />}
                </div>
              </div>

              <input
                ref={cameraInputRef}
                accept="image/*"
                className="hidden"
                type="file"
                onChange={handleChange}
              />
              <input
                ref={galleryInputRef}
                accept="image/*"
                className="hidden"
                type="file"
                onChange={handleChange}
              />
            </div>

            {/* PREVIEW BOX - MOBILE */}
            <div className="lg:hidden mt-8 flex flex-col items-center">
              <h1 className="text-xs sm:text-sm font-normal mb-2">Preview</h1>
              <div className="w-24 h-24 sm:w-32 sm:h-32 border border-gray-300 overflow-hidden bg-gray-50">
                {preview && <img src={preview} alt="Preview" className="w-full h-full object-cover" />}
              </div>
            </div>

            <input
              ref={cameraInputRef}
              accept="image/*"
              className="hidden lg:hidden"
              type="file"
              onChange={handleChange}
            />
            <input
              ref={galleryInputRef}
              accept="image/*"
              className="hidden lg:hidden"
              type="file"
              onChange={handleChange}
            />

            {/* ==================== BACK BUTTON - RESPONSIVE ==================== */}
            <div className="pt-4 md:pt-0 pb-8 bg-white sticky md:static bottom-30.5 mb-0 md:mb-0">
              <div className="absolute bottom-6 sm:bottom-8 w-full flex justify-between px-4 sm:px-6 md:px-9 lg:px-13">
                <a className="relative" aria-label="Back" href="/introduce">
                  <div>
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                      <span className="rotate-[-45deg] text-[10px] font-semibold sm:hidden">BACK</span>
                    </div>
                    <div className="group hidden sm:flex flex-row relative justify-center items-center">
                      <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                      <span className="absolute left-[15px] bottom-[13px] scale-[0.9] rotate-180 hidden sm:block group-hover:scale-[0.92] ease duration-300">▶</span>
                      <span className="text-sm font-semibold hidden sm:block ml-6">BACK</span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      {/* ==================== CAMERA PERMISSION POPUP - RESPONSIVE ==================== */}
      {showCameraPopup && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998]" onClick={handleDenyCamera} />
          <div className="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none p-4">
            <div className="relative pointer-events-auto">
              <img 
                src="/Image/float-info.svg" 
                alt="Camera Permission" 
                className="w-auto h-auto max-w-[90vw] sm:max-w-[70vw] md:max-w-[600px]"
              />
              <button 
                onClick={handleDenyCamera}
                className="absolute bottom-[8%] left-[15%] w-[30%] h-[12%] bg-transparent cursor-pointer"
                aria-label="Deny camera"
              >
                <span className="sr-only">Deny</span>
              </button>
              <button 
                onClick={handleAllowCamera}
                className="absolute bottom-[8%] right-[15%] w-[30%] h-[12%] bg-transparent cursor-pointer"
                aria-label="Allow camera"
              >
                <span className="sr-only">Allow</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* ==================== LIVE CAMERA MODAL - RESPONSIVE ==================== */}
      {showCameraModal && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-90 z-[9998]" />
          <div className="fixed inset-0 flex flex-col items-center justify-center z-[9999] p-4">
            <div className="w-full max-w-2xl bg-black rounded-lg overflow-hidden">
              <div className="relative aspect-video bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
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

      {/* ==================== SUCCESS POPUP - RESPONSIVE ==================== */}
      {showSuccessPopup && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[9998]" />
          <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
            <div className="bg-[#2a2a2a] text-white p-6 rounded-lg max-w-sm w-full mx-4 text-center">
              <div className="mb-4">
                <p className="text-xs sm:text-sm text-gray-300 mb-2">skinstric-wandag.vercel.app says</p>
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
  )
}

export default Result
