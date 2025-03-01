import { useEffect } from "react";

export default function Background() {
  const height = 9;
  useEffect(() => {
    // Set initial scroll position to the bottom of the component
    window.scrollTo(0, height * document.body.scrollHeight);
  }, []);
  return (
    <div
      className="w-screen absolute -z-10 bg-gradient-to-t from-sky-500 to-indigo-500 text-9xl"
      style={{ height: `${height * 100}vh` }}
    ></div>
  );
}
