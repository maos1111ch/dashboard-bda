import { FC } from "react";

import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import classNames from "@/helpers/tw_classnames";
import Image from "next/image";
import app_logo from "../../../public/app_logo.svg"
import { usePathname } from "next/navigation";


const navigation = [
  { name: "Resumen de Ventas", href: "/", icon: HomeIcon, current: false },
  { name: "Objetivos", href: "/objetivos", icon: CalendarIcon, current: false },
  {
    name: "Analisis de Productos",
    href: "/productos",
    icon: FolderIcon,
    current: false,
  },
  {
    name: "Informacion de Clientes",
    href: "/clientes",
    icon: UsersIcon,
    current: false,
  },
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement>{}

const Sidebar: FC<SidebarProps> = ({ ...props }) => {
  const pathname = usePathname()
  const items = navigation.map((item) => ({ ...item, current: pathname === item.href }) )
  
  return (
    <div className={`flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 ${props.className}`}>
      <div className="flex h-32 shrink-0 items-center mx-auto">
        <Image
          className="h-24 w-auto"
          src={app_logo}
          width={100}
          height={100}
          alt="Your Company"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {items.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-50 text-indigo-600"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-indigo-600"
                          : "text-gray-400 group-hover:text-indigo-600",
                        "h-6 w-6 shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
};


export default Sidebar;