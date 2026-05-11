'use client'

import Classdetail from '@/app/components/Classdetail';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import SingleClassReport from '@/app/components/SingleClassReport';
import Navbar from '@/app/components/Navbar';
import * as XLSX from "xlsx"

export interface Data {
    status: boolean;
    data: DataClass;
}

export interface DataClass {
    _id: string;
    grade: string;
    name: string;
    vocation: string;
    uuid: string;
    teacher_name: string;
    classroom: string;
    colors: Colors;
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
    report_type: string;
    teacher: string;
    phone: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    image: string
}


const Page = () => {
    const params = useParams()
    const { id } = params

    const [time, timeSet] = useState<string>()
    const [date, dateSet] = useState<string>()
    const [collect, collectSet] = useState<number>(0)
    const [borrow, borrowSet] = useState<number>(0)
    const [take, takeSet] = useState<number>(0)
    const [student_class, setClass] = useState<DataClass>()
    const updateTime = () => {
        const d = new Date()
        const time = d.toLocaleDateString("id-ID", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        }).split(",")[1].toString()
        const date = d.toLocaleDateString("id-ID", {
            dateStyle: "full"
        }).split(",")[1].toString()

        timeSet(time)
        dateSet(date)
    }

    useEffect(() => {
        axios.get<Data>(`/api/classes/${id}`)
            .then(data => {
                const fetched = data.data
                updateTime()
                if (fetched.status) {
                    setClass(fetched.data)
                    let newCollect: number = 0
                    let newBorrow: number = 0
                    let newTake: number = 0
                    fetched.data.reports.map((a) => {
                        if (a.report_type == "Pengumpulan") {
                            newCollect += 1
                        } else if (a.report_type == "Peminjaman") {
                            newBorrow += 1
                        } else if (a.report_type == "Pengambilan") {
                            newTake += 1
                        }
                    })
                    collectSet(newCollect)
                    borrowSet(newBorrow)
                    takeSet(newTake)
                } else {
                    console.log("Tidak dapat mengambil data, mencoba lagi...")
                    axios.get<Data>(`/api/classes/${id}`)
                        .then(data => {
                            const fetched = data.data
                            console.log(fetched)
                            if (fetched.status) {
                                setClass(fetched.data)
                                fetched.data.reports.map((a) => {
                                    if (a.report_type == "Pengumpulan") {
                                        collectSet(collect + 1)
                                    } else if (a.report_type == "Peminjaman") {
                                        borrowSet(borrow + 1)
                                    } else if (a.report_type == "Pengambilan") {
                                        takeSet(take + 1)
                                    }
                                })
                            }
                        }
                        )
                }
            })
    }, [id])
    setInterval(() => {
        updateTime()
    }, 1000);

    const handlePrint = async () => {
        await window.print()
    }
    const handleExport = (data:Report[], student_class:string) => {
        const WB = XLSX.utils.book_new()
        const WS = XLSX.utils.json_to_sheet(data)
        XLSX.utils.book_append_sheet(WB,WS,`Laporan Kelas ${student_class}`)
        
    }
    return (
        <>
            <Navbar />
            <main className=' p-6 rounded-3xl w-fit shadow border border-neutral-200 mt-8 mx-auto mb-[16dvh]' style={{ marginTop:"16dvh" }}>
                <section className=' flex justify-between items-center'>
                    <div className=" p-2 px-4 rounded-xl bg-neutral-200 text-neutral-800 font-sans w-fit"
                        style={{ backgroundColor: student_class?.colors.subtle_color, color: student_class?.colors.primary_color }}>
                        Detail Kelas {student_class?.uuid}
                    </div>
                    <div className="">
                        <span className=' text-neutral-400'>Tanggal : </span>
                        <span>{date}, {time}</span>
                    </div>
                </section>
                <br />
                <hr className=' text-neutral-400' />
                <br />
                {student_class && (
                    <section>
                        <Classdetail data={student_class} />
                    </section>
                )}
                <br />
                <hr className=' text-neutral-400' />
                <br />
                <section className=' flex flex-col gap-4'>
                    <div className="flex justify-between">
                        <p className=' text-2xl font-semibold font-mono'>
                            <span>Laporan Gawai</span>
                            <span style={{ color: student_class?.colors.primary_color }}> {student_class?.uuid}</span>
                        </p>
                        <div className=" p-2 px-4 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-600 shadow">
                            <i className=' bi bi-list-ul me-2'></i>
                            <span>Total Data : {student_class?.reports.length}</span>
                        </div>
                    </div>
                    <div className=" flex gap-2 mb-2">
                        <div className=" p-2 px-4 rounded-lg bg-blue-50 text-blue-600 shadow">Laporan Pengumpulan : {collect}</div>
                        <div className=" p-2 px-4 rounded-lg bg-amber-50 text-amber-600 shadow">Laporan Peminjaman : {borrow}</div>
                        <div className=" p-2 px-4 rounded-lg bg-green-50 text-green-600 shadow">Laporan Pengambilan : {take}</div>
                    </div>
                    <hr className=' text-neutral-400' />
                </section>
                {student_class && (
                    <section className=' mt-2'>
                        <SingleClassReport data={student_class} />
                    </section>
                )}
                <section className=' flex gap-4 pt-8 text-xl'>
                    <button type="button" className=' p-2 px-4 border border-blue-800 text-blue-800 bg-blue-100 rounded-xl shadow transition-all 
                    duration-500 font-semibold cursor-pointer hover:opacity-60'
                    onClick={()=>handlePrint()}>
                        <span>Print</span>
                        <i className=' bi bi-printer-fill mx-2'></i>
                    </button>
                    {student_class && (
                        <button type="button" className=' p-2 px-4 border border-green-800 text-green-800 bg-green-100 rounded-xl shadow transition-all 
                        duration-500 font-semibold cursor-pointer hover:opacity-60'
                        onClick={()=>handleExport(student_class.reports , student_class?.uuid)}>
                        <span>Import To Excel</span>
                        <i className=' bi bi-file-earmark-spreadsheet-fill mx-2'></i>
                    </button>
                    )}
                </section>
            </main>
        </>
    )
}

export default Page