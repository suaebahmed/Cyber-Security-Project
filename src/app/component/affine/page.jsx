"use client";
import React, { useState } from "react";
import ModeToggle from "@/app/layout/ModeToggle";
import TextInput from "@/app/layout/TextInput";
import KeyInput from "@/app/layout/KeyInput";
import Button from "@/app/layout/Button";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const AffineCipherUI = () => {
  const [plaintext, setPlaintext] = useState("HELLO WORLD");
  const [a, setA] = useState("5");
  const [b, setB] = useState("8");
  const [mode, setMode] = useState("encrypt");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [showCharDetails, setShowCharDetails] = useState(false);

  const handleProcess = () => {
    try {
      setError("");
      const aValue = parseInt(a, 10);
      const bValue = parseInt(b, 10);

      if (isNaN(aValue) || isNaN(bValue)) {
        throw new Error("Both a and b must be numbers");
      }

      if (gcd(aValue, 26) !== 1) {
        throw new Error(`'a' (${aValue}) must be coprime with 26`);
      }

      if (mode === "encrypt") {
        const output = encryptAffine(plaintext, aValue, bValue);
        setResult(output);
      } else {
        const output = decryptAffine(plaintext, aValue, bValue);
        setResult(output);
      }
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }

  function modInverse(a, m) {
    a = ((a % m) + m) % m;
    for (let x = 1; x < m; x++) {
      if ((a * x) % m === 1) {
        return x;
      }
    }
    throw new Error(`Modular inverse does not exist for a=${a} and m=${m}`);
  }

  function encryptAffine(text, a, b) {
    const steps = [];

    steps.push({
      description: "Process Parameters",
      data: `a = ${a}, b = ${b} (Formula: E(x) = (${a}x + ${b}) mod 26)`,
    });

    const mapping = {};
    let encryptedAlphabet = "";

    for (let i = 0; i < 26; i++) {
      const newCharIndex = (a * i + b) % 26;
      mapping[alphabet[i]] = alphabet[newCharIndex];
      encryptedAlphabet += alphabet[newCharIndex];
    }

    steps.push({
      description: "Create Character Mapping",
      data: {
        rows: [
          { label: "Original", chars: alphabet.split("") },
          { label: "Encrypted", chars: encryptedAlphabet.split("") },
        ],
      },
    });

    const normalizedText = text.toUpperCase();
    let ciphertext = "";
    const charSteps = [];

    for (let i = 0; i < normalizedText.length; i++) {
      const char = normalizedText[i];
      const mappedChar = mapping[char] || char;
      ciphertext += mappedChar;

      if (alphabet.includes(char)) {
        const position = alphabet.indexOf(char);
        const calculation = `(${a} × ${position} + ${b}) mod 26 = ${(a * position + b) % 26
          }`;

        charSteps.push({
          original: char,
          mapped: mappedChar,
          calculation,
        });
      } else {
        charSteps.push({
          original: char,
          mapped: char,
          calculation: "Non-alphabetic character (unchanged)",
        });
      }
    }

    steps.push({
      description: "Character Transformations",
      charSteps,
      data: ciphertext,
    });

    return { result: ciphertext, steps };
  }

  function decryptAffine(text, a, b) {
    const steps = [];
    const aInverse = modInverse(a, 26);

    steps.push({
      description: "Process Parameters",
      data: `a = ${a}, b = ${b}, a⁻¹ = ${aInverse} (Formula: D(y) = ${aInverse}(y - ${b}) mod 26)`,
    });

    const mapping = {};
    let decryptedAlphabet = "";

    for (let i = 0; i < 26; i++) {
      const decryptedIndex = (aInverse * (((i - b) % 26) + 26)) % 26;
      mapping[alphabet[i]] = alphabet[decryptedIndex];
      decryptedAlphabet += alphabet[decryptedIndex];
    }

    steps.push({
      description: "Create Character Mapping",
      data: {
        rows: [
          { label: "Encrypted", chars: alphabet.split("") },
          { label: "Original", chars: decryptedAlphabet.split("") },
        ],
      },
    });

    const normalizedText = text.toUpperCase();
    let decryptedText = "";
    const charSteps = [];

    for (let i = 0; i < normalizedText.length; i++) {
      const char = normalizedText[i];

      if (alphabet.includes(char)) {
        const position = alphabet.indexOf(char);
        const decryptedIndex = (aInverse * (((position - b) % 26) + 26)) % 26;
        const decryptedChar = alphabet[decryptedIndex];
        decryptedText += decryptedChar;

        const calculation = `(${aInverse} × (${position} - ${b} + 26)) mod 26 = ${decryptedIndex}`;
        charSteps.push({
          original: char,
          mapped: decryptedChar,
          calculation,
        });
      } else {
        decryptedText += char;
        charSteps.push({
          original: char,
          mapped: char,
          calculation: "Non-alphabetic character (unchanged)",
        });
      }
    }

    steps.push({
      description: "Character Transformations",
      charSteps,
      data: decryptedText,
    });

    return { result: decryptedText, steps };
  }
  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex justify-center py-2 sm:py-6">
      <div className="p-4 sm:p-6 md:p-8 my-2 sm:my-4 md:my-6 max-w-7xl w-full mx-auto bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-lg transition-all">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-800 dark:text-gray-100">
          Affine Cipher
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <ModeToggle mode={mode} setMode={setMode} />
          <KeyInput
            keyValue={a}
            label="Key 'a' (must be coprime with 26)"
            setKey={setA}
          />
          <KeyInput keyValue={b} label="Key 'b' (shift value)" setKey={setB} />
        </div>

        <TextInput value={plaintext} onChange={setPlaintext} mode={mode} />

        <div className="mt-4 sm:mt-6">
          <Button onClick={handleProcess} mode={mode} />
        </div>

        {error && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-50 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 rounded-md">
            <p className="flex items-center">
              <span className="mr-2">⚠️</span>
              {error}
            </p>
          </div>
        )}

        {result && (
          <div className="mb-6">
            <div className="mb-4 p-4 bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 rounded">
              <h2 className="font-bold mb-2 text-green-900 dark:text-green-300">Result:</h2>
              <div className="text-2xl font-mono tracking-wider text-gray-900 dark:text-green-200">
                {result.result}
              </div>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded overflow-hidden">
              <h2 className="font-bold p-4 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300">
                Process Steps:
              </h2>

              {result.steps.map((step, index) => (
                <div key={index} className="p-4 border-b last:border-b-0 border-gray-200 dark:border-gray-600">
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">{step.description}</h3>

                  {typeof step.data === "string" ? (
                    <div className="font-mono p-2 bg-gray-50 dark:bg-gray-800 rounded text-gray-900 dark:text-gray-300">
                      {step.data}
                    </div>
                  ) : step.data.rows ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse">
                        <tbody>
                          {step.data.rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              <th className="p-2 border bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-left w-24">
                                {row.label}
                              </th>
                              {row.chars.map((char, charIndex) => (
                                <td
                                  key={charIndex}
                                  className="p-2 border text-center font-mono border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-300"
                                >
                                  {char}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}

                  {step.charSteps && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">
                          Character-by-Character Analysis:
                        </h4>
                        <button
                          onClick={() => setShowCharDetails(!showCharDetails)}
                          className="text-cyan-500 hover:text-cyan-600 dark:hover:text-cyan-400 text-sm font-medium flex items-center"
                        >
                          {showCharDetails ? "Hide Details" : "See Details"}
                          <svg
                            className={`ml-1 h-4 w-4 transition-transform ${showCharDetails ? "transform rotate-180" : ""
                              }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      </div>
                      {!showCharDetails && (
                        <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3 border border-gray-100 dark:border-gray-700">
                          <div className="flex flex-wrap gap-2">
                            {step.charSteps.slice(0, 5).map((charStep, i) => (
                              <div
                                key={i}
                                className="bg-white dark:bg-gray-700 rounded-md p-2 border border-gray-200 dark:border-gray-600 shadow-sm"
                              >
                                <div className="text-center font-mono mb-1 text-gray-900 dark:text-gray-200">
                                  {charStep.original} → {charStep.mapped}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {charStep.calculation.includes("Non-alphabetic")
                                    ? "No change"
                                    : charStep.calculation.split("=")[0] + "=..."}
                                </div>
                              </div>
                            ))}
                            {step.charSteps.length > 5 && (
                              <div className="flex items-center justify-center">
                                <span className="text-gray-500 dark:text-gray-400">
                                  + {step.charSteps.length - 5} more
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      {showCharDetails && (
                        <div className="overflow-x-auto -mx-3 sm:mx-0">
                          <div className="inline-block min-w-full align-middle sm:px-2 lg:px-4">
                            <table className="min-w-full border-collapse">
                              <thead>
                                <tr>
                                  <th className="p-2 border bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                    Original
                                  </th>
                                  <th className="p-2 border bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                    Calculation
                                  </th>
                                  <th className="p-2 border bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                    Result
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {step.charSteps.map((charStep, i) => (
                                  <tr key={i}>
                                    <td className="p-2 border text-center font-mono border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-300">
                                      {charStep.original}
                                    </td>
                                    <td className="p-2 border font-mono text-xs sm:text-sm border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-300">
                                      {charStep.calculation}
                                    </td>
                                    <td className="p-2 border text-center font-mono border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-300">
                                      {charStep.mapped}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400 mt-6">
          <p>
            <strong>About Affine Cipher:</strong> The Affine cipher is a type of
            monoalphabetic substitution cipher that uses the formula E(x) = (ax
            + b) mod 26 for encryption and D(y) = a⁻¹(y - b) mod 26 for
            decryption.
          </p>
          <p>
            Valid values for 'a' (must be coprime with 26): 1, 3, 5, 7, 9, 11,
            15, 17, 19, 21, 23, 25
          </p>
          <p>The value of 'b' can be any integer.</p>
        </div>
      </div>
    </div>
  );

};

export default AffineCipherUI;
