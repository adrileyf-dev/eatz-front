import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { ToastProvider } from "@/contexts/ToastContext";

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
    <html lang="en">
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
