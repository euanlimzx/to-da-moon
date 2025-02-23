import { useState } from "react";

export async function getStaticProps() {
  // You can fetch data here if needed, but this example doesn't need it
  return {
    props: {
      nums: [1, 2, 3, 4, 5, 6, 7, 8], // This is passed into the component as props
    },
  };
}

export default function Page({ nums }: { nums: number[] }) {
  const [currentNumber, setCurrentNumber] = useState(1);

  function runNumbers() {
    let i = currentNumber;
    const interval = setInterval(() => {
      setCurrentNumber(nums[i]);
      i++;
      if (i > 5) i = 1; // Reset to 1 after reaching 9
    }, 500); // Change the number every 500ms

    // Stop the interval after the loop completes once
    setTimeout(() => {
      clearInterval(interval);
    }, 4500); // Total time will be 9 * 500ms
  }

  return (
    <div>
      <button onClick={runNumbers}>Click me</button>
      <div id="number">{currentNumber}</div>
    </div>
  );
}
