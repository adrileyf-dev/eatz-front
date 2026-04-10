// Ajuste o caminho se necessário
import { SocketManager } from "@/components/Socket.io/SocketManager";
import { ToastProvider } from "@/contexts/ToastContext";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "EATZ",
  description: "Comida certa",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={cn("font-sans", geist.variable)}>
      <body className="bg-[--color-bg] text-[--color-text]">
        <ToastProvider>
          {/* O gerenciador de eventos fica aqui para ouvir o Kafka em todo o sistema */}
          <SocketManager />

          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
