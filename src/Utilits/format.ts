// utils/format.ts

/**
 * Formata valor para moeda BRL
 */
export function formatCurrency(value: number | null | undefined) {
  if (value == null) return "R$ 0,00";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

/**
 * Formata número simples (com separador de milhar)
 */
export function formatNumber(value: number | null | undefined) {
  if (value == null) return "0";

  return new Intl.NumberFormat("pt-BR").format(value);
}

/**
 * Formata porcentagem
 */
export function formatPercent(value: number | null | undefined) {
  if (value == null) return "0%";

  return new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 2,
  }).format(value / 100);
}

/**
 * Formata data (dd/MM/yyyy)
 */
export function formatDate(date: Date | string | null | undefined) {
  if (!date) return "--";

  const d = new Date(date);

  return new Intl.DateTimeFormat("pt-BR").format(d);
}

/**
 * Formata data + hora
 */
export function formatDateTime(date: Date | string | null | undefined) {
  if (!date) return "--";

  const d = new Date(date);

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(d);
}

/**
 * Formata CPF
 */
export function formatCPF(value: string | null | undefined) {
  if (!value) return "";

  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

/**
 * Formata CNPJ
 */
export function formatCNPJ(value: string | null | undefined) {
  if (!value) return "";

  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
}

/**
 * Limita texto (ellipsis)
 */
export function truncate(text: string | null | undefined, max = 50) {
  if (!text) return "";

  return text.length > max ? text.slice(0, max) + "..." : text;
}
