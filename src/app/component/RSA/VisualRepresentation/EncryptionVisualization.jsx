import EnArrawPathEquation from "./ArrawEquation/EncryptArraw";

export default function EncryptionVisualization({
  message,
  publicKey,
  inputType,
  result,
}) {
  const messageToShow = inputType === "text" ? message : parseInt(message);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 text-white flex items-center justify-center mb-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <span className="text-2xl md:text-3xl font-bold">P</span>
          </div>
          <div className="font-medium text-cyan-700 dark:text-cyan-300">Original Message</div>
          <div className="mt-2 p-3 bg-blue-50 dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-gray-700 font-mono max-w-xs overflow-hidden text-ellipsis text-gray-800 dark:text-gray-200">
            {messageToShow}
          </div>
        </div>

        <EnArrawPathEquation />

        <div className="flex flex-col items-center justify-center ">
          <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center mb-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <span className="text-2xl md:text-3xl font-bold">C</span>
          </div>
          <div className="font-medium text-indigo-700 dark:text-indigo-300">
            Encrypted Ciphertext
          </div>
          <div className="mt-2 p-3 bg-indigo-50 dark:bg-gray-800 rounded-lg border border-indigo-100 dark:border-gray-700 font-mono max-w-xs overflow-hidden text-ellipsis text-gray-800 dark:text-gray-200">
            {result}
          </div>
        </div>
      </div>
      <div className="p-4 bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/50 rounded-lg shadow-sm hover:shadow-md border border-blue-100 dark:border-gray-700 mt-8 transition-shadow duration-300">
        <h3 className="font-semibold text-cyan-600 dark:text-cyan-400 mb-2">
          RSA Encryption Process
        </h3>
        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <p>
            1. Public key (e, n) = ({publicKey.e}, {publicKey.n})
          </p>
          <p>
            2.{" "}
            {inputType === "text"
              ? "Convert message to numeric value"
              : "Take numeric message"}
          </p>
          <p>
            3. Apply RSA encryption formula: C = P<sup>{publicKey.e}</sup> mod{" "}
            {publicKey.n}
          </p>
          <p>4. Result: {result}</p>
        </div>
      </div>
    </div>
  );
}
