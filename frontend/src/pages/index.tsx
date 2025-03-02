import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Background from "@/components/background";
import Dashboard from "@/components/dashboard";
import Rocket from "@/components/rocket";
import { backgroundHeight } from "@/constants";
import { calculatePixelHeight } from "@/utils";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const [rocketHeight, setRocketHeight] = useState(0);

  //This is an example of how we can dynamically render the page height based on the current position of the rocket
  //we need to scale based on the max altitude we predict the rocket will achieve
  //we should probably not shift the screen down to avoid jank
  //we probably want to sample values so we don't spam our scroll function
  //we probably want to do thresholds with even intervals to have a smoother (instead of more realistic) flow
  function buttonFn() {
    const arr = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
    arr.forEach((value, index) => {
      const height =
        (1 - value) * backgroundHeight * document.body.scrollHeight;
      setTimeout(() => {
        window.scrollTo({
          top: height,
          behavior: "smooth",
        });
        console.log(value);
        if (value <= 0.45) {
          setRocketHeight(calculatePixelHeight(value));
        } else {
          setRocketHeight(calculatePixelHeight(0.45));
        }
      }, index * 100); // Adding a delay between scrolls, won't be visible / won't work otherwise
    });
  }

  return (
    <>
      <Background />
      <Rocket rocketHeight={rocketHeight} />
      <div className="h-screen w-screen flex justify-center items-center">
        <Dashboard buttonFn={buttonFn} />
      </div>
    </>
  );
}
