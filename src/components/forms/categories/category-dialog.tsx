"use client";

import { ReactNode, useState } from "react";
import { categorie } from "@/libs/types";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

interface Props {
  children?: ReactNode;
  category?: categorie;
}

export default function CategoryDialog({ children, category }: Props) {
  const [name, setName] = useState(category?.name || "");

  const isEdit = !!category;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button className="hover:bg-primary/90">Nova categoria</Button>
        )}
      </DialogTrigger>

      {/* 🔥 modal maior + fundo visível */}
      <DialogContent className="sm:max-w-lg bg-background border rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {isEdit ? "Editar Categoria" : "Nova Categoria"}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-5">
          {/* 🔥 input melhorado */}
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">
              Nome da categoria
            </span>

            <Input
              placeholder="Ex: Pizzas, Bebidas..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background border"
            />
          </div>

          {/* 🔥 botões corrigidos */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              className="bg-gray-200 text-black hover:bg-gray-300"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              className="bg-primary text-white hover:bg-primary/90"
            >
              Salvar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
