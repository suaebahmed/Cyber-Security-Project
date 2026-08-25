import React, { useState } from "react";

export default function KeyVisualization({ plaintext, keyword }) {
  const [showAll, setShowAll] = useState(false);
  const initial = 2;

  if (!keyword || keyword.length === 0 || !plaintext || plaintext.length === 0) {
    return null;
  }

  const repeatedKey = Array(plaintext.length)
    .fill()
    .map((_, i) => keyword[i % keyword.length])
    .join("");

  const chunks = [];
  const n = keyword.length;
  for (let i = 0; i < plaintext.length; i += n) {
    chunks.push({
      plaintext: plaintext.slice(i, i + n),
      key: repeatedKey.slice(i, i + n),
    });
  }

  const displayChunks = showAll ? chunks : chunks.slice(0, initial);
  const hasMoreToShow = chunks.length > initial;

  return (
    <div className="border rounded-lg bg-blue-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-6 shadow-md transition-colors duration-300">
      <h2 className="text-lg font-semibold text-center mb-4 text-gray-700 dark:text-gray-100">
        Repeating Key Generation
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <tbody>
            {displayChunks.map((chunk, index) => (
              <React.Fragment key={index}>
                <tr className="bg-white dark:bg-gray-900 transition-colors duration-300">
                  <td className="py-2 px-4 font-semibold text-gray-500 dark:text-gray-400 w-24">
                    Plaintext:
                  </td>
                  <td className="py-2 px-4 font-mono tracking-widest">
                    {chunk.plaintext.split("").map((char, i) => (
                      <span
                        key={i}
                        className="inline-block px-2 py-1 m-1 bg-blue-100 dark:bg-blue-700 text-gray-800 dark:text-gray-100 rounded transition-all duration-200 hover:scale-110"
                      >
                        {char}
                      </span>
                    ))}
                  </td>
                </tr>
                <tr className="bg-white dark:bg-gray-900 transition-colors duration-300">
                  <td className="py-2 px-4 font-semibold text-gray-500 dark:text-gray-400 w-24">
                    Key:
                  </td>
                  <td className="py-2 px-4 font-mono tracking-widest">
                    {chunk.key.split("").map((char, i) => (
                      <span
                        key={i}
                        className="inline-block px-2 py-1 m-1 bg-green-100 dark:bg-green-700 text-gray-800 dark:text-gray-100 rounded transition-all duration-200 hover:scale-110"
                      >
                        {char}
                      </span>
                    ))}
                  </td>
                </tr>
                {index < displayChunks.length - 1 && (
                  <tr>
                    <td colSpan="2" className="h-4"></td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {hasMoreToShow && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-5 py-2 bg-cyan-500 dark:bg-cyan-600 text-white rounded-3xl hover:bg-cyan-600 dark:hover:bg-cyan-500 hover:shadow-lg transition-all duration-300"
          >
            {showAll ? "Show Less" : `Show All (${chunks.length} blocks)`}
          </button>
        </div>
      )}
    </div>
  );
}
