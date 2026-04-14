"use client";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/Utilits/format";
import { EyeIcon } from "lucide-react";

interface OrderRodapeProps {
  totalItems: number;
  totalSomaPedido: number;
  onOpenModal: () => void; // Ação disparada ao clicar
}

export default function OrderRodape({
  totalItems,
  totalSomaPedido,
  onOpenModal,
}: OrderRodapeProps) {
  return (
    <div className="mt-auto flex flex-col items-center justify-between gap-3 border-t border-gray-100 bg-gray-50/50 p-4 xl:flex-row">
      <div className="flex w-full flex-col justify-between self-start xl:w-auto">
        <span className="text-[10px] font-bold uppercase text-gray-400">
          Resumo
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-medium text-gray-600">
            {totalItems} itens
          </span>
          <span className="text-lg font-bold text-green-700">
            {formatCurrency(totalSomaPedido)}
          </span>
        </div>
      </div>

      <Button
        onClick={(e) => {
          e.stopPropagation();
          onOpenModal();
        }}
        size="sm"
        variant="outline"
        className="flex w-full items-center gap-2 border-slate-200 text-slate-700 hover:bg-white xl:w-auto active:scale-95 transition-all shadow-sm"
      >
        <EyeIcon className="h-4 w-4" />
        Ver Detalhes
      </Button>
    </div>
  );
}
