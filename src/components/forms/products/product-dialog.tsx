"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/contexts/ToastContext";
import { useActionState } from "react";

import ProductForm from "./ProductForm";
import { ServiceProducts } from "@/service/products/serviceProduct";
import { ProductsTypes } from "@/types/ProductTypes";
interface Props {
  product?: ProductsTypes;
  children?: React.ReactNode;
}
export default function ProductDialog({ product, children }: Props) {
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();
  const [state, formAction] = useActionState(ServiceProducts, null);

  const isEdit = !!product;

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
          <DialogTitle>
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
