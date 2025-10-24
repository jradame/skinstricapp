import React from 'react';

const GeometricLines = () => {
  return (
    <>
      {/* Top Left Lines */}
      <div className="absolute top-20 left-20">
        <div className="relative">
          <div className="w-16 h-px bg-gray-300 transform -rotate-45"></div>
          <div className="w-16 h-px bg-gray-300 transform rotate-45 -mt-px"></div>
        </div>
      </div>
      
      {/* Top Right Lines */}
      <div className="absolute top-20 right-20">
        <div className="relative">
          <div className="w-16 h-px bg-gray-300 transform rotate-45"></div>
          <div className="w-16 h-px bg-gray-300 transform -rotate-45 -mt-px"></div>
        </div>
      </div>
      
      {/* Bottom Left Lines */}
      <div className="absolute bottom-20 left-20">
        <div className="relative">
          <div className="w-16 h-px bg-gray-300 transform rotate-45"></div>
          <div className="w-16 h-px bg-gray-300 transform -rotate-45 -mt-px"></div>
        </div>
      </div>
      
      {/* Bottom Right Lines */}
      <div className="absolute bottom-20 right-20">
        <div className="relative">
          <div className="w-16 h-px bg-gray-300 transform -rotate-45"></div>
          <div className="w-16 h-px bg-gray-300 transform rotate-45 -mt-px"></div>
        </div>
      </div>
    </>
  );
};

export default GeometricLines;
