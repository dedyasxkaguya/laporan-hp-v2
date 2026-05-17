'use client'

import { useEffect, useState } from 'react';
import Classreport from '../../../components/Classreport';
import axios from 'axios';
import Navbar from '../../../components/Navbar';
import { checkDevice } from '../../../components/check';
import Forbidden from '../../../components/Error/Forbidden';
import Lenis from 'lenis';
export interface Data {
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


const Page = () => {
    const [isAndroid, setCheckOS] = useState<boolean>(false)
    const [scroll, setScroll] = useState<number>(0)
    const [time, timeSet] = useState<string>()
    const [date, dateSet] = useState<string>()
    const [data, setData] = useState<Data[]>()
    const [valid, setValid] = useState<number>()

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
        const lenis = new Lenis({
            autoRaf: true,
            lerp: 0.1,
            smoothWheel: true,
            duration: 1.5
        })
        lenis.start()
        lenis.on("scroll", (e) => {
            setScroll(e.progress !== 0 ? e.progress : .1)
        })
        axios.get("/api")
            .then(data => {
                console.log(data.data)
                const os = checkDevice()
                if (os && os?.toLowerCase() == "android") {
                    setCheckOS(true)
                } else {
                    setCheckOS(false)
                }
            })
        axios.get("/api/classes")
            .then(data => {
                const fetched = data.data
                setData(fetched.data)
                let newValid: number = 0
                fetched.data.map((a: Data) => {
                    if (a.last_report) {
                        newValid += 1
                    }
                })
                setValid(newValid)
                updateTime()
            })
    }, [])
    setInterval(() => {
        updateTime()
    }, 1000);
    if (!isAndroid) {
        return (
            <Forbidden />
        )
    } else {

        return (
            <>
                <Navbar isGlass={scroll > .1 ? true : false} />
                <main className=' p-4 rounded-3xl w-fit shadow border border-neutral-200 my-8 mx-auto' style={{ marginTop: "16dvh" }}>
                    <section className=' flex justify-between items-start lg:items-center flex-col lg:flex-row gap-2 '>
                        <div className=" p-2 px-4 rounded-xl bg-blue-200 text-blue-600 font-sans w-fit text-xs lg:text-base">
                            Daftar Kelas SMKN 1 Jakarta
                        </div>
                        <div className=" text-xs lg:text-base">
                            <span className=' text-neutral-400'>Tanggal : </span>
                            <span>{date} {time}</span>
                        </div>
                    </section>
                    <br />
                    <hr className=' text-neutral-400' />
                    <br />
                    <section className=' flex flex-col gap-4'>
                        <div className="">
                            <p className=' font-semibold font-mono text-lg lg:text-2xl'>Laporan Terbaru</p>
                        </div>
                        {data && valid && (
                            <div className=" flex gap-2">
                                <div className=" p-2 px-4 rounded-lg cursor-pointer bg-green-100 text-green-600 shadow text-xs lg:text-base">
                                    Laporan Valid : {valid}
                                </div>
                                <div className=" p-2 px-4 rounded-lg cursor-pointer bg-red-100 text-red-600 shadow text-xs lg:text-base">
                                    Laporan Invalid : {(data.length) - valid}
                                </div>
                            </div>
                        )}
                        {!data && (
                            <div className=" flex gap-2">
                                <div className=" p-2 px-4 rounded-lg bg-green-100 text-green-600 shadow opacity-75 cursor-not-allowed text-xs lg:text-base">
                                    Laporan Valid : 0
                                </div>
                                <div className=" p-2 px-4 rounded-lg bg-red-100 text-red-600 shadow opacity-75 cursor-not-allowed text-xs lg:text-base">
                                    Laporan Invalid : 0
                                </div>
                            </div>
                        )}
                        <hr className=' text-neutral-400' />
                        <Classreport isAdmin={true} />
                    </section>
                </main>
            </>
        )
    }
}


export default Page