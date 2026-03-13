import "./globals.css";
import type { Metadata } from "next";
import { ToastProvider } from "@/contexts/ToastContext";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "EATZ",
  description: "Comida certa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
