"use client"
import { useState } from "react";
import InputComp from "./input";
import { addProduct } from "@/constants/data";


export default function FormProduct(){
  const [descProduct,setDescProduct] = useState("")
  const [price, setPrice] = useState("")
  const [quantidade, setQuantidade] = useState("")
  
  const handleSubmit = async (e:React.FormEvent)=>{
    e.preventDefault();
    const formData = new FormData()
    formData.append("descProduct",descProduct)
    formData.append("price",price)
    formData.append("quantidade", quantidade)
    console.log(formData.get("descProduct"))
    await addProduct(formData)
    setDescProduct("")
    setPrice("")
    setQuantidade("")
  }

    return (
        <div>
          <div className="flex justify-center">
            <form className="bg-slate-600 flex flex-col items-center justify-center h-full w-2/3 gap-4 p-4 rounded  " method="POST" onSubmit={handleSubmit}>
                <div className="flex flex-col">
                <label className="text-white mb-1">Descrição do Produto</label>
                <InputComp type="text" value={descProduct} setValue={setDescProduct} placeholder=""/>
                </div>
                <div className="flex flex-col">
                <label className="text-white mb-1">Preço</label>
                <input type="number" className="p-2 rounded w-24" value={price} onChange={(e) => setPrice(e.target.value)}/>                
                </div>
                <div className="flex flex-col items-center">
                <label className="text-white mb-1">Quantidade inicial de estoque</label>
                <input type="number" className="p-2 rounded w-24" value={quantidade} onChange={(e) => setQuantidade(e.target.value)}/>
                </div>
                <div className="mt-3">
                    <button type="submit" className="bg-white text-slate-800 px-4 py-2 rounded cursor-pointer"> 
                      Enviar
                    </button>
                </div>
            </form>
            
          </div>
        </div>
      );
      
}
