// DataComponent.tsx
import React, { useState, useEffect } from 'react';

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const DataComponent: React.FC<{shortcuts:any[]}> = ({shortcuts}:{shortcuts:any[]}) => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <h1 className="col-span-3 text-2xl mb-4">Mi Dashboard</h1>
      {shortcuts.map((item, index) => (
        <div
          key={index}
          className={`rounded-md p-4 mb-4 text-white`}
          style={{ backgroundColor: getRandomColor() }}
        >
          <h2 className="text-lg font-bold mb-2">{item.title}</h2>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
};

// Exporta el componente DataComponent
export default DataComponent;