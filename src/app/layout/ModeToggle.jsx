function ModeToggle({ mode, setMode }) {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300">
        Mode
      </label>
      <div className="flex overflow-hidden border border-slate-300 bg-slate-100 dark:border-slate-700 dark:bg-slate-900">
        <button
          onClick={() => setMode("encrypt")}
          className={`flex-1 py-2 px-4 transition-all ${
            mode === "encrypt"
              ? "bg-cyan-500 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              : "text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          Encrypt
        </button>
        <button
          onClick={() => setMode("decrypt")}
          className={`flex-1 py-2 px-4 transition-all ${
            mode === "decrypt"
              ? "bg-cyan-500 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              : "text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200 dark:text-slate-300 dark:hover:bg-slate-800"
          }`}
        >
          Decrypt
        </button>
      </div>
    </div>
  );
}

export default ModeToggle;
