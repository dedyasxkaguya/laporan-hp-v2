import axios from 'axios';
import React, { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Statusbox from './Statusbox';
import Link from 'next/link';

export interface Data {
    status: boolean;
    data: Datum[];
}

export interface Datum {
    _id: string;
    grade: Grade;
    name: string;
    vocation: Vocation;
    uuid: string;
    teacher_name: string;
    classroom: string;
    colors: Colors;
    last_report?: LastReport;
}

export interface Colors {
    base_color: string;
    primary_color: string;
    secondary_color: string;
    subtle_color: string;
}

export enum Grade {
    X = "X",
    Xi = "XI",
    Xii = "XII",
}

export interface LastReport {
    _id: string;
    name: string;
    student_class: string;
    report_type: string;
    teacher: string;
    phone: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export enum Vocation {
    Informatika = "INFORMATIKA",
}

const Classreport = () => {
    const [data, setData] = useState<Datum[]>()
    useEffect(() => {
        axios.get<Data>("/api/classes")
            .then(data => {
                const fetched = data.data
                console.log(fetched)
                if (fetched.status) {
                    setData(fetched.data)
                } else {
                    console.log("Tidak dapat mengambil data, mencoba lagi...")
                    axios.get<Data>("/api/classes")
                        .then(data => {
                            const fetched = data.data
                            console.log(fetched)
                            if (fetched.status) {
                                setData(fetched.data)
                            }
                        }
                        )
                }
            })
    }, [])
    return (
        <main>
            <section></section>
            <section>
                <p className=' text-2xl font-semibold font-mono'>Laporan Gawai</p>
                <table className=' table border-collapse border-spacing-2'>
                    <tbody>
                        <tr>
                            <td className=' text-neutral-400 p-4 text-xl font-mono'>Kelas</td>
                            <td className=' text-neutral-400 p-4 text-xl font-mono'>Guru</td>
                            <td className=' text-neutral-400 p-4 text-xl font-mono'>Status</td>
                            <td className=' text-neutral-400 p-4 text-xl font-mono'>Petugas</td>
                            <td className=' text-neutral-400 p-4 text-xl font-mono'>Tanggal</td>
                        </tr>
                        {data?.map((a, index) => {
                            return (
                                <tr key={index}>
                                    <td className='border border-neutral-200 border-r-0 border-l-0 p-4'>
                                        <Link href={'/class/' + a._id} className=" p-2 px-4 rounded-xl shadow" style={{ backgroundColor: a.colors.subtle_color, color: a.colors.primary_color }}>
                                            {a.grade} {a.name}
                                        </Link>
                                    </td>
                                    <td className='border border-neutral-200 border-r-0 border-l-0 p-4 font-semibold'>
                                        {a.teacher_name}
                                    </td>
                                    <td className='border border-neutral-200 border-r-0 border-l-0 p-4'>
                                        {a.last_report
                                            ? <Statusbox tipe={a.last_report.report_type} />
                                            : <div className=" text-red-600">
                                                <i className="bi bi-exclamation-circle me-2"></i>
                                                <span>Tidak ada</span>
                                            </div>
                                        }
                                    </td>
                                    <td className='border border-neutral-200 border-r-0 border-l-0 p-4 capitalize'>
                                        {a.last_report ? a.last_report.name : "-"}
                                    </td>
                                    <td className='border border-neutral-200 border-r-0 border-l-0 p-4 text-neutral-400'>
                                        {a.last_report ? new Date(a.last_report?.createdAt).toLocaleDateString("id-ID", {
                                            dateStyle: "full"
                                        }) : "-"}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default Classreport