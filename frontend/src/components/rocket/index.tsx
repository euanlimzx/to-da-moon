import React, { useEffect, useRef, useState } from "react";

const Rocket = ({ rocketHeight }: { rocketHeight: number }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Set canvas size
        canvas.width = 80;
        canvas.height = 240;
        // Fill the entire canvas with white
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill the entire canvas
      }
    }
  }, []);
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        left: "10px",
        bottom: `${rocketHeight}px`,
        transition: "bottom 0.3s ease-out",
      }}
    ></canvas>
  );
};

export default Rocket;
