"use client";

import { useState } from "react";
import ModeToggle from "@/app/layout/ModeToggle";
import VisualRepoMain from "./VisualRepresentation/VisualRepoMain";
import MathmeticalBackGround from "./MathmeticalBackGround";

function RSACipherPage() {
  const [mode, setMode] = useState("encrypt");

  const data = mode === "decrypt"
    ? {
      mode: "decrypt",
      message: 33677,
      publicKey: 343,
      privateKey: 12007,
      sharedModulus: 159197,
      result: 1314,
      inputType: "number",
    }
    : {
      mode: "encrypt",
      message: "NO",
      publicKey: 343,
      privateKey: 12007,
      sharedModulus: 159197,
      result: 33677,
      inputType: "text",
    };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-gray-50 dark:from-gray-900 dark:to-gray-800 flex justify-center py-4 transition-colors duration-300">
      <div className="p-6 md:p-8 my-4 max-w-5xl w-full mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-cyan-700 dark:text-cyan-400 border-b pb-4 border-blue-100 dark:border-gray-700">
          RSA Cipher
        </h1>

        <div className="mb-6">
          <ModeToggle mode={mode} setMode={setMode} />
        </div>

        <VisualRepoMain data={data} />

        <MathmeticalBackGround />
      </div>
    </div>
  );

}

export default RSACipherPage;
