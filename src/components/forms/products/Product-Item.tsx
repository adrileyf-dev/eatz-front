"use client";

import { deleteProduct } from "@/service/products/serviceProduct";
import { ProductsTypes } from "@/types/ProductTypes";
import { formatCurrency } from "@/Utilits/format";
import { Box, Tags, Pencil, Trash } from "lucide-react";
import ProductDialog from "./product-dialog";

interface Props {
  product: ProductsTypes;
}

export default function ProductItem({ product }: Props) {
  async function handleDelete() {
    if (!confirm("Deseja excluir esse produto?")) return;

    await deleteProduct(product.id);
  }

  return (
    <div
      className="
      bg-[var(--color-bg-card)]
      border border-[var(--color-border)]
      rounded-xl
      p-5
      flex items-center justify-between
      hover:shadow-md
      transition-all
    "
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        {/* IMAGE */}
        <div className="w-12 h-12 rounded-lg bg-[var(--color-bg-muted)] flex items-center justify-center overflow-hidden">
          {product.banner ? (
            <img
              src={product.banner}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Box className="w-5 h-5 text-[var(--color-primary)]" />
          )}
        </div>

        {/* INFO */}
        <div className="flex flex-col">
          <p className="font-semibold text-[var(--color-text)]">
            {product.name}
          </p>

          <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
            <Tags className="w-3 h-3" />
            <span>{product.category?.name}</span>
          </div>

          <span className="text-xs text-[var(--color-text-muted)]"></span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* PRICE + STATUS */}
        <div className="flex flex-col items-end">
          <span className="text-sm font-bold text-[var(--color-primary)]">
            {formatCurrency(product.price)}
          </span>

          <span
            className={`
              text-xs px-2 py-1 rounded-full
              ${
                product.active
                  ? "bg-green-100 text-green-600"
                  : "bg-red-100 text-red-500"
              }
            `}
          >
            {product.active ? "Ativo" : "Inativo"}
          </span>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          {/* EDIT */}
          <ProductDialog product={product}>
            <button className="p-2 rounded-md hover:bg-[var(--color-bg-muted)]">
              <Pencil className="w-4 h-4 text-blue-500" />
            </button>
          </ProductDialog>

          {/* DELETE */}
          <button
            onClick={handleDelete}
            className="p-2 rounded-md hover:bg-[var(--color-bg-muted)]"
          >
            <Trash className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
