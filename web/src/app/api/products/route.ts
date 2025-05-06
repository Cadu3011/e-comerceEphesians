import { NextResponse } from "next/server";
import { addProduct, productData } from "@/constants/data";


export  const GET = async () => {
    
    try {

        return NextResponse.json(
            {
                message: "product fatch successfully",
                success: true,
                productData,
            }
        )
        
    } catch (error) {
        return NextResponse.json(
            {
                error: "product loading error",

            },
            {
                status: 500
            }
        )
    }

}
export  const POST = async () => {
    
    try {

        return NextResponse.json(
            {
                message: "product fatch successfully",
                success: true,
                addProduct,
            }
        )
        
    } catch (error) {
        return NextResponse.json(
            {
                error: "product loading error",

            },
            {
                status: 500
            }
        )
    }

}
