"use client";

import { categorie } from "@/libs/types";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreVertical, Pencil, Trash } from "lucide-react";
import CategoryDialog from "@/components/forms/categories/category-dialog";

interface Props {
  category: categorie;
}

export default function CategoryActions({ category }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <CategoryDialog category={category}>
          <DropdownMenuItem
            className="text-blue-700"
            onSelect={(e) => e.preventDefault()}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Editar
          </DropdownMenuItem>
        </CategoryDialog>

        <DropdownMenuItem className="text-red-500">
          <Trash className="w-4 h-4 mr-2" />
          Deletar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
