const KeyInput = ({ keyValue, label, setKey, type = "text" }) => {
  return (
    <div>
      <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300">
        {label}
      </label>
      <input
        type={type}
        value={keyValue}
        onChange={(e) =>
          setKey(
            type === "number" && e.target.value !== ""
              ? Number(e.target.value)
              : e.target.value
          )
        }
        className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500"
        placeholder="Enter a key (e.g., 3 for traditional Caesar)"
      />
    </div>
  );
};

export default KeyInput;
