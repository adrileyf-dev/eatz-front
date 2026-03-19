"use client";
import { ReactNode, useState } from "react";
import { categorie } from "@/libs/types";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface Props {
  children?: ReactNode;
  category?: categorie;
}

export default function CategoryDialog() {
  ///const isEdit = !!category;
  const [open, setOpen] = useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="flex items-center bg-(--color-primary) gap-2 text-bg(--color-text) ">
            <Plus className="h-4 w-4" />
            Nova Categoria
          </Button>
        </DialogTrigger>

        <DialogContent
          className="
             bg-(--color-card)
            text-(--color-text)
             border border-(--color-border)
            max-w-lg"
        >
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              Criar Nova Categoria
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <Label htmlFor="category">Categoria</Label>
              <Input
                id="name"
                name="name"
                required
                placeholder="Digite o Nome da Categoria..."
                className=" border-b-black"
              ></Input>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
