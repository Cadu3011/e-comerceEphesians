import FormProduct from "../../components/ProductForm";

export default function adminProcuct(){
    return(
        <div className="h-96 flex justify-center items-center mt-4 mb-6 ">

            <div className="w-1/3 h-full bg-slate-600 rounded-md p-5">
                <div className="hidden">
                    <FormProduct/>
                </div>
            <div className="flex justify-end">
                <div className="w-full max-w-sm min-w-[200px]">
                    <div className="relative">
                        <input
                        className="w-full bg-transparent placeholder:text-slate-400 text-white text-sm border border-slate-200 rounded-md pl-3 pr-28 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                        placeholder="Buscar" 
                        />
                        <button
                        className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                            <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                        </svg>
                    
                        Search
                        </button> 
                    </div>
                </div>
                <div>
                    <button className="bg-green-700 text-white border  border-green-300 rounded-md pl-1 pr-1 h-9 ml-6 mr-3">Adicionar</button>
                </div>
            </div>
            
                
                
            </div>
            
           
        </div>
    )
}