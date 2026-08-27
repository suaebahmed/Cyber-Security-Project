"use client";

import { useState } from "react";

export default function ActionButton({ onClick, mode }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);

    try {
      await Promise.all([
        onClick(),
        new Promise((resolve) => setTimeout(resolve, 250)),
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="w-full border border-cyan-400 bg-cyan-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-white disabled:cursor-wait disabled:opacity-70 dark:border-cyan-400 dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:focus:ring-offset-slate-900"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              aria-hidden="true"
            />
            Processing...
          </span>
        ) : mode === "encrypt" ? (
          "Encrypt"
        ) : (
          "Decrypt"
        )}
      </button>
    </div>
  );
}
