"use client";
import React from "react";
import Link from "next/link";
import ToggleButton from "@/app/Theme/ToggleButton"

export default function Header() {

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950 text-white transition-all duration-300">
      <div className="mx-auto max-w-6xl px-6 py-4 sm:px-10 lg:px-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center text-lg font-semibold tracking-tight">
            <span className="text-cyan-400">Cipher</span>
            <span className="ml-1 text-slate-100">Algorithms</span>
          </Link>
          <ToggleButton />
        </div>
      </div>
    </header>
  );
}
