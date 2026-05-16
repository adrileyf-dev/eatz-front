"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/contexts/ToastContext";
import { Category } from "@/libs/types";
import { Loader2, Plus } from "lucide-react";
import { useActionState, useEffect, useState } from "react";

import { ServiceProducts } from "@/service/products/serviceProduct";
import { ProductsTypes } from "@/types/ProductTypes";
import ProductForm from "./ProductForm";

interface Props {
  product?: ProductsTypes;
  children?: React.ReactNode;
  categories: Category[];
}

const initialState = { message: "", success: false };

export default function ProductDialog({ product, children, categories }: Props) {
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();

  const [state, formAction, isPending] = useActionState(
    ServiceProducts,
    initialState,
  );

  const isEdit = !!product;

  useEffect(() => {
    if (!state?.message) return;

    showToast(state.message, state.success ? "success" : "error");

    if (state.success) {
      setOpen(false);
    }
  }, [state, showToast]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Produto
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">
            {isEdit ? "Editar Produto" : "Novo Produto"}
          </DialogTitle>

          <DialogDescription className="text-center">
            {isEdit
              ? "Altere as informações abaixo para atualizar o produto no estoque."
              : "Preencha os campos abaixo para cadastrar um novo produto na plataforma."}
          </DialogDescription>
        </DialogHeader>

        <form action={formAction}>
          {isEdit && <input type="hidden" name="id" value={product.id} />}

          <ProductForm product={product} categories={categories} />

          <div className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isPending}>
                Cancelar
              </Button>
            </DialogClose>

            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                "Salvar"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
