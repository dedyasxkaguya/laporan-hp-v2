import axios from 'axios';
import React, { useEffect, useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Statusbox from './Statusbox';
import Link from 'next/link';
import FieldSelect from './FieldSelect';
import Fields from './Fields';
import { filterClassData } from '../lib/studentclass';

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
    order: number

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

const Classreport = ({ isAdmin, data }: { isAdmin?: boolean, data: Datum[] }) => {
    // const [data, setData] = useState<Datum[]>()
    const [dataFiltered, setDataFiltered] = useState<Datum[]>()
    const [gradeFilter, setGradeFilter] = useState<string[]>([])
    const [nameFilter, setNameFilter] = useState<string>("")
    const [typeFilter, setTypeFilter] = useState<string>("")
    const [dateFilter, setDateFilter] = useState<Date | null>(null)

    useEffect(() => {
        axios.get<Data>("/api/classes")
            .then(data => {
                const fetched = data.data
                console.log(fetched)
                if (fetched.status) {
                    // setData(fetched.data)
                    setDataFiltered(fetched.data)
                } else {
                    console.log("Tidak dapat mengambil data, mencoba lagi...")
                }
            })
    }, [])

    const handleGradeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value) {
            setGradeFilter([e.target.value])
            if (data) {

                filterClassData({
                    data: data,
                    dateFilter: dateFilter,
                    gradeFilter: [e.target.value],
                    nameFilter: nameFilter,
                    typeFilter: typeFilter
                })
                    .then(data => {
                        console.log(data)
                        setDataFiltered(data)
                    })
            }
        } else {
            setGradeFilter([])
            if (data) {

                filterClassData({
                    data: data,
                    dateFilter: dateFilter,
                    gradeFilter: [],
                    nameFilter: nameFilter,
                    typeFilter: typeFilter
                })
                    .then(data => {
                        console.log(data)
                        setDataFiltered(data)
                    })
            }
        }
    }

    const handleNameFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(e.target.value)
        if (data) {

            filterClassData({
                data: data,
                dateFilter: dateFilter,
                gradeFilter: gradeFilter,
                nameFilter: e.target.value,
                typeFilter: typeFilter
            })
                .then(data => {
                    console.log(data)
                    setDataFiltered(data)
                })
        }
    }

    const handleTypeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTypeFilter(e.target.value)
        if (data) {

            filterClassData({
                data: data,
                dateFilter: dateFilter,
                gradeFilter: gradeFilter,
                nameFilter: nameFilter,
                typeFilter: e.target.value
            })
                .then(data => {
                    console.log(data)
                    setDataFiltered(data)
                })
        }
    }

    const handleDateFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setDateFilter(new Date(e.target.value))
            if (data) {

                filterClassData({
                    data: data,
                    dateFilter: new Date(e.target.value),
                    gradeFilter: gradeFilter,
                    nameFilter: nameFilter,
                    typeFilter: typeFilter
                })
                    .then(data => {
                        console.log(data)
                        setDataFiltered(data)
                    })
            }
        }
    }

    const grades = [
        {
            id: 0,
            text: "Default",
            value: "",
        },
        {
            id: 1,
            text: "X",
            value: "X",
        },
        {
            id: 2,
            text: "XI",
            value: "XI",
        },
        {
            id: 3,
            text: "XII",
            value: "XII",
        }
    ]

    const types = [
        {
            id: 0,
            text: "Default",
            value: "",
        },
        {
            id: 1,
            text: "Pengumpulan",
            value: "Pengumpulan",
        },
        {
            id: 2,
            text: "Peminjaman",
            value: "Peminjaman",
        },
        {
            id: 3,
            text: "Pengambilan",
            value: "Pengambilan",
        }
    ]

    const handleRecent = (link: string) => {
        localStorage.setItem("recent", link)
    }

    return (
        <main>
            <section className=' my-2'>
                <p className=' text-neutral-400 mb-2'>
                    <i className="bi bi-filter me-2"></i>
                    <span>Filter</span>
                </p>
                <div className=' flex justify-start items-center gap-4'>
                    <Fields label='Cari' icon='search' isDisabled={false} isTime={false} type='' isDataSet={false} defaultValue="" errorMessage='' isError={false}
                        func={handleNameFilter} />
                    <FieldSelect label='Kelas' icon='mortarboard' placeholder='Tingkatan Kelas' datas={grades} name='filter' func={handleGradeFilter} />
                    <FieldSelect label='Tipe' icon='clipboard-check' placeholder='Pilih Tipe' datas={types} name='filter' func={handleTypeFilter} />
                    <Fields label='Tanggal' icon='calendar-event' isDisabled={false} isTime={false} type='date' isDataSet={false} defaultValue="" errorMessage='' isError={false}
                        func={handleDateFilter} />
                </div>
            </section>
            <section>
                <p className=' font-semibold font-mono text-lg lg:text-2xl'>Laporan Gawai</p>
                <table className=' table border-collapse border-spacing-2'>
                    <tbody>
                        <tr>
                            <td className=' text-neutral-400 font-mono text-sm lg:text-lg p-2 lg:p-4'>Kelas</td>
                            <td className=' text-neutral-400 font-mono text-sm lg:text-lg hidden lg:table-cell p-2 lg:p-4'>Wali Kelas</td>
                            <td className=' text-neutral-400 font-mono text-sm lg:text-lg hidden lg:table-cell p-2 lg:p-4'>Guru</td>
                            <td className=' text-neutral-400 font-mono text-sm lg:text-lg p-2 lg:p-4'>Status</td>
                            <td className=' text-neutral-400 font-mono text-sm lg:text-lg p-2 lg:p-4'>Petugas</td>
                            <td className=' text-neutral-400 font-mono text-sm lg:text-lg hidden lg:table-cell p-2 lg:p-4'>Tanggal</td>
                        </tr>
                        {!dataFiltered && (
                            <tr className='  text-xs lg:text-base'>
                                <td className='border border-neutral-200 border-r-0 border-l-0 p-2 lg:p-4'>
                                    <Link href={'/class/'} className=" scale-100 p-2 px-4 rounded-xl shadow transition-all duration-500 hover:scale-150 hover:opacity-60 bg-neutral-400 text-neutral-400">
                                        X-RPL
                                    </Link>
                                </td>
                                <td className='border border-neutral-200 border-r-0 border-l-0 font-semibold hidden lg:table-cell p-2 lg:p-4'>
                                    <div className="text-neutral-400 bg-neutral-400 p-2 px-4 rounded-xl">
                                        Alzaro Rashad Prakas
                                    </div>
                                </td>
                                <td className='border border-neutral-200 border-r-0 border-l-0 hidden lg:table-cell p-2 lg:p-4'>
                                    <div className="text-neutral-400 bg-neutral-400 p-2 px-4 rounded-xl">
                                        <span>Tidak ada</span>
                                    </div>
                                </td>
                                <td className='border border-neutral-200 border-r-0 border-l-0 p-2 lg:p-4'>
                                    <div className="text-neutral-400 bg-neutral-400 p-2 px-4 rounded-xl">
                                        <span>Tidak ada</span>
                                    </div>
                                </td>
                                <td className='border border-neutral-200 border-r-0 border-l-0 capitalize truncate p-2 lg:p-4'>
                                    <div className="text-neutral-400 bg-neutral-400 p-2 px-4 rounded-xl">
                                        syeera dan callylaa
                                    </div>
                                </td>
                                <td className='border border-neutral-200 border-r-0 border-l-0 hidden lg:table-cell p-2 lg:p-4'>
                                    <div className="text-neutral-400 bg-neutral-400 p-2 px-4 rounded-xl">
                                        Senin, 11 Mei 2026
                                    </div>
                                </td>
                            </tr>
                        )}
                        {dataFiltered && dataFiltered.sort((a, b) => a.order - b.order).map((a, index) => {
                            return (
                                <tr key={index} className=' text-xs lg:text-base'>
                                    <td className='border border-neutral-200 border-r-0 border-l-0 p-2 lg:p-4'>
                                        {isAdmin && (
                                            <Link href={`/class/${a._id}/password`} className=" scale-100 p-2 px-4 rounded-xl shadow transition-all duration-500 hover:scale-150 hover:opacity-60"
                                                style={{ backgroundColor: a.colors.subtle_color, color: a.colors.primary_color }}>
                                                {a.grade} {a.name}
                                            </Link>
                                        )}
                                        {!isAdmin && (
                                            <Link href={'/class/' + a._id} className=" scale-100 p-2 px-4 rounded-xl shadow transition-all duration-500 hover:scale-150 hover:opacity-60"
                                                style={{ backgroundColor: a.colors.subtle_color, color: a.colors.primary_color }}
                                                onClick={() => handleRecent('/class/' + a._id)}>
                                                {a.grade} {a.name}
                                            </Link>
                                        )}
                                    </td>
                                    <td className='border border-neutral-200 border-r-0 border-l-0 font-semibold hidden lg:table-cell p-2 lg:p-4'>
                                        {a.teacher_name}
                                    </td>
                                    <td className='border border-neutral-200 border-r-0 border-l-0 hidden lg:table-cell p-2 lg:p-4'>
                                        {a.last_report
                                            ? <p>{a.last_report.teacher}</p>
                                            : <div className=" text-red-600">
                                                <i className="bi bi-exclamation-circle me-2"></i>
                                                <span>Tidak ada</span>
                                            </div>
                                        }
                                    </td>
                                    <td className='border border-neutral-200 border-r-0 border-l-0 p-2 lg:p-4'>
                                        <Statusbox tipe={a.last_report?.report_type} />
                                    </td>
                                    <td className='border border-neutral-200 border-r-0 border-l-0 capitalize max-w-[48dvw] lg:max-w-fit truncate p-2 lg:p-4'>
                                        {a.last_report ? a.last_report.name : "-"}
                                    </td>
                                    <td className='border border-neutral-200 border-r-0 border-l-0 text-neutral-400 hidden lg:table-cell p-2 lg:p-4'>
                                        {a.last_report ? new Date(a.last_report?.createdAt).toLocaleDateString("id-ID", {
                                            dateStyle: "full"
                                        }) : "-"}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                {dataFiltered && dataFiltered.length == 0 && (
                    <div className=' p-4 text-lg text-yellow-600 flex rounded-full w-fit'>
                        <i className=' bi bi-info-circle me-2'></i>
                        <p>Tidak menemukan data, mohon ubah filter atau kriteria</p>
                    </div>
                )}
            </section>
        </main>
    )
}

export default Classreport