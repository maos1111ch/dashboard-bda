import Objetivo from "@/components/appData/objetivo";
import { FC } from "react";

interface ObjetivosProps {}

function getTextColor(hexColor: string) {
  const r = parseInt(hexColor.substring(1, 2), 16);
  const g = parseInt(hexColor.substring(3, 2), 16);
  const b = parseInt(hexColor.substring(5, 2), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "text-black" : "text-white";
}

const Objetivos: FC<ObjetivosProps> = ({}) => {
  return (
    <>
      <div className="grid grid-cols-4 w-full">
        <Objetivo shortcut={{ title: 'Test', value: '12354'}} />
      </div>
    </>
  );
};

export default Objetivos;
