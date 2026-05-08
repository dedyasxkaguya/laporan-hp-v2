import connectMongo from "@/app/lib/connectMongo";
import { uploadImage } from "@/app/lib/uploadIimage";
import { NextRequest, NextResponse } from "next/server";

export interface IResult{
    url:string
}

export async function POST(request:NextRequest){
    try {
        await connectMongo()
        const formdata = await request.formData()
        const image = formdata.get("image") as File
        if(image){
            const result:IResult = await uploadImage(image,"dedyas") as IResult
            return NextResponse.json({status:true,data:result,link:result.url})
        }
    } catch (error) {
        return NextResponse.json({status:false,data:error})
    }
}