"use client";

import Toast from "@/components/Toast/Toast";
import { createContext, useCallback, useContext, useState } from "react";

interface ToastState {
  message: string;
  type: "success" | "error";
}

interface ToastContextProps {
  showToast: (message: string, type?: "success" | "error") => void;
}

const ToastContext = createContext<ToastContextProps | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState | null>(null);

  // useCallback evita que a função seja recriada desnecessariamente
  const showToast = useCallback(
    (message: string, type: "success" | "error" = "success") => {
      setToast({ message, type });

      // Auto-fechamento após 3 segundos
      setTimeout(() => {
        setToast(null);
      }, 3000);
    },
    [],
  );

  function closeToast() {
    setToast(null);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used inside ToastProvider");
  }
  return context;
}
