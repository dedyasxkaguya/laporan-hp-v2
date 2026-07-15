"use server";

import { NextResponse } from "next/server";
import connectMongo from "./connectMongo";
import axios from "axios";

export interface ClassInterface {
  id: string;
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

export const getClass = async () => {
  connectMongo();

  axios.get<ClassInterface[]>("/api/classes").then((data) => {
    const fetched = data.data
    console.log(fetched)
    return NextResponse.json({ status: true, data: fetched });
  });
};
