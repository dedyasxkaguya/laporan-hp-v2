import connectMongo from "@/app/lib/connectMongo";
import Class from "@/app/models/classSchema";
import Report from "@/app/models/reportSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, {params}:{params:Promise<{id:string}>}){
    connectMongo()
    const {id} = await params
    const data = await Class.findById(id).lean()
    const reports = await Report.find({student_class:id})
    return NextResponse.json({"status":true,"data":{
        ...data,
        reports:reports
    }})
}