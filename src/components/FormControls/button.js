export default function Button({ text, onClick }) {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center bg-black px-6 py-2 text-lg text-white font-medium uppercase tracking-wide"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
