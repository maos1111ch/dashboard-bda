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

const DataComponent: React.FC = () => {
  // Estado local para almacenar la respuesta simulada de la API
  const [apiData, setApiData] = useState<any[]>([]);

  // Efecto secundario para simular la llamada a la API al montar el componente
  useEffect(() => {
    // Función para simular la llamada a la API y actualizar el estado
    const fetchData = async () => {
      // Simulación de la respuesta de la API
      const mockApiResponse = {
        success: true,
        message: 'OK',
        data: [
          {
            title: 'title1',
            value: 'asdasdas',
          },
          {
            title: 'title2',
            value: 'asdasdas',
          },
          {
            title: 'title3',
            value: 'asdasdas',
          },
          {
            title: 'title1',
            value: 'asdasdas',
          },
          {
            title: 'title2',
            value: 'asdasdas',
          },
          {
            title: 'title3',
            value: 'asdasdas',
          },
        ],
      };

      // Actualiza el estado con los datos simulados
      setApiData(mockApiResponse.data);
    };

    // Llama a la función para simular la llamada a la API
    fetchData();
  }, []); // El segundo parámetro del useEffect asegura que se ejecute solo al montar el componente.

  // Renderiza el componente DataComponent
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <h1 className="col-span-3 text-2xl mb-4">Mi Dashboard</h1>
      {apiData.map((item, index) => (
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