"use client";

import { deleteProduct } from "@/service/products/serviceProduct";
import { ProductsTypes } from "@/types/ProductTypes";
import { formatCurrency } from "@/Utilits/format";
import { Package, Pencil, Tags, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ProductDialog from "./product-dialog";
// Importe os componentes de Card se estiver usando Shadcn/UI
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface ProductItemProps {
  product: ProductsTypes;
}

export default function ProductItem({ product }: ProductItemProps) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm(
      `Deseja realmente excluir o produto "${product.name}"?`,
    );
    if (!confirmed) return;

    try {
      await deleteProduct(product.id);
      router.refresh();
    } catch (error) {
      alert("Erro ao remover o produto.");
      console.error(error);
    }
  }

  return (
    <Card className="bg-app-card border-app-border transition-shadow hover:shadow-md text-white overflow-hidden flex flex-col h-full">
      {/* IMAGEM (Ocupa o topo do Card) */}
      <div className="relative w-full h-48 bg-muted">
        {product.banner ? (
          <Image
            src={product.banner}
            alt={product.name}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-800">
            <Package className="w-12 h-12 text-zinc-600" />
          </div>
        )}

        {/* BADGE DE STATUS SOBRE A IMAGEM */}
        <div className="absolute top-2 right-2">
          <span
            className={`text-[10px] px-2 py-1 rounded-full font-bold shadow-lg ${
              product.active
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {product.active ? "ATIVO" : "INATIVO"}
          </span>
        </div>
      </div>

      <CardHeader className="p-0 pb-2">
        <CardTitle className="flex items-center  text-base md:text-lg truncate">
          <Package className="w-2 h-1 text-brand-primary " />
          <Label className="truncate text-black text-sm line-clamp-2 ">
            {product.name}
          </Label>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-4 pt-0 flex flex-col flex-1 gap-4">
        {/* DESCRIÇÃO (Se houver no seu tipo) */}
        <Label className="text-black text-sm line-clamp-2 min-h-[10px]">
          {product.description || "Sem descrição disponível."}
        </Label>

        {/* RODAPÉ DO CARD: PREÇO E CATEGORIA */}
        <div className="flex items-center justify-between pt-3 border-t border-app-border mt-auto">
          <div className="flex flex-col">
            <span className="text-brand-primary text-sm font-bold text-[var(--color-primary)]">
              {formatCurrency(Number(product.price))}
            </span>
            {product.category && (
              <div className="flex items-center gap-1 text-[10px] text-gray-800">
                <Tags className="w-3 h-3" />
                <span>{product.category?.name || "Sem Categoria"}</span>
              </div>
            )}
          </div>

          {/* AÇÕES (Edit/Delete) */}
          <div className="flex items-center gap-1">
            <ProductDialog product={product}>
              <button className="p-2 rounded-md hover:bg-zinc-800 text-blue-400 transition-colors">
                <Pencil className="w-4 h-4" />
              </button>
            </ProductDialog>

            <button
              onClick={handleDelete}
              className="p-2 rounded-md hover:bg-zinc-800 text-red-400 transition-colors"
            >
              <Trash className="w-4 h-4" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
