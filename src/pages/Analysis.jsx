import React, { useState, useEffect } from 'react'

const Analysis = () => {
  const [apiData, setApiData] = useState(null)

  useEffect(() => {
    // Get data from localStorage
    const data = localStorage.getItem('skinstricApiResponse')
    if (data) {
      setApiData(JSON.parse(data))
    }
  }, [])

  // Timed redirect to select page
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/select'
    }, 8000) // Redirect after 8 seconds

    return () => clearTimeout(timer) // Cleanup timer on unmount
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Header - UPDATED TO MATCH RESULT PAGE */}
      <header className="w-full h-[80px] relative bg-white">
        {/* ENTER CODE BUTTON */}
        <div className="absolute -top-4 right-0 -mr-[300px]">
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-colors disabled:pointer-events-none h-9 px-4 py-2 scale-75 text-[#FCFCFC] text-xs bg-[#1A1B1C] leading-4">
            ENTER CODE
          </button>
        </div>

        {/* SKINSTRIC [ INTRO ] */}
        <div className="absolute -top-4 left-[-330px]">
          <div className="flex flex-row pt-1 scale-75 justify-start items-center">
            <a 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-colors h-9 px-4 py-2 font-semibold text-sm mr-2 line-clamp-4 leading-4 text-[#1A1B1C]" 
              href="/"
            >
              SKINSTRIC
            </a>
            <img className="w-1 h-4" src="/Image/left-bracket.svg" alt="" />
            <p className="text-[#1a1b1c83] text-opacity-70 font-semibold text-sm ml-1.5 mr-1.5">INTRO</p>
            <img className="w-1 h-4" src="/Image/right-bracket.svg" alt="" />
          </div>
        </div>
      </header>

      <div className="min-h-[92vh] flex flex-col bg-white relative md:pt-16 justify-center transition-all duration-300">
        {/* A.I. ANALYSIS TITLE - POSITIONED LIKE RESULT PAGE */}
        <div className="absolute -top-14 left-[-295px]">
          <h1 className="font-semibold text-xs md:text-sm">A.I. ANALYSIS</h1>
          <p className="text-xs mt-1 text-gray-600 uppercase leading-6">
            Analysis complete. Redirecting to selection...
          </p>
        </div>

        {/* Main Content - SAME AS YOUR ORIGINAL */}
        <div className="flex-[0.4] md:flex-1 flex flex-col items-center xl:justify-center relative mb-0 md:mb-30">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Demographics Analysis Complete</h2>
            
            {apiData && (
              <div className="bg-gray-100 p-6 rounded-lg max-w-md mx-auto">
                <h3 className="text-lg font-semibold mb-3">Results:</h3>
                
                {apiData.race && (
                  <div className="mb-3">
                    <strong>Race:</strong>
                    <div className="text-sm">
                      {Object.entries(apiData.race).map(([key, value]) => (
                        <div key={key}>{key}: {(value * 100).toFixed(1)}%</div>
                      ))}
                    </div>
                  </div>
                )}
                
                {apiData.age && (
                  <div className="mb-3">
                    <strong>Age:</strong>
                    <div className="text-sm">
                      {Object.entries(apiData.age).map(([key, value]) => (
                        <div key={key}>{key}: {(value * 100).toFixed(1)}%</div>
                      ))}
                    </div>
                  </div>
                )}
                
                {apiData.gender && (
                  <div className="mb-3">
                    <strong>Gender:</strong>
                    <div className="text-sm">
                      {Object.entries(apiData.gender).map(([key, value]) => (
                        <div key={key}>{key}: {(value * 100).toFixed(1)}%</div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <p className="mt-6 text-gray-600">
              Automatically redirecting in 8 seconds...
            </p>
          </div>
        </div>

        {/* BACK Button - POSITIONED LIKE RESULT PAGE */}
        <div className="absolute bottom-16 left-[-330px]">
          <a className="relative" href="/result">
            <div>
              <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-100 sm:hidden">
                <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">BACK</span>
              </div>
              <div className="group hidden sm:flex flex-row relative justify-center items-center">
                <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-85 group-hover:scale-92 ease duration-300" />
                <span className="absolute left-4 bottom-3 scale-90 rotate-180 hidden sm:block group-hover:scale-92 ease duration-300">▶</span>
                <span className="text-sm font-semibold hidden sm:block ml-6">BACK</span>
              </div>
            </div>
          </a>
        </div>

        {/* CONTINUE Button - POSITIONED ON RIGHT LIKE RESULT PAGE */}
        <div className="absolute bottom-16 right-0 -mr-[300px]">
          <a className="relative" href="/select">
            <div>
              <div className="relative w-12 h-12 flex items-center justify-center border border-[#1A1B1C] rotate-45 scale-100 sm:hidden">
                <span className="rotate-[-45deg] text-xs font-semibold sm:hidden">NEXT</span>
              </div>
              <div className="group hidden sm:flex flex-row relative justify-center items-center">
                <span className="text-sm font-semibold hidden sm:block mr-6">CONTINUE</span>
                <div className="w-12 h-12 hidden sm:flex justify-center border border-[#1A1B1C] rotate-45 scale-85 group-hover:scale-92 ease duration-300" />
                <span className="absolute right-4 bottom-3 scale-90 hidden sm:block group-hover:scale-92 ease duration-300">▶</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Analysis


