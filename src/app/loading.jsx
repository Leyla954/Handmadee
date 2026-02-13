"use client";
import { Spin } from "antd";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999]">
      <div className="relative mb-8">
        <h1 className="text-5xl font-black tracking-tighter text-black">
          DREAMS <span className="text-gray-300">AI</span>
        </h1>
        <div className="absolute -bottom-2 left-0 w-0 h-1.5 bg-black animate-progress-bar"></div>
      </div>
      <Spin size="large" />
      <p className="mt-6 text-gray-400 text-[10px] uppercase tracking-[0.3em] font-bold animate-pulse">
        Initializing Global Creative Engine
      </p>
      <style jsx>{`
        @keyframes progress-bar {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-progress-bar {
          animation: progress-bar 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}