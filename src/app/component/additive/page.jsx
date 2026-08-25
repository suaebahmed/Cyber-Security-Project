"use client";
import React, { useState } from "react";
import ModeToggle from "@/app/layout/ModeToggle";
import TextInput from "@/app/layout/TextInput";
import KeyInput from "@/app/layout/KeyInput";
import Button from "@/app/layout/Button";

const AdditiveCipherUI = () => {
  const [plaintext, setPlaintext] = useState("HELLO");
  const [key, setKey] = useState("3");
  const [mode, setMode] = useState("encrypt");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [showCharDetails, setShowCharDetails] = useState(false);

  const handleProcess = () => {
    try {
      setError("");
      if (mode === "encrypt") {
        const output = encryptAdditive(plaintext, key);
        setResult(output);
      } else {
        const output = decryptAdditive(plaintext, key);
        setResult(output);
      }
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  function encryptAdditive(plaintext, cipherKey) {
    const steps = [];

    const key = parseInt(cipherKey, 10);
    if (isNaN(key)) {
      throw new Error("Key must be a number");
    }

    const normalizedKey = ((key % 26) + 26) % 26;

    steps.push({
      description: "Process Key",
      data: `Key = ${cipherKey} (Normalized to ${normalizedKey})`,
    });

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const mapping = {};
    let encryptedAlphabet = "";

    for (let i = 0; i < 26; i++) {
      const newCharIndex = (i + normalizedKey) % 26;
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

    const normalizedPlaintext = plaintext.toUpperCase();
    let ciphertext = "";
    const charSteps = [];

    for (let i = 0; i < normalizedPlaintext.length; i++) {
      const char = normalizedPlaintext[i];
      const mappedChar = mapping[char] || char;
      ciphertext += mappedChar;

      if (alphabet.includes(char)) {
        const charPos = alphabet.indexOf(char);
        const calculation = `(${charPos} + ${normalizedKey}) mod 26 = ${
          (charPos + normalizedKey) % 26
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

  function decryptAdditive(ciphertext, cipherKey) {
    const steps = [];

    const key = parseInt(cipherKey, 10);
    if (isNaN(key)) {
      throw new Error("Key must be a number");
    }

    const normalizedKey = ((key % 26) + 26) % 26;

    steps.push({
      description: "Process Key",
      data: `Key = ${cipherKey} (Normalized to ${normalizedKey})`,
    });

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const mapping = {};
    let decryptedAlphabet = "";

    for (let i = 0; i < 26; i++) {
      const originalIndex = (((i - normalizedKey) % 26) + 26) % 26;
      mapping[alphabet[i]] = alphabet[originalIndex];
      decryptedAlphabet += alphabet[originalIndex];
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

    const normalizedCiphertext = ciphertext.toUpperCase();
    let plaintext = "";
    const charSteps = [];

    for (let i = 0; i < normalizedCiphertext.length; i++) {
      const char = normalizedCiphertext[i];
      const mappedChar = mapping[char] || char;
      plaintext += mappedChar;

      if (alphabet.includes(char)) {
        const charPos = alphabet.indexOf(char);
        const calculation = `(${charPos} - ${normalizedKey} + 26) mod 26 = ${
          (((charPos - normalizedKey) % 26) + 26) % 26
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
      data: plaintext,
    });

    return { result: plaintext, steps };
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex justify-center py-2 sm:py-6">
      <div className="p-4 sm:p-6 md:p-8 my-2 sm:my-4 md:my-6 max-w-7xl w-full mx-auto bg-white dark:bg-gray-800 rounded-lg shadow transition-all">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-800 dark:text-gray-100">
          Additive (Caesar) Cipher
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <ModeToggle mode={mode} setMode={setMode} />
          <KeyInput keyValue={key} label="Key" setKey={setKey} />
        </div>

        <TextInput value={plaintext} onChange={setPlaintext} mode={mode} />

        <div className="mt-4 sm:mt-6">
          <Button onClick={handleProcess} mode={mode} />
        </div>

        {error && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-50 dark:bg-red-900 border border-red-300 dark:border-red-600 text-red-700 dark:text-red-300 rounded-md">
            <p className="flex items-center">
              <span className="mr-2">⚠️</span>
              {error}
            </p>
          </div>
        )}

        {result && (
          <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-900 border border-green-300 dark:border-green-700 rounded-md">
              <h2 className="font-bold mb-2 text-green-800 dark:text-green-300">
                Result:
              </h2>
              <div className="text-lg sm:text-2xl font-mono tracking-wider p-2 bg-white dark:bg-gray-700 rounded border border-green-100 dark:border-green-600 select-all text-gray-900 dark:text-gray-100">
                {result.result}
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden shadow-sm">
              <h2 className="font-bold p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600 text-gray-700 dark:text-gray-200">
                Process Steps:
              </h2>

              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {result.steps.map((step, index) => (
                  <div key={index} className="p-3 sm:p-4 bg-white dark:bg-gray-800">
                    <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                      {step.description}
                    </h3>

                    {typeof step.data === "string" ? (
                      <div className="font-mono p-2 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-100 dark:border-gray-600 text-gray-800 dark:text-gray-200">
                        {step.data}
                      </div>
                    ) : step.data.rows ? (
                      <div className="overflow-x-auto -mx-3 sm:mx-0">
                        <div className="inline-block min-w-full align-middle sm:px-2 lg:px-4">
                          <table className="min-w-full border-collapse">
                            <tbody>
                              {step.data.rows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                  <th className="p-2 border bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-left w-24">
                                    {row.label}
                                  </th>
                                  {row.chars.map((char, charIndex) => (
                                    <td
                                      key={charIndex}
                                      className="p-2 border text-center font-mono text-gray-800 dark:text-gray-100"
                                    >
                                      {char}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ) : null}

                    {step.charSteps && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-700 dark:text-gray-200">
                            Character-by-Character Analysis:
                          </h4>
                          <button
                            onClick={() => setShowCharDetails(!showCharDetails)}
                            className="text-cyan-500 hover:text-cyan-600 text-sm font-medium flex items-center"
                          >
                            {showCharDetails ? "Hide Details" : "See Details"}
                            <svg
                              className={`ml-1 h-4 w-4 transition-transform ${
                                showCharDetails ? "transform rotate-180" : ""
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
                          <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-3 border border-gray-100 dark:border-gray-600">
                            <div className="flex flex-wrap gap-2">
                              {step.charSteps.slice(0, 5).map((charStep, i) => (
                                <div
                                  key={i}
                                  className="bg-white dark:bg-gray-800 rounded-md p-2 border border-gray-200 dark:border-gray-600 shadow-sm"
                                >
                                  <div className="text-center font-mono mb-1 text-gray-800 dark:text-gray-100">
                                    {charStep.original} → {charStep.mapped}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">
                                    {charStep.calculation.includes(
                                      "Non-alphabetic"
                                    )
                                      ? "No change"
                                      : charStep.calculation.split("=")[0] +
                                        "=..."}
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
                                    <th className="p-2 border bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                                      Original
                                    </th>
                                    <th className="p-2 border bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                                      Calculation
                                    </th>
                                    <th className="p-2 border bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                                      Result
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {step.charSteps.map((charStep, i) => (
                                    <tr key={i}>
                                      <td className="p-2 border text-center font-mono text-gray-800 dark:text-gray-100">
                                        {charStep.original}
                                      </td>
                                      <td className="p-2 border font-mono text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                                        {charStep.calculation}
                                      </td>
                                      <td className="p-2 border text-center font-mono text-gray-800 dark:text-gray-100">
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
          </div>
        )}

        <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-4 sm:mt-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-100 dark:border-gray-600">
          <h3 className="font-medium text-gray-700 dark:text-gray-200 mb-1">
            About the Cipher
          </h3>
          <p className="mb-1">
            The Additive Cipher (also known as Caesar Cipher) is a simple
            substitution cipher where each letter is shifted by a fixed number
            of positions in the alphabet.
          </p>
          <p className="mb-1">
            The traditional Caesar cipher uses a shift of 3 positions.
          </p>
          <p>
            <span className="font-medium">Formula:</span> Encryption = (position
            + key) mod 26, Decryption = (position - key + 26) mod 26
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdditiveCipherUI;
