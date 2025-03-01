export default function Button() {
  return (
    <button
      className="bg-white text-black"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      Click me
    </button>
  );
}
