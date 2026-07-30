import connectMongo from "@/app/lib/connectMongo";
import Class from "@/app/models/classSchema";
import Report from "@/app/models/reportSchema";
export interface TopLevel {
  status: boolean;
  data: Datum[];
}

export interface Datum {
  _id: string;
  grade: string;
  name: string;
  vocation: string;
  uuid: string;
  teacher_name: string;
  classroom: string;
  colors: Colors;
  order: number;
}

export interface Colors {
  base_color: string;
  primary_color: string;
  secondary_color: string;
  subtle_color: string;
}

export async function GET() {
  try {
    connectMongo();

    const data = await Class.find();

    const classArray = await Promise.all(
      data.map(async (item) => {
        const reports = await Report.find({ student_class: item._id });

        const stats = reports.reduce((att, a) => {
            if(a.report_type=="Pengumpulan"){
                att.collectValue+=1
                att.points+=48
            }else if(a.report_type=="Peminjaman"){
                att.borrowValue+=1
                att.points+=16
            }else{
                att.takeValue+=1
                att.points+=24
            }

            return att
        },{collectValue:0, borrowValue:0, takeValue:0,points:0});

        return {
          ...item.toObject(),
          reports_len: reports.length,
          last_report: reports[reports.length - 1],
          stats: stats,
        };
      }),
    );

    return Response.json({ status: true, data: classArray.sort((a,b)=>b.stats.points - a.stats.points) });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({ status: false, data: error.message });
    }
  }
}
