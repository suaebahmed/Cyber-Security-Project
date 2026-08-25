export default function TextInput({ mode, value, onChange }) {
    return (
      <div className="mb-6">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300">
          {mode === "encrypt" ? "Plaintext" : "Ciphertext"}
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-32 w-full resize-y border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder-slate-500"
          placeholder={
            mode === "encrypt"
              ? "Enter text to encrypt"
              : "Enter text to decrypt"
          }
        />
      </div>
    );
  }