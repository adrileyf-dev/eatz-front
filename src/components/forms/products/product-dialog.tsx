"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/contexts/ToastContext";
import { Plus } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

import { ServiceProducts } from "@/service/products/serviceProduct";
import { ProductsTypes } from "@/types/ProductTypes";
import ProductForm from "./ProductForm";
interface Props {
  product?: ProductsTypes;
  children?: React.ReactNode;
}
export default function ProductDialog({ product, children }: Props) {
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();
  const [isLoading, setLoading] = useState(false);
  const [state, formAction] = useActionState(ServiceProducts, null);

  const isEdit = !!product;
  const idCategorie = product?.category_id;
  useEffect(() => {
    if (!state) return;

    showToast(state.message!, state.success ? "success" : "error");

    if (state.success) setOpen(false);
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button>
            <Plus className="w-4 h-4" />
            Novo Produto
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            {isEdit ? "Editar Produto" : "Novo Produto"}
          </DialogTitle>
        </DialogHeader>

        <form action={formAction}>
          <ProductForm product={product} />

          <div className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
