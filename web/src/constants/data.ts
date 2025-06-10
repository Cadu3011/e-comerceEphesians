import imgProtein from "../images/wheyConcentrado.jpeg"
export const productData = [
  
    {
      "_id": 1,
      "title": "Whey Protein Isolado",
      "isNew": true,
      "oldPrice": "200",
      "price": 150,
      "description": "Suplemento proteico de rápida absorção ideal para recuperação muscular.",
      "category": "Proteína",
      "image": imgProtein,
      "rating": 4,
      "quantity": 1
    },
    
  ];
  export const addProduct = async (formData: FormData) => {
  const id = formData.get("id") as string | null;
  const name = formData.get("descProduct") as string;
  const price = formData.get("price") as string;
  const quantity = formData.get("quantidade") as string;
  console.log(id)
  const data = {
    name,
    price,
    quantity,
  };

  if(id){
     const url = `http://localhost:4000/product/${id}` 
    const method = "PATCH"
    await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return
  }
   const url = `http://localhost:4000/product`;
  const method = "POST";
  await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

  
  export const searchProduct =async (searchData:FormData)=>{
    const search = searchData.get("search") as string
    const res = await fetch(`http://localhost:4000/product/nome/${search}`)
    const data = await res.json()
    return data
  }
  export const searchProductId =async (id:string)=>{
    const res = await fetch(`http://localhost:4000/product/${id}`)
    const data = await res.json()
    return data
  }