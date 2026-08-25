export default function VigenereCipherDiagram({ keyword, plaintext, mode }) {
  const generateCipherData = () => {
    const groups = [];

    if (!keyword || keyword.length === 0) {
      return [];
    }

    for (let i = 0; i < plaintext.length; i++) {
      const keyChar = keyword[i % keyword.length];
      const plainChar = plaintext[i];
      const keyCode = keyChar.charCodeAt(0) - 65;
      const plainCode = plainChar.charCodeAt(0) - 65;

      let resultChar;
      if (mode === "encrypt") {
        resultChar = String.fromCharCode(((plainCode + keyCode) % 26) + 65);
      } else {
        resultChar = String.fromCharCode(
          ((((plainCode - keyCode) % 26) + 26) % 26) + 65
        );
      }

      if (!groups[i % keyword.length]) {
        groups[i % keyword.length] = {
          keyChar,
          sourceChars: [],
          resultChars: [],
        };
      }

      groups[i % keyword.length].sourceChars.push(plainChar);
      groups[i % keyword.length].resultChars.push(resultChar);
    }
    return groups;
  };

  const groups = generateCipherData();

  if (groups.length === 0) {
    return null;
  }
  return (
    <div className="border rounded-lg bg-gray-50 dark:bg-gray-900 p-4 md:p-6 transition-colors duration-300">
      <h2 className="text-lg font-semibold text-center mb-4 text-gray-700 dark:text-gray-100">
        Cipher Process Visualization
      </h2>
      <div className="flex flex-wrap justify-center gap-3">
        {groups.map((group, index) => (
          <div
            key={index}
            className="text-center p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
          >
            <div className="font-bold text-cyan-600 dark:text-cyan-400 mb-2 text-lg">
              Key: {group.keyChar}
            </div>
            <div className="text-gray-700 dark:text-gray-300 mb-1">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">
                {mode === "encrypt" ? "Plain" : "Cipher"}:
              </span>
              <span className="font-mono tracking-wide text-base">
                {group.sourceChars.join(" ")}
              </span>
            </div>
            <div className="font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block mb-1">
                {mode === "encrypt" ? "Cipher" : "Plain"}:
              </span>
              <span className="font-mono tracking-wide text-base">
                {group.resultChars.join(" ")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
