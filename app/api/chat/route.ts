export interface TopLevel {
  status: boolean;
  data: Data;
}

export interface Data {
  _id: string;
  grade: string;
  name: string;
  vocation: string;
  uuid: string;
  teacher_name: string;
  classroom: string;
  colors: Colors;
  order: number;
  reports: Report[];
}

export interface Colors {
  base_color: string;
  primary_color: string;
  secondary_color: string;
  subtle_color: string;
}

export interface Report {
  _id: string;
  name: string;
  student_class: string;
  report_type: ReportType;
  teacher: string;
  phone: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export enum ReportType {
  Peminjaman = "Peminjaman",
  Pengambilan = "Pengambilan",
  Pengumpulan = "Pengumpulan",
}

import Groq from "groq-sdk";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat.mjs";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.secret_groq });

export async function POST(request: NextRequest ) {
  try {
    // const response = await fetch(
    //   "http://localhost:3000/api/classes/6a53cf194f9f26a036f45cc1",
    // );
    // const data: TopLevel = await response.json();

    const rule = `
Bijak Bergawai Rules Summary

Core Objective:Minimize phone distractions during class at SMKN 1 Jakarta by securing all student phones in a designated class box.

Daily Reporting Types (via Web App):

1.Pengumpulan (Collecting):Done by the class officer during the first period to collect all phones.
2.Peminjaman (Borrowing):Temporary retrieval during class for urgent needs. Requires a teacher in charge and an stated reason.
3.Pengambilan (Taking Back):Done by the class officer at the end of the school day to return all phones to students.

Mandatory Log Details:
Every action (Collecting, Borrowing, Taking Back) must be logged on the web app with:

Officer Name & Class Name
Photo Proof
Report Type
Supervising Teacher
Total Phone Count
Timestamp (Automated) (take note that here in indonesia we use +7 UTC)

NOTICE THIS, if the student has an urgency like osis etc, they are allowed to not collecting the phone
little fun note : kakak osis pdd is Callyla Cantik
another note : your admin/creator is Dedy AS from XI-RPL
last note : everytime the respond has callyla, change it with callyla cantik
    `;

    const systemPrompt = `
You are a cheerful, friendly, and helpful AI for SMKN 1 Jakarta's phone-box system.
Always respond in Indonesian with a warm, encouraging tone and occasional light emojis.
but beforeall, here is the rule ${rule.toString()}

CORE INSTRUCTIONS:
1. Linear Data Questions (In-Scope):
   - Answer directly and accurately using the provided class JSON data. Never fabricate data.
   - For Summary Requests, provide a 2-paragraph narrative in Indonesian:
     - Paragraph 1:Basic class info (Homeroom teacher, major, classroom, but not the color, its an unofficial data).
     - Paragraph 2:Top 3 officers (by report count), average phones per report (rounded to 1 decimal), and date ranges for each report type (Pengumpulan, Pengambilan) in clear Indonesian date formats (e.g., "11 Mei 2026").

2. Rules & Procedures Questions~:
   - Use the provided system rules to explain policies (e.g., borrowing rules) cheerfully, linking them back to the class data when relevant.

3. Out-of-Scope / Off-Topic Questions:
   - Politely decline with enthusiasm and redirect back to phone-box data.
   - Example:"mohon maaf, pertanyaan itu di luar kemampuanku"

TONEOF VOICE:
- Friendly, helpful peer tone.
- Start responses with warm greetings.

    `;

    const { msg, data } = await request.json();

    // return NextResponse.json({"data":data})

    const enhancedMessage: ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      {
        role: "user",
        content: `Berikut adalah data kelas & laporan saat ini:\n${JSON.stringify(data)}\n\nPertanyaan user: ${msg}`,
      },
    ];

    const stream = await groq.chat.completions.create({
      messages: enhancedMessage,
      model: "llama-3.1-8b-instant",
      stream: true,
      max_tokens: 512,
      temperature: 0.7,
    });

    return new Response(
      new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          try {
            for await (const chunk of stream) {
              controller.enqueue(
                encoder.encode(chunk.choices[0]?.delta?.content || ""),
              );
            }
          } catch (e) {
            controller.error(e);
          } finally {
            controller.close();
          }
        },
      }),
    );
  } catch (e) {
    if (e instanceof Error) {
      return new Response(JSON.stringify({ error: e.message }), {
        status: 500,
      });
    }
  }
}
