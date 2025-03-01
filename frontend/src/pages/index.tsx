import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Background from "@/components/background";
import Dashboard from "@/components/dashboard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Background />
      <div className="h-screen w-screen flex justify-center items-center">
        <Dashboard />
      </div>
    </>
  );
}
