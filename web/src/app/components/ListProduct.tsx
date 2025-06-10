import { useState } from "react"
import ProductForm from "./ProductForm"

interface Product {
  id: number
  name: string
  price: string
  quantity: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface Props {
  productList: Product[]
}

export default function ListProduct({ productList }: Props) {
  const [showForm, setShowForm] = useState(false)
  const [selectedId, setSelectedId] = useState<string>("") // <-- Novo estado

  const handleSubmit = (id: string) => {
    setSelectedId(id)
    setShowForm(true)
  }

  return (
    <div className="bg-slate-900  overflow-auto w-full mt-8 rounded-lg p-4 overflow-x-auto">
      {showForm && (
        <div className="absolute mt-4 z-10 inset-0 bg-opacity-90 flex justify-center items-start">
          <div className="relative bg-slate-600 rounded-md border border-black w-1/3">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
            >
              Fechar
            </button>
            <ProductForm id={selectedId} />
          </div>
        </div>
      )}

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
            productList.map((product: Product) => (
              <tr
                key={product.id}
                className="bg-slate-800 hover:bg-slate-700 rounded"
              >
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.quantity}</td>
                <td className="p-2">R$ {product.price}</td>
                <td className="p-2">
                  <button
                    className="bg-yellow-600 px-3 py-1 rounded-lg text-black hover:bg-yellow-500"
                    onClick={() => handleSubmit(product.id.toString())}
                  >
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
