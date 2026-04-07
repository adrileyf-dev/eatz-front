"use client";

import DeleteButtonComponent from "@/components/Systems/DeleteButtonComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductsTypes } from "@/types/ProductTypes";
import { formatCurrency } from "@/Utilits/format";
import { Package, Pencil, Tags } from "lucide-react";
import Image from "next/image";
import ProductDialog from "./product-dialog";

interface ProductItemProps {
  product: ProductsTypes;
}

export default function ProductItem({ product }: ProductItemProps) {
  return (
    <div className="w-full">
      <Card className="bg-app-card border-app-border transition-shadow hover:shadow-md text-white overflow-hidden flex flex-col h-full group">
        {/* CONTAINER DA IMAGEM: Proporção 16:9 no mobile, altura fixa no desktop */}
        <div className="relative w-full aspect-video sm:h-48 bg-zinc-900 rounded-t-xl overflow-hidden">
          {product.banner ? (
            <Image
              src={product.banner}
              alt={product.name}
              fill
              // 🔥 O segredo: object-cover garante que a imagem preencha o espaço SEM achatar
              className="object-cover transition-transform group-hover:scale-105 duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-800">
              <Package className="w-10 h-10 text-zinc-600" />
            </div>
          )}

          {/* BADGE DE STATUS (FLUTUANTE) */}
          <div className="absolute top-3 right-3 z-10">
            <span
              className={`text-[10px] px-2.5 py-1 rounded-full font-bold shadow-md tracking-wider ${
                product.active
                  ? "bg-green-500/90 text-white"
                  : "bg-red-500/90 text-white"
              }`}
            >
              {product.active ? "ATIVO" : "INATIVO"}
            </span>
          </div>
        </div>

        {/* HEADER: Título do Produto */}
        <CardHeader className="p-4 pb-1">
          <CardTitle className="flex items-start gap-2">
            <Package className="w-4 h-4 text-primary mt-1 shrink-0" />
            <span className="text-sm font-semibold text-black line-clamp-1">
              {product.name}
            </span>
          </CardTitle>
        </CardHeader>

        {/* CONTEÚDO: Descrição e Detalhes */}
        <CardContent className="px-4 pb-4 flex flex-col flex-1">
          {/* Descrição com limite de linhas para não quebrar o layout */}
          <p className="text-zinc-500 text-xs line-clamp-2 min-h-[32px] mb-4">
            {product.description || "Sem descrição disponível."}
          </p>

          {/* RODAPÉ: Preço, Categoria e Ações */}
          <div className="flex items-center justify-between pt-3 border-t border-zinc-100 mt-auto">
            <div className="flex flex-col gap-0.5">
              <span className="text-primary text-sm font-bold">
                {formatCurrency(Number(product.price))}
              </span>

              {product.category && (
                <div className="flex items-center gap-1 text-[10px] text-zinc-400">
                  <Tags className="w-3 h-3" />
                  <span className="truncate max-w-[80px]">
                    {product.category?.name}
                  </span>
                </div>
              )}
            </div>

            {/* BOTÕES DE AÇÃO (MAIORES PARA O TOUCH) */}
            <div className="flex items-center gap-1">
              <ProductDialog product={product}>
                <button
                  className="p-2.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                  title="Editar"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              </ProductDialog>

              <div className="p-0.5">
                <DeleteButtonComponent productid={product.id} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
