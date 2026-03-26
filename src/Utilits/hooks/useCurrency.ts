"use client";
import { useState } from "react";

export function useCurrency(initialValue: number = 0) {
  const [value, setValue] = useState(format(initialValue));

  function format(v: number | string) {
    const num = Number(String(v).replace(/\D/g, "")) / 100;
    return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, ""); // Apenas números
    const num = Number(raw) / 100; // Converte centavos
    setValue(format(num));
  }

  function getRawValue() {
    return Number(value.replace(/\D/g, "")) / 100;
  }

  return { value, handleChange, getRawValue };
}
