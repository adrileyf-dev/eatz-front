"use client";

import { Upload, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { apiClient } from "@/libs/api";
import { getToken } from "@/libs/getCookies";
import { Category } from "@/libs/types";
import { ProductsTypes } from "@/types/ProductTypes";
import { resizeImage } from "@/Utilits/resizeImage";

interface Props {
  product?: ProductsTypes;
}

export default function ProductForm({ product }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  // Inicia o preview com a imagem existente do produto, se houver
  const [imagePreview, setPreview] = useState<string | null>(
    product?.banner || null,
  );
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

    // Redimensiona para 600x600 antes de enviar
    const resized = await resizeImage(file, 600, 600);
    setFile(resized);

    // Cria a prévia visual
    const previewUrl = URL.createObjectURL(resized);
    setPreview(previewUrl);
  }

  const removeImage = () => {
    setPreview(null);
    setFile(null);
    // Nota: Se estiver editando, você precisará tratar a remoção da imagem antiga no submit
  };

  return (
    // Removido max-w e centralização para voltar ao tamanho anterior. Mantido o espaçamento vertical.
    <div>
      {/* NOME */}
      <div className="space-y-2">
        <Label htmlFor="name">Nome do Produto</Label>
        <Input
          id="name"
          name="name"
          defaultValue={product?.name}
          placeholder="Ex: Pizza de Calabresa"
        />
      </div>

      {/* PREÇO */}
      <div className="space-y-2">
        <Label htmlFor="price">Preço</Label>
        {/* Alterado para tipo texto para manter compatibilidade com o original, mas com inputmode numérico */}
        <Input
          id="price"
          name="price"
          type="text"
          inputMode="decimal"
          defaultValue={product?.price}
          placeholder="0,00"
        />
      </div>

      {/* CATEGORIA */}
      <div className="space-y-2">
        <Label htmlFor="category">Categoria</Label>
        <Select name="category_id" defaultValue={product?.category_id}>
          {/* Adicionado bg-white e border-input para garantir fundo branco e borda padrão */}
          <SelectTrigger className="w-full bg-white border border-input text-black">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          {/* Adicionado bg-white e border-input também no conteúdo do dropdown */}
          <SelectContent className="bg-white border border-input text-black">
            <SelectGroup>
              {categories.map((category) => (
                <SelectItem
                  key={category.id}
                  value={category.id}
                  className="focus:bg-accent focus:text-accent-foreground" // Garante hover visível
                >
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* DESCRIÇÃO */}
      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Detalhes sobre o produto..."
          className="resize-none h-24"
          defaultValue={product?.description}
        />
      </div>

      {/* 🔥 IMAGEM */}
      <div className="space-y-2">
        <Label>Imagem do Produto</Label>

        {imagePreview ? (
          // Container da imagem com hover para mostrar o botão de excluir
          <div className="relative group w-full h-56 border rounded-xl overflow-hidden bg-muted">
            <Image
              src={imagePreview}
              alt="Preview"
              fill
              className="object-contain" // Garante que a imagem apareça inteira
              id="file"
            />

            {/* Overlay que aparece no hover */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity  ">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={removeImage}
                className="  text-taupe-50 font-bold  absolute right-2 top-2 z-20 "
              >
                <X className="w-4 h-4 text-taupe-50" /> Remover Imagem
              </Button>
            </div>
          </div>
        ) : (
          // Área de upload (Dropzone visual)
          <label
            htmlFor="file"
            className="flex flex-col items-center justify-center w-full h-56 border-2
            border-dashed border-muted-foreground/25 rounded-xl cursor-pointer hover:bg-accent/50
             hover:border-primary/50 transition-all bg-white"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-10 h-10 text-muted-foreground mb-3" />
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-primary">
                  Clique para upload
                </span>{" "}
                ou arraste
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                PNG, JPG ou JPEG (Máx. 600x600px)
              </p>
            </div>
            <Input
              id="file"
              name="file"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* STATUS & ID */}
      <div className="flex items-center space-x-2 bg-white p-3 rounded-lg w-fit  border-input">
        <input
          type="checkbox"
          id="active"
          name="active"
          className="w-4 h-4 accent-primary" // accent-primary usa a cor principal do tema para o checkbox
          defaultChecked={product?.active ?? true}
        />
        <Label htmlFor="active" className="cursor-pointer">
          Produto Ativo para Vendas
        </Label>
      </div>

      {/* Campo oculto para o ID em caso de edição */}
      {product && <input type="hidden" name="id" value={product.id} />}
    </div>
  );
}
