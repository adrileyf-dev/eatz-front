"use client";

import { deleteProductAction } from "@/service/products/serviceProduct";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

interface deleteProps {
  productid: string;
}
export default function DeleteButtonComponent({ productid }: deleteProps) {
  async function handleDelete() {
    const result = await deleteProductAction(productid);
    const router = useRouter();
    if (result?.success) {
      router.refresh();
      return;
    }
  }
  return (
    <Button
      className="p-2 rounded-md hover:bg-zinc-800/20 text-red-500  "
      onClick={handleDelete}
      variant={"destructive"}
    >
      {" "}
      <Trash className="w-4 h-4  " />
    </Button>
  );
}
