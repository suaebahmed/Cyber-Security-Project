"use client";
import React, { useState } from "react";
import ModeToggle from "@/app/layout/ModeToggle";
import TextInput from "@/app/layout/TextInput";
import KeyInput from "@/app/layout/KeyInput";
import Button from "@/app/layout/Button";

const AutokeyCipherUI = () => {
  const [plaintext, setPlaintext] = useState("HELLO");
  const [key, setKey] = useState("ATIK");
  const [mode, setMode] = useState("encrypt");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const charToNum = (char) => {
    return char.toUpperCase().charCodeAt(0) - 65;
  };

  const numToChar = (num) => {
    return String.fromCharCode((num % 26) + 65);
  };

  const handleProcess = () => {
    setError("");

    if (!key.trim()) {
      setError("Please enter a key");
      return;
    }

    if (!plaintext.trim()) {
      setError("Please enter text to process");
      return;
    }

    try {
      const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
      const cleanText = plaintext.toUpperCase().replace(/[^A-Z]/g, '');

      if (cleanKey.length === 0) {
        setError("Key must contain at least one letter");
        return;
      }

      if (cleanText.length === 0) {
        setError("Text must contain at least one letter");
        return;
      }

      if (mode === "encrypt") {
        const output = encryptAutokey(cleanText, cleanKey);
        setResult(output);
      } else {
        const output = decryptAutokey(cleanText, cleanKey);
        setResult(output);
      }
    } catch (e) {
      setError("Error processing: " + e.message);
    }
  };

  const encryptAutokey = (plaintext, key) => {
    let result = "";
    const tableRows = [];
    const charSteps = [];
    let fullKey = key;

    for (let i = 0; i < plaintext.length; i++) {
      const plainChar = plaintext[i];
      const keyChar = fullKey[i % fullKey.length];

      const plainNum = charToNum(plainChar);
      const keyNum = charToNum(keyChar);

      if (i < plaintext.length - 1 && fullKey.length <= i + 1) {
        fullKey += plainChar;
      }

      const resultNum = (plainNum + keyNum) % 26;
      const cipherChar = numToChar(resultNum);

      result += cipherChar;

      tableRows.push([plainChar, keyChar, cipherChar]);
      charSteps.push({
        original: plainChar,
        calculation: `(${plainChar}=${plainNum} + ${keyChar}=${keyNum}) % 26 = ${resultNum} → ${cipherChar}`,
        mapped: cipherChar
      });
    }

    const steps = [
      {
        description: "Encryption Process",
        data: "Each plaintext letter is shifted by the corresponding key letter. The key consists of the initial key followed by the plaintext itself."
      },
      {
        description: "Key Expansion",
        data: `Initial key: ${key} → Expanded to: ${fullKey.substring(0, Math.min(fullKey.length, 30))}${fullKey.length > 30 ? '...' : ''}`
      },
      {
        description: "Processing Steps",
        data: {
          headers: ["Plaintext", "Key", "Ciphertext"],
          rows: tableRows
        },
        charSteps: charSteps
      }
    ];

    return { result, steps };
  };

  const decryptAutokey = (ciphertext, key) => {
    let result = "";
    const tableRows = [];
    const charSteps = [];
    let actualKey = key;

    for (let i = 0; i < ciphertext.length; i++) {
      const cipherChar = ciphertext[i];
      const keyChar = actualKey[i % actualKey.length];

      const cipherNum = charToNum(cipherChar);
      const keyNum = charToNum(keyChar);

      const resultNum = (cipherNum - keyNum + 26) % 26;
      const plainChar = numToChar(resultNum);

      result += plainChar;

      if (i < ciphertext.length - 1 && actualKey.length <= i + 1) {
        actualKey += plainChar;
      }

      tableRows.push([cipherChar, keyChar, plainChar]);
      charSteps.push({
        original: cipherChar,
        calculation: `(${cipherChar}=${cipherNum} - ${keyChar}=${keyNum} + 26) % 26 = ${resultNum} → ${plainChar}`,
        mapped: plainChar
      });
    }

    const steps = [
      {
        description: "Decryption Process",
        data: "Each ciphertext letter is shifted backward by the corresponding key letter. The key expands as we recover the plaintext."
      },
      {
        description: "Key Expansion",
        data: `Initial key: ${key} → Expanded to: ${actualKey.substring(0, Math.min(actualKey.length, 30))}${actualKey.length > 30 ? '...' : ''}`
      },
      {
        description: "Processing Steps",
        data: {
          headers: ["Ciphertext", "Key", "Plaintext"],
          rows: tableRows
        },
        charSteps: charSteps
      }
    ];

    return { result, steps };
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 flex justify-center py-2 sm:py-6">
      <div className="p-4 sm:p-6 md:p-8 my-2 sm:my-4 md:my-6 max-w-7xl w-full mx-auto bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-lg transition-all">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-800 dark:text-gray-100">
          Autokey Cipher
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <ModeToggle mode={mode} setMode={setMode} />
          <KeyInput
            keyValue={key}
            label="Initial Key"
            setKey={setKey}
            placeholder="Enter initial key (e.g., SECRET)"
          />
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
                  ) : step.data.headers ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full border-collapse">
                        <thead>
                          <tr>
                            {step.data.headers.map((header, i) => (
                              <th
                                key={i}
                                className="p-2 border bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {step.data.rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.map((cell, cellIndex) => (
                                <td
                                  key={cellIndex}
                                  className="p-2 border text-center font-mono border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-300"
                                >
                                  {cell}
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
                      <h4 className="font-medium mb-2 text-gray-700 dark:text-gray-300">
                        Character-by-Character:
                      </h4>
                      <div className="overflow-x-auto">
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
                                <td className="p-2 border font-mono border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-300">
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
              ))}
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400 mt-6">
          <p>
            The Autokey Cipher is a polyalphabetic substitution cipher where the key is generated from the plaintext itself.
          </p>
          <p>
            The initial key is only used at the beginning, after which the plaintext becomes the key for subsequent characters.
          </p>
          <p>
            This creates a key that is as long as the message, making frequency analysis more difficult than with static key ciphers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AutokeyCipherUI;