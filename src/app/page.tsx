"use client";

import { useTheme } from "@/components/theme-provider";
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
      Hypertube
    </div>
  );
}
