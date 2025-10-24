import React, { useState, useEffect } from "react"

const Hero = () => {
  const [slideDirection, setSlideDirection] = useState(null)
  const [fadeIn, setFadeIn] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setFadeIn(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative w-full min-h-screen bg-white overflow-hidden text-[#1A1B1C] antialiased">
      {/* Navbar - Fully Responsive */}
      <header className="flex flex-row h-[64px] w-full justify-between items-center py-3 px-4 sm:px-6 mb-3 relative z-[1000]">
        <div className="flex flex-row items-center scale-75 sm:scale-100">
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors px-2 sm:px-4 py-2 font-semibold text-xs sm:text-sm leading-[16px]"
          >
            SKINSTRIC
          </a>
          <p className="text-[#1a1b1c83] font-semibold text-xs sm:text-sm ml-1 sm:ml-1.5 mr-1 sm:mr-1.5">
            [ INTRO ]
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors text-[#FCFCFC] text-[8px] sm:text-[10px] bg-[#1A1B1C] h-8 sm:h-9 px-3 sm:px-4 py-2 leading-[16px]">
          ENTER CODE
        </button>
      </header>

      {/* Hero Section */}
      <div className="relative w-full">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] px-4 sm:px-6 lg:fixed lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:px-0">
          
          {/* Mobile/Tablet Diamonds */}
          <div className="absolute inset-0 flex items-center justify-center lg:hidden">
            <div className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center lg:hidden">
            <div className="w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] border border-dotted border-[#A0A4AB] rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>

          {/* Main Heading - Responsive Text Sizes */}
          <div
            id="main-heading"
            className={`relative z-10 text-center transition-all duration-[1500ms] ease-in-out ${
              fadeIn ? "opacity-100" : "opacity-0"
            } ${
              slideDirection === "left"
                ? "lg:translate-x-[-20vw]"
                : slideDirection === "right"
                ? "lg:translate-x-[20vw]"
                : ""
            }`}
          >
            <h1 className="text-[40px] sm:text-[60px] lg:text-[80px] xl:text-[100px] font-normal tracking-tighter leading-none">
              Sophisticated <br />
              <span className="block">skincare</span>
            </h1>
          </div>

          {/* Mobile/Tablet Paragraph */}
          <p className="z-10 block lg:hidden w-full max-w-[30ch] mt-6 sm:mt-8 text-[14px] sm:text-[16px] font-semibold text-center text-[#1a1b1c83] px-4">
            Skinstric developed an A.I. that creates a highly-personalized
            routine tailored to what your skin needs.
          </p>

          {/* Mobile/Tablet Button */}
          <div className="z-10 mt-6 sm:mt-8 lg:hidden">
            <a href="/introduce">
              <button className="relative flex items-center gap-3 sm:gap-4 hover:scale-105 duration-300">
                <span className="text-[10px] sm:text-[12px] font-bold cursor-pointer">
                  ENTER EXPERIENCE
                </span>
                <div className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] border border-solid border-black rotate-45 cursor-pointer" />
                <span className="absolute left-[110px] sm:left-[129px] scale-[0.5] hover:scale-60 duration-300">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-current text-black"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
              </button>
            </a>
          </div>

          {/* Desktop Bottom Left Paragraph */}
          <div className="hidden lg:block fixed bottom-[calc(-7vh)] left-[calc(-20vw)] xl:left-[calc(-27vw)] 2xl:left-[calc(-31vw)] [@media(width>=1920px)]:left-[calc(-33vw)] font-normal text-sm space-y-3 uppercase">
            <p>
              Skinstric developed an A.I. that creates a <br />
              highly-personalized routine tailored to <br />
              what your skin needs.
            </p>
          </div>

          {/* Left Diamond - Desktop Only */}
          <div
            id="left-section"
            className={`hidden lg:block fixed left-[calc(-53vw)] xl:left-[calc(-50vw)] top-1/2 -translate-y-1/2 w-[500px] h-[500px] transition-opacity duration-700 ${
              slideDirection === "left" ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="relative w-full h-full">
              <div className="w-full h-full border border-dotted border-[#A0A4AB] rotate-45 fixed inset-0" />
              <button
                id="discover-button"
                onMouseEnter={() => setSlideDirection("right")}
                onMouseLeave={() => setSlideDirection(null)}
                className="group inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal cursor-pointer h-9 absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/5 xl:translate-x-1/6 px-3 py-1"
              >
                <div className="w-[30px] h-[30px] border border-solid border-black rotate-45 group-hover:scale-110 duration-300" />
                <span className="absolute left-[18px] top-[8px] scale-[0.9] rotate-180 group-hover:scale-105 duration-300">
                  ▶
                </span>
                <span>DISCOVER A.I.</span>
              </button>
            </div>
          </div>

          {/* Right Diamond - Desktop Only */}
          <div
            id="right-section"
            className={`hidden lg:block fixed top-1/2 right-[calc(-53vw)] xl:right-[calc(-50vw)] -translate-y-1/2 w-[500px] h-[500px] transition-opacity duration-700 ${
              slideDirection === "right" ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="relative w-full h-full">
              <div className="w-full h-full border border-dotted border-[#A0A4AB] rotate-45 absolute inset-0" />
              <a href="/introduce">
                <button
                  id="take-test-button"
                  onMouseEnter={() => setSlideDirection("left")}
                  onMouseLeave={() => setSlideDirection(null)}
                  className="group inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-sm font-normal cursor-pointer h-9 absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/5 xl:-translate-x-1/6 px-3 py-1"
                >
                  TAKE TEST
                  <div className="w-[30px] h-[30px] border border-solid border-black rotate-45 group-hover:scale-110 duration-300" />
                  <span className="absolute left-[107px] top-[9px] scale-[0.9] cursor-pointer group-hover:scale-105 duration-300">
                    ▶
                  </span>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Hero




















