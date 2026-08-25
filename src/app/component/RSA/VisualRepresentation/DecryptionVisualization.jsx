import DeArrawPathEquation from "./ArrawEquation/DecryptArraw";

const DecryptionVisualization = ({ ciphertext, privateKey, result }) => {
  return (
    <div className="space-y-6 transition-all duration-300">
      <div className="text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center mb-4 shadow-lg hover:shadow-xl transition duration-300">
            <span className="text-2xl md:text-3xl font-bold">C</span>
          </div>
          <div className="font-medium text-indigo-700 dark:text-indigo-400">
            Encrypted Ciphertext
          </div>
          <div className="mt-2 p-3 bg-indigo-50 dark:bg-gray-800 rounded-lg border border-indigo-100 dark:border-gray-700 font-mono max-w-xs overflow-hidden text-ellipsis shadow-sm hover:shadow-md transition">
            {ciphertext}
          </div>
        </div>

        <DeArrawPathEquation />

        <div className="flex flex-col items-center justify-center mt-8">
          <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center mb-4 shadow-lg hover:shadow-xl transition duration-300">
            <span className="text-2xl md:text-3xl font-bold">P</span>
          </div>
          <div className="font-medium text-emerald-700 dark:text-emerald-400">
            Decrypted Message
          </div>
          <div className="mt-2 p-3 bg-emerald-50 dark:bg-gray-800 rounded-lg border border-emerald-100 dark:border-gray-700 font-mono max-w-xs overflow-hidden text-ellipsis shadow-sm hover:shadow-md transition">
            {result}
          </div>
        </div>
      </div>
      <div className="p-4 bg-gradient-to-r from-gray-50 to-green-50 dark:from-gray-900 dark:to-gray-800 rounded-lg shadow-sm hover:shadow-md border border-green-100 dark:border-gray-700 mt-8 transition duration-300">
        <h3 className="font-semibold text-green-700 dark:text-green-400 mb-2">
          RSA Decryption Process
        </h3>
        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <p>
            1. Private key (d, n) = ({privateKey.d}, {privateKey.n})
          </p>
          <p>2. Take encrypted ciphertext: {ciphertext}</p>
          <p>
            3. Apply RSA decryption formula: P = C<sup>{privateKey.d}</sup> mod{" "}
            {privateKey.n}
          </p>
          <p>4. Result: {result}</p>
        </div>
      </div>
    </div>
  );
};

export default DecryptionVisualization;
