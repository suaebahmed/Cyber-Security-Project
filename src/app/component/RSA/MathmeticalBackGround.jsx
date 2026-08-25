import CodeIcon from "./SVG/CodeIcon";
import QuestionIcon from "./SVG/ExcitedIcon";

function MathematicalBackGround() {
  return (
    <div className="border border-blue-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md bg-white dark:bg-gray-900 transition-all duration-300">
      <h2 className="font-bold p-4 bg-gradient-to-r from-blue-50 to-sky-50 dark:from-gray-800 dark:to-gray-700 border-b dark:border-gray-600 text-cyan-700 dark:text-cyan-400 flex items-center gap-2">
        <CodeIcon />
        RSA Mathematical Background
      </h2>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl border border-blue-100 dark:border-gray-600 shadow-sm transition duration-300 hover:shadow-lg">
            <h3 className="text-cyan-800 dark:text-cyan-300 font-semibold mb-3">
              Key Generation
            </h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Choose two distinct prime numbers, p and q.</li>
              <li>Compute n = p × q</li>
              <li>Compute φ(n) = (p - 1) × (q - 1)</li>
              <li>
                Choose e such that 1 &lt; e &lt; φ(n) and gcd(e, φ(n)) = 1
              </li>
              <li>Compute d such that (d × e) mod φ(n) = 1</li>
            </ol>
            <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-blue-100 dark:border-gray-600">
              <p className="font-medium text-cyan-700 dark:text-cyan-400">Public Key: (e, n)</p>
              <p className="font-medium text-cyan-700 dark:text-cyan-400">Private Key: (d, n)</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl border border-emerald-100 dark:border-gray-600 shadow-sm transition duration-300 hover:shadow-lg">
            <h3 className="text-emerald-800 dark:text-emerald-300 font-semibold mb-3">
              Encryption/Decryption
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-emerald-100 dark:border-gray-600">
                <p className="font-medium text-emerald-700 dark:text-emerald-400">Encryption:</p>
                <p className="font-mono">
                  C = P<sup>e</sup> mod n
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Where P is the plaintext message and C is the ciphertext
                </p>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-teal-100 dark:border-gray-600">
                <p className="font-medium text-teal-700 dark:text-teal-400">Decryption:</p>
                <p className="font-mono">
                  P = C<sup>d</sup> mod n
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Where C is the ciphertext and P is the original message
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 dark:bg-gray-800 rounded-lg border border-yellow-200 dark:border-gray-600">
          <h3 className="text-yellow-800 dark:text-yellow-400 font-semibold mb-2 flex items-center gap-2">
            <QuestionIcon />
            Security Note
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            RSA's security relies on the difficulty of factoring the product of
            two large prime numbers. In practice, key sizes of 1024 bits or more
            are recommended for security. This demonstration uses small values
            for educational purposes.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MathematicalBackGround;