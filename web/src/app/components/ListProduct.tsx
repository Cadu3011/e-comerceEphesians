
interface Product{
    id: number
    name: string
    price:string
    quantity:number
    isActive:boolean
    createdAt:string
    updatedAt:string
   
}
interface Props{
    productList:Product[]
}

export default function ListProduct ({productList}:Props){
    
    return(
        <div className="bg-slate-900 w-full mt-8 rounded-lg p-4 overflow-x-auto">
                <table className="min-w-full text-white">
                <thead>
                  <tr className="text-left border-b border-slate-700">
                    <th className="p-2">Descrição</th>
                    <th className="p-2">Estoque</th>
                    <th className="p-2">Preço</th>
                    <th className="p-2">Ações</th>
                  </tr>
                </thead>
                <tbody>
                {Array.isArray(productList) && productList.length > 0 ? (
                  productList.map((product: any) => (
                    <tr key={product.id} className="bg-slate-800 hover:bg-slate-700 rounded">
                      <td className="p-2">{product.name}</td>
                      <td className="p-2">{product.quantity}</td>
                      <td className="p-2">R$ {product.price}</td>
                      <td className="p-2">
                        <button className="bg-yellow-600 px-3 py-1 rounded-lg text-black hover:bg-yellow-500">
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                    <tr>
                      <td colSpan={4} className="text-white text-center py-4">
                        Nenhum produto encontrado.
                      </td>
                    </tr>
                 )}
                </tbody>
              </table>
            
        
      </div>
    )
}