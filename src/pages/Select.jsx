import React from 'react'

const Select = () => {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Header - Responsive */}
      <div className="flex flex-row h-[64px] w-full justify-end py-3 px-4 sm:px-6 mb-3 relative z-[1000]">
        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors h-8 sm:h-9 px-3 sm:px-4 py-2 scale-[0.7] sm:scale-[0.8] text-[#FCFCFC] text-[10px] bg-[#1A1B1C] leading-[16px]">
          ENTER CODE
        </button>
      </div>

      {/* SKINSTRIC - Responsive */}
      <div className="absolute top-3 sm:top-4 left-0 px-4 sm:px-0">
        <div className="flex flex-row items-center scale-[0.6] sm:scale-[0.7] md:scale-75 origin-left">
          <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 leading-[16px] text-[#1A1B1C]">
            SKINSTRIC
          </span>
          <img alt="left-bracket" className="w-[4px] h-[17px]" src="/Image/left-bracket.svg" />
          <p className="text-[#1a1b1c83] text-opacity-70 font-semibold text-sm ml-1.5 mr-1.5">INTRO</p>
          <img alt="right-bracket" className="w-[4px] h-[17px]" src="/Image/right-bracket.svg" />
        </div>
      </div>

      {/* Title Section - Responsive */}
    <div className="absolute top-[60px] sm:top-[65px] left-[8px] md:left-[12px] text-left">
  <h1 className="text-sm sm:text-base font-semibold leading-[24px] tracking-tight">A.I. ANALYSIS</h1>
  <p className="text-xs sm:text-sm mt-1 text-gray-600 uppercase leading-[20px] sm:leading-[24px]">
    A.I. has estimated the following.<br />
    Fix estimated information if needed.
  </p>
</div>





      {/* Main Content - Responsive */}
      <div className="min-h-[65vh] flex flex-col items-center justify-center bg-white px-4 pt-32 sm:pt-24">
        <div className="relative group flex items-center justify-center">
          
          {/* OUTER DIAMOND OUTLINE - Desktop only */}
          <div className="hidden md:flex absolute items-center justify-center pointer-events-none z-50">
            <div className="w-[450px] h-[450px] border-2 border-dashed border-gray-600 transform rotate-45 opacity-0 scale-95 transition-all duration-500 ease-in-out group-hover:scale-100 group-hover:opacity-70" />
          </div>

          {/* Grid of diamond buttons - Responsive */}
          <div className="relative z-10 grid grid-cols-3 grid-rows-3 gap-0">
            {/* Demographics - Top center */}
            <div className="flex items-center justify-center col-start-2">
              <a href="/summary">
                <button className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[153.88px] md:h-[153.88px] bg-gray-200 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-3 sm:-m-4 md:-m-5 cursor-pointer font-semibold text-[10px] sm:text-xs md:text-sm leading-tight tracking-tight uppercase hover:scale-[1.05] transition-transform duration-300">
                  <span className="transform -rotate-45 px-2">Demographics</span>
                </button>
              </a>
            </div>

            {/* Cosmetic Concerns - Middle left */}
            <div className="flex items-center justify-center row-start-2 col-start-1">
              <button className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[153.88px] md:h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-3 sm:-m-4 md:-m-5 font-semibold text-[10px] sm:text-xs md:text-sm leading-tight tracking-tight uppercase cursor-not-allowed">
                <span className="transform -rotate-45 px-2 text-center">Cosmetic<br className="sm:hidden"/>Concerns</span>
              </button>
            </div>

            {/* Skin Type Details - Middle right */}
            <div className="flex items-center justify-center row-start-2 col-start-3">
              <button className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[153.88px] md:h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-3 sm:-m-4 md:-m-5 font-semibold text-[10px] sm:text-xs md:text-sm leading-tight tracking-tight uppercase cursor-not-allowed">
                <span className="transform -rotate-45 px-2 text-center">Skin Type<br className="sm:hidden"/>Details</span>
              </button>
            </div>

            {/* Weather - Bottom center */}
            <div className="flex items-center justify-center row-start-3 col-start-2">
              <button className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[153.88px] md:h-[153.88px] bg-gray-100 hover:bg-gray-300 transform rotate-45 flex items-center justify-center -m-3 sm:-m-4 md:-m-5 font-semibold text-[10px] sm:text-xs md:text-sm leading-tight tracking-tight uppercase cursor-not-allowed">
                <span className="transform -rotate-45 px-2">Weather</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation - Responsive */}
      <div className="pt-2 pb-6 sm:pb-4 bg-white absolute bottom-0 left-0 right-0">
        <div className="flex justify-between max-w-full mx-auto px-4 sm:px-6 md:px-9 lg:px-13">
          {/* Back Button */}
          <a href="/result">
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

          {/* Get Summary Button */}
          <a href="/summary">
            <div>
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-[1] sm:hidden">
                <span className="rotate-[-45deg] text-[10px] font-semibold sm:hidden">SUM</span>
              </div>
              <div className="group hidden sm:flex flex-row relative justify-center items-center">
                <span className="text-sm font-semibold hidden sm:block mr-5">GET SUMMARY</span>
                <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-[0.85] group-hover:scale-[0.92] ease duration-300"></div>
                <span className="absolute right-[15px] bottom-[13px] scale-[0.9] hidden sm:block group-hover:scale-[0.92] ease duration-300">▶</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Select
