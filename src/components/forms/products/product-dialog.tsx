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
import { Loader2, Plus } from "lucide-react"; // Importei o Loader2 para o spinner
import { useActionState, useEffect, useState } from "react";

import { ServiceProducts } from "@/service/products/serviceProduct";
import { ProductsTypes } from "@/types/ProductTypes";
import ProductForm from "./ProductForm";

interface Props {
  product?: ProductsTypes;
  children?: React.ReactNode;
}

// 1. Defina um estado inicial claro para evitar uso de "!" depois
const initialState = { message: "", success: false };

export default function ProductDialog({ product, children }: Props) {
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();

  // 2. O React 19 fornece o isPending diretamente no useActionState!
  const [state, formAction, isPending] = useActionState(
    ServiceProducts,
    initialState,
  );

  const isEdit = !!product;

  useEffect(() => {
    // Só exibe o toast se houver uma mensagem
    if (!state?.message) return;

    showToast(state.message, state.success ? "success" : "error");

    if (state.success) {
      setOpen(false);
    }
  }, [state, showToast]); // 3. showToast adicionado às dependências

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button>
            <Plus className="w-4 h-4 mr-2" /> {/* Espaçamento adicionado */}
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
          {/* 4. Garante que o ID seja enviado na Server Action se for edição */}
          {isEdit && <input type="hidden" name="id" value={product.id} />}

          <ProductForm product={product} />

          <div className="flex justify-end gap-2 mt-4">
            <DialogClose asChild>
              {/* Desabilita o cancelar enquanto estiver salvando para evitar bugs */}
              <Button type="button" variant="outline" disabled={isPending}>
                Cancelar
              </Button>
            </DialogClose>

            {/* 5. UX aprimorada com estado de carregamento */}
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
