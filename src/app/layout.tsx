import { Header, ThemeProvider, ThemeScript } from "@/components";
import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Hypertube",
  description: "A platform to explore and enjoy movies with customizable themes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        <ThemeProvider>
          <Header />
          <main className="mt-[60px]">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
