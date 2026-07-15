import mongoose, { Document, Model } from "mongoose";

export interface IReport extends Document {
  name: string;
  student_class: string;
  report_type: string;
  teacher: string;
  phone: number;
  image: string;
  note: string;
}

const ReportSchema = new mongoose.Schema<IReport>(
  {
    name: { type: String, required: true },
    student_class: { type: String, required: true },
    report_type: { type: String, required: true },
    teacher: { type: String, required: true },
    phone: { type: Number, required: true },
    image: { type: String, required: true },
    note: { type: String, required: false },
  },
  { timestamps: true },
);

const Report: Model<IReport> =
  mongoose.models.Report || mongoose.model<IReport>("Report", ReportSchema);

export default Report;
