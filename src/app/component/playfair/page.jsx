"use client";
import React, { useState } from "react";
import ModeToggle from "@/app/layout/ModeToggle";
import TextInput from "@/app/layout/TextInput";
import KeyInput from "@/app/layout/KeyInput";
import Button from "@/app/layout/Button";

const PlayfairCipherUI = () => {
  const [plaintext, setPlaintext] = useState("HELLO WORLD");
  const [key, setKey] = useState("MONARCHY");
  const [mode, setMode] = useState("encrypt");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleProcess = () => {
    try {
      setError("");
      if (mode === "encrypt") {
        const output = encryptPlayfair(plaintext, key);
        setResult(output);
      } else {
        const output = decryptPlayfair(plaintext, key);
        setResult(output);
      }
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  function createPlayfairSquare(key) {
    const standardKey = key.toUpperCase().replace(/\s/g, "");
    const processedKey = standardKey.replace(/J/g, "I");
    const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ";

    const matrix = [];
    const usedChars = new Set();

    for (const char of processedKey) {
      if (!usedChars.has(char) && alphabet.includes(char)) {
        usedChars.add(char);
        matrix.push(char);
      }
    }

    for (const char of alphabet) {
      if (!usedChars.has(char)) {
        matrix.push(char);
      }
    }

    const grid = [];
    for (let i = 0; i < 5; i++) {
      grid.push(matrix.slice(i * 5, (i + 1) * 5));
    }

    return grid;
  }

  function findPosition(grid, char) {
    const lookupChar = char === "J" ? "I" : char;

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (grid[row][col] === lookupChar) {
          return { row, col };
        }
      }
    }
    return null;
  }

  function prepareText(text) {
    let processed = text.toUpperCase().replace(/\s/g, "");
    processed = processed.replace(/J/g, "I");
    processed = processed.replace(/[^A-Z]/g, "");

    const digraphs = [];
    let i = 0;

    while (i < processed.length) {
      if (i === processed.length - 1) {
        digraphs.push([processed[i], "X"]);
        i++;
      } else if (processed[i] === processed[i + 1]) {
        digraphs.push([processed[i], "X"]);
        i++;
      } else {
        digraphs.push([processed[i], processed[i + 1]]);
        i += 2;
      }
    }

    return digraphs;
  }

  function encryptPlayfair(plaintext, key) {
    const steps = [];

    const grid = createPlayfairSquare(key);
    steps.push({
      description: "Create Playfair Square",
      data: {
        grid,
        explanation:
          "Created 5x5 grid using key, filling remaining cells with unused alphabet (excluding J)",
      },
    });

    const originalText = plaintext;
    const digraphs = prepareText(plaintext);

    steps.push({
      description: "Prepare Plaintext",
      data: {
        original: originalText,
        processed: digraphs.flat().join(""),
        digraphs,
        rules: [
          "Convert to uppercase",
          "Remove spaces and non-alphabetic characters",
          "Replace J with I",
          "Split into pairs",
          "Insert X between repeated letters",
          "Add X if text has odd length",
        ],
      },
    });

    const encryptedDigraphs = [];
    const encryptionDetails = [];

    for (const [char1, char2] of digraphs) {
      const pos1 = findPosition(grid, char1);
      const pos2 = findPosition(grid, char2);

      let newChar1, newChar2;
      let rule;

      if (pos1.row === pos2.row) {
        newChar1 = grid[pos1.row][(pos1.col + 1) % 5];
        newChar2 = grid[pos2.row][(pos2.col + 1) % 5];
        rule = "Same row: shift right (wrap if needed)";
      } else if (pos1.col === pos2.col) {
        newChar1 = grid[(pos1.row + 1) % 5][pos1.col];
        newChar2 = grid[(pos2.row + 1) % 5][pos2.col];
        rule = "Same column: shift down (wrap if needed)";
      } else {
        newChar1 = grid[pos1.row][pos2.col];
        newChar2 = grid[pos2.row][pos1.col];
        rule = "Rectangle: exchange columns";
      }

      encryptedDigraphs.push([newChar1, newChar2]);

      encryptionDetails.push({
        original: [char1, char2],
        originalPositions: [pos1, pos2],
        encrypted: [newChar1, newChar2],
        rule,
      });
    }

    steps.push({
      description: "Encrypt Digraphs",
      data: {
        details: encryptionDetails,
      },
    });

    const ciphertext = encryptedDigraphs.flat().join("");

    steps.push({
      description: "Final Result",
      data: ciphertext,
    });

    return { result: ciphertext, steps };
  }

  function decryptPlayfair(ciphertext, key) {
    const steps = [];

    const grid = createPlayfairSquare(key);

    steps.push({
      description: "Create Playfair Square",
      data: {
        grid,
        explanation:
          "Created 5x5 grid using key, filling remaining cells with unused alphabet (excluding J)",
      },
    });

    const originalText = ciphertext;
    let processed = ciphertext
      .toUpperCase()
      .replace(/\s/g, "")
      .replace(/J/g, "I");
    processed = processed.replace(/[^A-Z]/g, "");

    if (processed.length % 2 !== 0) {
      processed += "X";
    }

    const digraphs = [];
    for (let i = 0; i < processed.length; i += 2) {
      digraphs.push([processed[i], processed[i + 1]]);
    }

    steps.push({
      description: "Prepare Ciphertext",
      data: {
        original: originalText,
        processed: processed,
        digraphs,
        rules: [
          "Convert to uppercase",
          "Remove spaces and non-alphabetic characters",
          "Replace J with I",
          "Split into pairs",
        ],
      },
    });

    const decryptedDigraphs = [];
    const decryptionDetails = [];

    for (const [char1, char2] of digraphs) {
      const pos1 = findPosition(grid, char1);
      const pos2 = findPosition(grid, char2);

      let newChar1, newChar2;
      let rule;

      if (pos1.row === pos2.row) {
        newChar1 = grid[pos1.row][(pos1.col + 4) % 5];
        newChar2 = grid[pos2.row][(pos2.col + 4) % 5];
        rule = "Same row: shift left (wrap if needed)";
      } else if (pos1.col === pos2.col) {
        newChar1 = grid[(pos1.row + 4) % 5][pos1.col];
        newChar2 = grid[(pos2.row + 4) % 5][pos2.col];
        rule = "Same column: shift up (wrap if needed)";
      } else {
        newChar1 = grid[pos1.row][pos2.col];
        newChar2 = grid[pos2.row][pos1.col];
        rule = "Rectangle: exchange columns";
      }

      decryptedDigraphs.push([newChar1, newChar2]);

      decryptionDetails.push({
        original: [char1, char2],
        originalPositions: [pos1, pos2],
        decrypted: [newChar1, newChar2],
        rule,
      });
    }

    steps.push({
      description: "Decrypt Digraphs",
      data: {
        details: decryptionDetails,
      },
    });

    const plaintext = decryptedDigraphs.flat().join("");

    steps.push({
      description: "Final Result",
      data: plaintext,
    });

    return { result: plaintext, steps };
  }

  const PlayfairGrid = ({ grid, highlights = null }) => {
    return (
      <div className="border border-gray-300 dark:border-gray-700 inline-block">
        <table className="border-collapse">
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => {
                  let isHighlighted = false;
                  let highlightClass = "";

                  if (highlights) {
                    for (let i = 0; i < highlights.length; i++) {
                      const pos = highlights[i];
                      if (pos.row === rowIndex && pos.col === colIndex) {
                        isHighlighted = true;
                        highlightClass =
                          i === 0 ? "bg-blue-200 dark:bg-blue-500/30" : "bg-green-200 dark:bg-green-500/30";
                      }
                    }
                  }

                  return (
                    <td
                      key={colIndex}
                      className={`w-10 h-10 text-center border border-gray-300 dark:border-gray-700 font-mono text-lg dark:text-gray-200 ${highlightClass}`}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-950 flex justify-center py-2 sm:py-6">
      <div className="p-4 sm:p-6 md:p-8 my-2 sm:my-4 md:my-6 max-w-7xl w-full mx-auto bg-white dark:bg-gray-900 rounded-lg shadow transition-all">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-800 dark:text-gray-100">
          Playfair Cipher
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <ModeToggle mode={mode} setMode={setMode} />
          <KeyInput keyValue={key} label="Key (any words)" setKey={setKey} />
        </div>

        <TextInput value={plaintext} onChange={setPlaintext} mode={mode} />

        <div className="mt-4 sm:mt-6">
          <Button onClick={handleProcess} mode={mode} />
        </div>

        {error && (
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-500/30 text-red-700 dark:text-red-400 rounded-md">
            <p className="flex items-center">
              <span className="mr-2">⚠️</span>
              {error}
            </p>
          </div>
        )}

        {result && (
          <div className="mb-6">
            <div className="mb-4 p-4 bg-green-100 dark:bg-green-500/10 border border-green-400 dark:border-green-500/30 rounded">
              <h2 className="font-bold mb-2 dark:text-gray-200">Result:</h2>
              <div className="text-2xl font-mono tracking-wider dark:text-green-300">
                {result.result}
              </div>
            </div>

            <div className="border border-gray-300 dark:border-gray-700 rounded overflow-hidden">
              <h2 className="font-bold p-4 bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-700 dark:text-gray-200">
                Process Steps:
              </h2>

              {result.steps.map((step, index) => (
                <div key={index} className="p-4 border-b dark:border-gray-700 last:border-b-0">
                  <h3 className="font-semibold mb-2 dark:text-gray-300">{step.description}</h3>

                  {step.description === "Create Playfair Square" && (
                    <div className="mb-4">
                      <div className="mb-2 font-medium dark:text-gray-300">
                        5×5 Playfair Square:
                      </div>
                      <div className="flex justify-center mb-4">
                        <PlayfairGrid grid={step.data.grid} />
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {step.data.explanation}
                      </div>
                    </div>
                  )}

                  {step.description === "Prepare Plaintext" && (
                    <div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="font-medium mb-1 dark:text-gray-300">Original Text:</div>
                          <div className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded font-mono dark:text-gray-400">
                            {step.data.original}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium mb-1 dark:text-gray-300">
                            Processed Text:
                          </div>
                          <div className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded font-mono dark:text-gray-400">
                            {step.data.processed}
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="font-medium mb-1 dark:text-gray-300">Digraphs:</div>
                        <div className="flex flex-wrap gap-2">
                          {step.data.digraphs.map((digraph, i) => (
                            <div
                              key={i}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 rounded font-mono"
                            >
                              {digraph.join("")}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="font-medium mb-1 dark:text-gray-300">
                          Processing Rules:
                        </div>
                        <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
                          {step.data.rules.map((rule, i) => (
                            <li key={i}>{rule}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {step.description === "Prepare Ciphertext" && (
                     <div>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                         <div>
                           <div className="font-medium mb-1 dark:text-gray-300">Original Text:</div>
                           <div className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded font-mono dark:text-gray-400">
                             {step.data.original}
                           </div>
                         </div>
                         <div>
                           <div className="font-medium mb-1 dark:text-gray-300">
                             Processed Text:
                           </div>
                           <div className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded font-mono dark:text-gray-400">
                             {step.data.processed}
                           </div>
                         </div>
                       </div>

                       <div className="mb-4">
                         <div className="font-medium mb-1 dark:text-gray-300">Digraphs:</div>
                         <div className="flex flex-wrap gap-2">
                           {step.data.digraphs.map((digraph, i) => (
                             <div
                               key={i}
                               className="px-3 py-1 bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-300 rounded font-mono"
                             >
                               {digraph.join("")}
                             </div>
                           ))}
                         </div>
                       </div>

                       <div>
                         <div className="font-medium mb-1 dark:text-gray-300">
                           Processing Rules:
                         </div>
                         <ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-400">
                           {step.data.rules.map((rule, i) => (
                             <li key={i}>{rule}</li>
                           ))}
                         </ul>
                       </div>
                     </div>
                  )}

                  {(step.description === "Encrypt Digraphs" ||
                    step.description === "Decrypt Digraphs") && (
                      <div>
                        {step.data.details.map((detail, i) => {
                          const firstChar = detail.original[0];
                          const secondChar = detail.original[1];
                          const resultChars =
                            step.description === "Encrypt Digraphs"
                              ? detail.encrypted
                              : detail.decrypted;

                          return (
                            <div
                              key={i}
                              className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded"
                            >
                              <div className="font-medium mb-2 dark:text-gray-300">
                                Digraph {i + 1}: {firstChar}
                                {secondChar} → {resultChars[0]}
                                {resultChars[1]}
                              </div>

                              <div className="mb-2 text-sm font-medium dark:text-gray-400">
                                Rule: {detail.rule}
                              </div>

                              <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
                                <div className="text-center">
                                  <div className="mb-1 text-sm font-medium dark:text-gray-300">
                                    Positions in the grid:
                                  </div>
                                  <PlayfairGrid
                                    grid={result.steps[0].data.grid}
                                    highlights={detail.originalPositions}
                                  />
                                  <div className="mt-1 text-xs">
                                    <span className="px-2 py-1 mr-2 bg-blue-200 dark:bg-blue-500/30 text-blue-800 dark:text-blue-300 rounded-sm">
                                      {firstChar} at (
                                      {detail.originalPositions[0].row},
                                      {detail.originalPositions[0].col})
                                    </span>
                                    <span className="px-2 py-1 bg-green-200 dark:bg-green-500/30 text-green-800 dark:text-green-300 rounded-sm">
                                      {secondChar} at (
                                      {detail.originalPositions[1].row},
                                      {detail.originalPositions[1].col})
                                    </span>
                                  </div>
                                </div>

                                <div className="text-4xl dark:text-gray-500">→</div>

                                <div className="text-center">
                                  <div className="text-sm font-medium mb-1 dark:text-gray-300">
                                    Character transformation:
                                  </div>
                                  <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                      <div className="w-16 h-16 mx-auto flex items-center justify-center bg-blue-100 dark:bg-blue-500/20 rounded-full font-mono text-2xl dark:text-blue-300">
                                        {firstChar}
                                      </div>
                                      <div className="text-xl mt-2 dark:text-gray-500">↓</div>
                                      <div className="w-16 h-16 mx-auto flex items-center justify-center bg-blue-300 dark:bg-blue-500/40 rounded-full font-mono text-2xl dark:text-blue-200">
                                        {resultChars[0]}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="w-16 h-16 mx-auto flex items-center justify-center bg-green-100 dark:bg-green-500/20 rounded-full font-mono text-2xl dark:text-green-300">
                                        {secondChar}
                                      </div>
                                      <div className="text-xl mt-2 dark:text-gray-500">↓</div>
                                      <div className="w-16 h-16 mx-auto flex items-center justify-center bg-green-300 dark:bg-green-500/40 rounded-full font-mono text-2xl dark:text-green-200">
                                        {resultChars[1]}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                  {step.description === "Final Result" && (
                    <div className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded font-mono text-lg tracking-wider dark:text-gray-300">
                      {step.data}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 dark:text-gray-400 mt-6">
          <p className="font-medium mb-1">About Playfair Cipher:</p>
          <ul className="list-disc pl-5">
            <li>
              Encrypts digraphs (pairs of letters) instead of single letters
            </li>
            <li>Uses a 5x5 grid of letters constructed using a keyword</li>
            <li>The letter J is typically replaced with I</li>
            <li>
              Three rules for encryption: same row, same column, or rectangle
            </li>
            <li>
              Special handling for repeated letters and odd-length messages
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlayfairCipherUI;
