export default function ActionButton({ onClick, mode }) {
  return (
    <div className="mb-6">
      <button
        onClick={onClick}
        className="w-full border border-cyan-400 bg-cyan-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-white dark:border-cyan-400 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:focus:ring-offset-slate-900"
      >
        {mode === "encrypt" ? "Encrypt" : "Decrypt"}
      </button>
    </div>
  );
}
