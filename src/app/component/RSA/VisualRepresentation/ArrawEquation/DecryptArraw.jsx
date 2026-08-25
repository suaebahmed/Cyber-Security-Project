import React from "react";

function CryptoArrowEquation() {
  return (
    <div className="flex justify-center py-4">
      <svg
        className="w-full max-w-lg h-28 transition-transform duration-300 hover:scale-105"
        viewBox="0 0 400 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 80,50 C 120,50 150,80 200,80 S 280,50 320,50"
          stroke="#10B981"
          className="dark:stroke-emerald-400"
          strokeWidth="2.5"
          fill="none"
          strokeDasharray="6,6"
        />
        <polygon
          points="315,50 305,45 305,55"
          fill="#10B981"
          className="dark:fill-emerald-400"
        />
        <rect
          x="140"
          y="65"
          width="120"
          height="30"
          rx="15"
          fill="#ECFDF5"
          stroke="#A7F3D0"
          className="dark:fill-gray-800 dark:stroke-emerald-500"
        />
        <text
          x="200"
          y="85"
          textAnchor="middle"
          className="fill-emerald-600 dark:fill-emerald-400"
          fontFamily="sans-serif"
          fontSize="16"
        >
          P = C
          <tspan fontSize="12" dy="-5">
            d
          </tspan>
          <tspan fontSize="15" dy="5">
            {" "}
            mod n
          </tspan>
        </text>
      </svg>
    </div>
  );
}

export default CryptoArrowEquation;
