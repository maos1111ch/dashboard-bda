import React, { FC } from 'react';

function getTextColor(hexColor: string){
  const r = parseInt(hexColor.substring(1,2), 16);
  const g = parseInt(hexColor.substring(3,2), 16);
  const b = parseInt(hexColor.substring(5,2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  console.log(yiq)
  return yiq >= 90 ? 'text-white' : 'text-black';
}


function getRandomColor () {
  const letters = '0123456789abcdef';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Objetivo: FC<{shortcut:any}> = ({shortcut}:{shortcut:any}) => {
  const color = getRandomColor()
  const textColor = getTextColor(color);
  return (
    <div
          className={`rounded-md p-4 mb-4 ${textColor}`}
          style={{ backgroundColor: color }}
        >
          <h2 className="text-lg font-bold mb-2">{shortcut.title}</h2>
          <p>{shortcut.value}</p>
        </div>
  );
};

// Exporta el componente DataComponent
export default Objetivo;