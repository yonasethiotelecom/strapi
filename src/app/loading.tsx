import React from 'react';

function ColorfulLoadingPage(): JSX.Element {
  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-opacity-25">
        {colors.map((color, index) => (
          <div key={index} className={`w-4 h-4 rounded-full ${color} inline-block mx-1`}></div>
        ))}
      </div>
    </div>
  );
}

export default ColorfulLoadingPage;
