import { backgroundHeight } from "@/constants";
import { useEffect } from "react";

export default function Background() {
  useEffect(() => {
    // Set initial scroll position to the bottom of the component
    window.scrollTo(0, backgroundHeight * document.body.scrollHeight);
  }, []);
  return (
    <div
      className="w-screen absolute -z-10 bg-gradient-to-t from-sky-500 to-indigo-900 text-9xl"
      style={{ height: `${backgroundHeight * 100}vh` }}
    ></div>
  );
}
