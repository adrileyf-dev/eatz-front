"use client";
import { ReactNode, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ServiceCategories } from "@/service/Categorie/serviceCategories";
import { useToast } from "@/contexts/ToastContext";
import { useActionState } from "react";
import { Category } from "@/libs/types";

interface Props {
  children?: ReactNode;
  category?: Category;
}

export default function CategoryDialog() {
  //  const isEdit = !!category;
  const [open, setOpen] = useState(false);
  const { showToast } = useToast();
  const [state, formAction] = useActionState(ServiceCategories, null);

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      showToast(state.message!, "success");
    } else {
      showToast(state.message!, "error");
    }
  }, [state]);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center bg-primary gap-2 ">
            <Plus className="h-4 w-4" />
            Nova Categorias
          </Button>
        </DialogTrigger>

        <DialogContent className="w-full max-w-xl p-8 rounded-2xl">
          <form id="category-form" className="space-y-4" action={formAction}>
            <div className="space-y-6">
              <DialogHeader className="flex items-center gap-2 text-bg(--color-text)  ">
                <DialogHeader>
                  <DialogTitle></DialogTitle>
                </DialogHeader>
              </DialogHeader>

              {/* Campo */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Categoria</Label>
                <Input name="name" placeholder="Digite o Nome da Categoria." />
              </div>

              {/* Botões */}
              <div className="flex justify-end gap-3 pt-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground"
                >
                  Gravar
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
