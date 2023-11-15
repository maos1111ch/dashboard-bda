import Sidebar from "@/components/layout/sidebar";
import { FC } from "react";

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="flex flex-row min-h-screen">
        <Sidebar className="w-1/6" />
        <div className="w-full p-2">{children}</div>
      </div>
    </>
  );
}
