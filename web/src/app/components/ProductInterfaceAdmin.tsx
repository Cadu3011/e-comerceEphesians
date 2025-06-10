"use client"

import { useState } from "react";
import FormProduct from "./ProductForm";
import { searchProduct } from "@/constants/data";
import ListProduct from "./ListProduct";

export default function ProductInterfaceAdmin(){
    const [showForm,setShowForm] = useState(false)
    const [search,setSearch] = useState("")
    const [showList,setShowList] = useState(false)
    const [productList,setProductList] = useState([])
    const openForm =()=>{
        setShowForm(true)
    }
  
     
    const handleSearch = async (e: React.FormEvent)=>{
        e.preventDefault()
        const searchData = new FormData()
        searchData.append("search",search)
        setShowList(true)
        const result = await searchProduct(searchData)
        setProductList(result)
    }
    return(
        <div className="h-96 flex justify-center  items-center mt-4 ">
           {showForm && (
                <div className="absolute mt-4 z-10 inset-0  bg-opacity-90 flex justify-center items-start ">
                    <div className="relative bg-slate-600   rounded-md border border-black w-1/3">
                    <button
                        onClick={() => setShowForm(false)}
                        className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Fechar
                    </button>
                    <FormProduct id=""/>
                    </div>
                </div>
            )}
            <div className="w-1/3 h-full bg-slate-600 rounded-md p-5 max-h-[90vh] overflow-y-auto absolut z-0 inset-0">
                <div className="flex justify-end ">
                    <div className="w-full max-w-sm min-w-[200px]">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                            className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            placeholder="Buscar"
                            value={search} 
                            onChange={(e)=>setSearch(e.target.value)}
                            />
                            <button
                            className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="submit"
                           
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                                <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                            </svg>
                        
                            Search
                            </button> 
                        </form>
                    </div>
                    <div>
                        <button onClick={openForm} className="bg-green-700 text-white border  border-green-300 rounded-md pl-1 pr-1 h-9 ml-6 mr-3">Adicionar</button>
                    </div>
                </div>
                {showList &&(
                    <div className="flex justify-center">
                        <ListProduct productList={productList}/>
                    </div>
                )}
                
                
            </div>
            
           
        </div>
    )
}