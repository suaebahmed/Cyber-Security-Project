import DecryptionVisualization from "./DecryptionVisualization";
import EncryptionVisualization from "./EncryptionVisualization";
import WatchIcon from "../SVG/WatchIcon";

function VisualRepoMain({ data }) {
  const {
    mode,
    message,
    publicKey,
    privateKey,
    sharedModulus,
    result,
    inputType,
  } = data;

  return (
    <div className="border border-indigo-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md hover:shadow-lg bg-white dark:bg-gray-900 transition-all duration-300">
      <h2 className="font-bold p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-b border-indigo-100 dark:border-gray-700 text-cyan-600 dark:text-cyan-400 flex items-center gap-2">
        <WatchIcon />
        Visual Representation
      </h2>

      <div className="p-6">
        {mode === "encrypt" ? (
          <EncryptionVisualization
            message={message}
            publicKey={{ e: publicKey, n: sharedModulus }}
            inputType={inputType}
            result={result}
          />
        ) : (
          <DecryptionVisualization
            ciphertext={message}
            privateKey={{ d: privateKey, n: sharedModulus }}
            result={result}
          />
        )}
      </div>
    </div>
  );
}

export default VisualRepoMain;
