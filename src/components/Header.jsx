import React from 'react'

const Header = () => {
  return (
    <header className="flex flex-row h-[64px] w-full justify-between items-center py-3 px-4 sm:px-6 md:px-8 mb-3 relative z-[1000]">
      {/* Logo and breadcrumb */}
      <div className="flex flex-row items-center scale-[0.6] sm:scale-[0.7] md:scale-75 origin-left">
        <a
          href="/"
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 leading-[16px] text-[#1A1B1C]"
        >
          SKINSTRIC
        </a>
        <img className="w-[4px] h-[17px]" src="/Image/left-bracket.svg" alt="left-bracket" />
        <p className="text-[#1a1b1c83] font-semibold text-sm ml-1.5 mr-1.5">INTRO</p>
        <img className="w-[4px] h-[17px]" src="/Image/right-bracket.svg" alt="right-bracket" />
      </div>

      {/* Enter Code button */}
      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors text-[#FCFCFC] text-[10px] bg-[#1A1B1C] h-8 sm:h-9 px-3 sm:px-4 py-2 scale-[0.7] sm:scale-[0.8] leading-[16px]">
        ENTER CODE
      </button>
    </header>
  )
}

export default Header
