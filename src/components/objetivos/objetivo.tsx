import { Resumen } from '@/types/negocio';
import React, { FC } from 'react';

function getTextColor(hexColor: string){
  const r = parseInt(hexColor.substring(1,2), 16);
  const g = parseInt(hexColor.substring(3,2), 16);
  const b = parseInt(hexColor.substring(5,2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return yiq >= 90 ? 'text-white' : 'text-black';
}

interface ObjetivoProps {
  shortcut: Resumen;
  bgcolor: string;
}

const Objetivo: FC<ObjetivoProps> = ({ shortcut, bgcolor }) => {
  const textColor = getTextColor(bgcolor);
  return (
    <div
          className={`rounded-md p-4 mb-4 ${textColor}`}
          style={{ backgroundColor: bgcolor }}
        >
          <h2 className="text-lg font-bold mb-2">{shortcut.title}</h2>
          <p>{shortcut.value}</p>
        </div>
  );
};

// Exporta el componente DataComponent
export default Objetivo;