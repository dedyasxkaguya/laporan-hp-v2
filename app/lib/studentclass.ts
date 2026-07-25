"use server";

import { NextResponse } from "next/server";
import connectMongo from "./connectMongo";
import axios from "axios";
import { Datum } from "../components/Classreport";

export interface ClassInterface {
  _id: string;
  order: number;
  grade: string;
  name: string;
  vocation: string;
  uuid: string;
  teacher_name: string;
  classroom: string;
  colors: Colors;
}

export interface Colors {
  base_color: string;
  primary_color: string;
  secondary_color: string;
  subtle_color: string;
}

interface ClassFilterI {
  data: Datum[];
  nameFilter: string;
  gradeFilter: string[];
  typeFilter: string;
  dateFilter: Date | null;
}
export const getClass = async () => {
  connectMongo();

  axios.get<ClassInterface[]>("/api/classes").then((data) => {
    const fetched = data.data;
    console.log(fetched);
    return NextResponse.json({ status: true, data: fetched });
  });
};

export const getAllClass = async () => {
  connectMongo();

  // const ids = ["6a53cf194f9f26a036f45cbc", "6a53cf194f9f26a036f45cbd", "6a53cf194f9f26a036f45cbe"]

  axios.get<ClassInterface[]>("/api/classes").then((data) => {
    const fetched = data.data;
    console.log(fetched);
    return NextResponse.json({ status: true, data: fetched });
  });
};

export const filterClassData = async ({
  data,
  nameFilter,
  gradeFilter,
  typeFilter,
  dateFilter,
}: ClassFilterI) => {
  const filteredData = data
    .filter((a) => {
      const matchName = nameFilter
        ? a.name.toLowerCase().includes(nameFilter.toLowerCase()) || a.last_report?.name.toLowerCase().includes(nameFilter.toLowerCase())
        : true;

      const matchGrade =
        gradeFilter.length > 0 ? gradeFilter.includes(a.grade) : true;

      const matchType = typeFilter
        ? a.last_report
          ? a.last_report.report_type.includes(typeFilter)
          : false
        : true;

      const matchDate =
        dateFilter && a.last_report
          ? new Date(a.last_report.createdAt as Date).toDateString() ==
            new Date(dateFilter).toDateString()
          : true;

      const LastReport = dateFilter ? (a.last_report ? true : false) : true;

      return matchName && matchGrade && matchType && matchDate && LastReport;
    });

    return filteredData
};
