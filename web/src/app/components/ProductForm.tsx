"use client"
import { useEffect, useState } from "react";
import { addProduct, searchProductId } from "@/constants/data"; // você precisa criar getProductById

interface ProductProps {
  id?: string;
}

export default function FormProduct({ id }: ProductProps) {
  const [descProduct, setDescProduct] = useState("");
  const [price, setPrice] = useState("");
  const [quantidade, setQuantidade] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      const product = await searchProductId(id); 
      if (product) {
        setDescProduct(product.name );
        setPrice(product.price?.toString() || "");
        setQuantidade(product.quantity?.toString() || "");
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("descProduct", descProduct);
    formData.append("price", price);
    formData.append("quantidade", quantidade);
    if (id) formData.append("id", id); 

    await addProduct(formData);

  
    setDescProduct("");
    setPrice("");
    setQuantidade("");
  };

  return (
    <div>
      <div className="flex justify-center">
        <form
          className="bg-slate-600 flex flex-col items-center justify-center h-full w-2/3 gap-4 p-4 rounded"
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center">
            <label className="text-white mb-1">Descrição do Produto</label>
            <input
              type="text"
              className="p-2 rounded w-24"
              value={descProduct}
              onChange={(e) => setDescProduct(e.target.value)} required
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-white mb-1">Preço</label>
            <input
              type="number"
              className="p-2 rounded w-24"
              value={price}
              onChange={(e) => setPrice(e.target.value)}required
            />
          </div>
          <div className="flex flex-col items-center">
            <label className="text-white mb-1">Quantidade inicial de estoque</label>
            <input
              type="number"
              className="p-2 rounded w-24"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}required
            />
          </div>
          <div className="mt-3">
            <button
              type="submit"
              className="bg-white text-slate-800 px-4 py-2 rounded cursor-pointer"
            >
              {id ? "Atualizar" : "Enviar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
