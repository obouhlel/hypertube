"use client";

import { useTheme } from "@/components/ThemeProvider";
import Image from "next/image";

export default function Page() {
  const { mounted, mode } = useTheme();

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-60px)]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-60px)] flex flex-col items-center justify-center p-4">
      <h1 className="text-6xl md:text-9xl text-center mb-12">Template color</h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
        <div className="flex flex-col items-center">
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Image
              src={mode === "dark" ? "/nextjs-light.svg" : "/nextjs-dark.svg"}
              alt="Next.js Logo"
              width={200}
              height={100}
              className="h-20 w-auto"
            />
          </a>
          <p className="mt-2 text-lg">Next.js</p>
        </div>

        <div className="flex flex-col items-center">
          <a
            href="https://tailwindcss.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <Image
              src="/tailwind.svg"
              alt="Tailwind CSS Logo"
              width={200}
              height={100}
              className="h-20 w-auto"
            />
          </a>
          <p className="mt-2 text-lg">Tailwind CSS v4</p>
        </div>
      </div>
    </div>
  );
}
