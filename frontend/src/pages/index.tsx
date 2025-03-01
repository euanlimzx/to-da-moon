import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Background from "@/components/background";
import Dashboard from "@/components/dashboard";
import { backgroundHeight } from "@/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  //This is an example of how we can dynamically render the page height based on the current position of the rocket
  //we need to scale based on the max altitude we predict the rocket will achieve
  //we should probably not shift the screen down to avoid jank
  //we probably want to sample values so we don't spam our scroll function
  function buttonFn() {
    const arr = [0.95, 0.9, 0.7, 0.3, 0.2, 0.1];
    arr.forEach((value, index) => {
      const height = value * backgroundHeight * document.body.scrollHeight;
      setTimeout(() => {
        window.scrollTo({
          top: height,
          behavior: "smooth",
        });
      }, index * 400); // Adding a delay between scrolls, won't be visible / won't work otherwise
    });
  }

  return (
    <>
      <Background />
      <div className="h-screen w-screen flex justify-center items-center">
        <Dashboard buttonFn={buttonFn} />
      </div>
    </>
  );
}
