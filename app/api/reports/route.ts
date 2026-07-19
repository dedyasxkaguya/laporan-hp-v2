import { NextRequest, NextResponse } from "next/server";
import connectMongo from "@/app/lib/connectMongo";
import Report from "@/app/models/reportSchema";

interface IReport extends Document {
  name: string;
  student_class: string;
  report_type: string;
  teacher: string;
  phone: number;
  image: string;
  note:string
}

export async function GET() {
  try {
    connectMongo();
    const data = await Report.find();
    return NextResponse.json({ status: true, data: data });
  } catch (e) {
    return NextResponse.json({ status: false, data: e });
  }
}

export async function POST(request: NextRequest) {
  try {
    connectMongo();
    const formData = await request.formData()
    const name = formData.get("name") as string
    const student_class = formData.get("student_class") as string
    const report_type = formData.get("report_type") as string
    const teacher = formData.get("teacher") as string
    const note = formData.get("note") as string
    const phone = Number(formData.get("phone")) 
    const image = formData.get("image") as string
    if(note){
      const newReport = await Report.create({
        name,
        student_class,
        report_type,
        teacher,
        phone,
        image,
        note
      } as IReport);
      return NextResponse.json({ status: true, data: newReport });
    }else{
      const newReport = await Report.create({
        name,
        student_class,
        report_type,
        teacher,
        phone,
        image
      } as IReport);
      return NextResponse.json({ status: true, data: newReport });
    }
  } catch (error) {
    return NextResponse.json({ status: false, data: error });
  }
}
