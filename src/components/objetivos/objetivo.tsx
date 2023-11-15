import { Resumen } from '@/types/negocio';
import React, { FC } from 'react';

interface ObjetivoProps {
  shortcut: Resumen;
}

const Objetivo: FC<ObjetivoProps> = ({ shortcut }) => {
  return (
    <div
          className={`rounded-md p-4 mb-4 text-black bg-yellow-300 shadow-lg`}
        >
          <h2 className="text-lg font-bold mb-2">{shortcut.title}</h2>
          <p>{shortcut.value}</p>
        </div>
  );
};

// Exporta el componente DataComponent
export default Objetivo;