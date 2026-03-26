"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductsTypes } from "@/types/ProductTypes";
import React, { useEffect, useState } from "react";
import { apiClient } from "@/libs/api";
import { getToken } from "@/libs/getCookies";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/libs/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

import { resizeImage } from "@/Utilits/resizeImage";

interface Props {
  product?: ProductsTypes;
}

export default function ProductForm({ product }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [imagePreview, setPreview] = useState<string | null>(null);
  const [imageFile, setFile] = useState<File | null>(null);

  useEffect(() => {
    async function load() {
      const token = await getToken();
      const data = await apiClient<Category[]>("/categories", { token });
      setCategories(data);
    }
    load();
  }, []);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Redimensiona para 600x600
    const resized = await resizeImage(file, 600, 600);

    // Salva para enviar ao servidor
    setFile(resized);

    // Prévia
    const previewUrl = URL.createObjectURL(resized);
    setPreview(previewUrl);
  }

  return (
    <div className="space-y-4">
      {/* NOME */}
      <div>
        <Label className="mb-2">Nome</Label>
        <Input name="name" defaultValue={product?.name} />
      </div>

      {/* PREÇO */}
      <div>
        <Label className="mb-2">Preço</Label>
        <Input name="price" type="text" defaultValue={product?.price} />
      </div>

      {/* CATEGORIA */}
      <div>
        <Label htmlFor="category" className="mb-2">
          Categoria
        </Label>

        <Select name="category_id" defaultValue={product?.category_id}>
          <SelectTrigger className="bg-[var(--color-bg-card)] border-[var(--color-border)] text-[var(--color-text)]">
            <SelectValue placeholder="Selecione" />
          </SelectTrigger>

          <SelectContent className="bg-[var(--color-bg-card)] border-[var(--color-border)] text-[var(--color-text)]">
            <SelectGroup>
              {categories.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.id}
                  className="text-[var(--color-text)]"
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* DESCRIÇÃO */}
      <div>
        <Label className="mb-2">Descrição</Label>
        <Textarea
          name="description"
          className="md"
          defaultValue={product?.description}
        />
      </div>

      {/* 🔥 IMAGEM */}
      <div className="relative w-full">
        <Label className="mb-2">Imagem</Label>
        {imagePreview ? (
          <div className="relative w-full h-48 border rounded-lg overflow-hidden">
            <Image
              src={imagePreview}
              alt="preview da Imagen"
              fill
              className=" object-cover z-10"
            ></Image>
            <Button
              className="absolute  right-2 z-2
              "
              type="button"
              variant={"destructive"}
              onClick={() => {}}
            >
              {" "}
              Exluir
            </Button>
          </div>
        ) : (
          <div className="border-2 border-dashed rounded-md p-8 flex flex-col justify-center">
            {" "}
            <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
            <Label htmlFor="file" className="text-shadow-lg ">
              Clique para Selecioar a imagem
            </Label>
            <Input
              id="file"
              name="file"
              type="file"
              accept="Image/jpg,Image/jpeg,image/png"
              onChange={handleImageChange}
              required
              className="hidden"
            ></Input>
          </div>
        )}
      </div>

      {/* STATUS */}
      <div className="flex gap-2 ">
        <input
          type="checkbox"
          name="active"
          defaultChecked={product?.active ?? true}
        />
        <Label>Ativo</Label>
      </div>

      {/* ID (edit) */}
      {product && <input type="hidden" name="id" value={product.id} />}
    </div>
  );
}
