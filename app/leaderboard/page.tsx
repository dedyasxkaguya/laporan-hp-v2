'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DynamicIsland from '../components/DynamicIsland';
import TopPosition from '../components/TopPosition';
import 'bootstrap-icons/font/bootstrap-icons.css'
import LeaderboardReport from '../components/LeaderboardReport';
import Tabs, { statusEnum } from '../components/Tabs';
export interface TopLevel {
    status: boolean;
    data: LeaderboardDataI[];
}

export interface LeaderboardDataI {
    _id: string;
    grade: string;
    name: string;
    vocation: string;
    uuid: string;
    teacher_name: string;
    classroom: string;
    colors: Colors;
    order: number;
    reports_len: number;
    last_report?: LastReport;
    stats: Stats;
}

export interface Colors {
    base_color: string;
    primary_color: string;
    secondary_color: string;
    subtle_color: string;
}

export interface LastReport {
    _id: string;
    name: string;
    student_class: string;
    report_type: string;
    teacher: string;
    phone: number;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface Stats {
    collectValue: number;
    borrowValue: number;
    takeValue: number;
    points: number;
}

const Page = () => {

    const [data, setData] = useState<LeaderboardDataI[]>()
    const [dataTop, setDataTop] = useState<LeaderboardDataI[]>()

    useEffect(() => {
        axios.get<TopLevel>("/api/leaderboard")
            .then(data => {
                const fetched = data.data
                setData(fetched.data)
                setDataTop([fetched.data[0], fetched.data[1], fetched.data[2]])
            })
    }, [])

    return (
        <>
            <DynamicIsland isHome={false} data={null} />
            <main className=' w-full h-full flex justify-center items-center'>
                <div className="  w-[72dvw] rounded-4xl border border-neutral-400 my-[8dvh] p-4">
                    {dataTop && (
                        <TopPosition data={dataTop} />
                    )}
                    {data && (
                        <LeaderboardReport data={data} />
                    )}
                    {!data && (
                        <p>Tidak ada data</p>
                    )}
                </div>
            </main>
            <Tabs status={statusEnum.leaderboard} />
        </>
    )
}

export default Page
