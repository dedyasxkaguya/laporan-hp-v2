import connectMongo from "@/app/lib/connectMongo";
import Class from "@/app/models/classSchema";
import Report from "@/app/models/reportSchema";
import { NextRequest, NextResponse } from "next/server";

export interface Data {
  _id:          string;
  grade:        string;
  name:         string;
  vocation:     string;
  uuid:         string;
  teacher_name: string;
  classroom:    string;
  colors:       Colors;
  reports:      Report[];
}

export interface Colors {
  base_color:      string;
  primary_color:   string;
  secondary_color: string;
  subtle_color:    string;
}

export interface IReport {
  _id:           string;
  name:          string;
  student_class: string;
  report_type:   string;
  teacher:       string;
  phone:         number;
  __v:           number;
}

export async function GET() {
  connectMongo()
  try {
    const data = await Class.find().lean()
    const classData:Data[] = []
    for(const a of data){
      const reports = await Report.find({student_class:a._id})
      const updatedData = {
        ...a,
        "last_report":reports ? reports.reverse()[0] : null
      }
      classData.push(updatedData)
    }
    return NextResponse.json({ status: true, data:  classData });
  } catch (error) {
    return NextResponse.json({ status: false, data: error });
  }
}

export async function POST(request: NextRequest) {
  try {
    connectMongo();
    const { grade, name, vocation, uuid, teacher_name, classroom } =
      await request.json();
    const newClass = await Class.create({
      grade,
      name,
      vocation,
      uuid,
      teacher_name,
      classroom,
    });
    newClass.save();
    return NextResponse.json({ status: true, data: newClass });
  } catch (error) {
    return NextResponse.json({ status: false, data: error });
  }
}
