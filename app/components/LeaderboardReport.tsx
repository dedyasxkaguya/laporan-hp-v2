import React, { useEffect, useRef, useState } from 'react'
import { LeaderboardDataI } from '../leaderboard/page'
import axios from 'axios'

interface LeaderboardReportI {
    data: LeaderboardDataI[]
}

const LeaderboardReport = ({ data }: LeaderboardReportI) => {

    const [tableWidth, setTableWidth] = useState<number>(0)
    const [topPoint, setTopPoint] = useState<number>(0)
    const [dataSort, setDataSort] = useState<LeaderboardDataI[]>()

    const [isPointSort, setPointSort] = useState<boolean>(true)
    const [isCollectSort, setCollectSort] = useState<boolean>(false)
    const [isBorrowSort, setBorrowSort] = useState<boolean>(false)
    const [isTakeSort, setTakeSort] = useState<boolean>(false)

    const [isPointSortAsc, setPointSortAsc] = useState<boolean>(false)
    const [isCollectSortAsc, setCollectSortAsc] = useState<boolean>(false)
    const [isBorrowSortAsc, setBorrowSortAsc] = useState<boolean>(false)
    const [isTakeSortAsc, setTakeSortAsc] = useState<boolean>(false)

    const tableref = useRef<HTMLTableElement>(null)

    useEffect(() => {
        console.log(data)
        axios.get("/")
            .then(() => {
                setTopPoint(data[0].stats.points)
                setDataSort(data)
                if (tableref.current) setTableWidth(tableref.current.clientWidth)
            })
    }, [])

    const handlePointSort = () => {
        if (isPointSort) {
            const updated = data.sort((a, b) => a.stats.points - b.stats.points)
            setDataSort(updated)
            setPointSortAsc(true)
        } else {
            const updated = data.sort((a, b) => b.stats.points - a.stats.points)
            setDataSort(updated)
            setPointSortAsc(false)
        }
        setPointSort(prev => !prev)
        setCollectSort(false)
        setBorrowSort(false)
        setTakeSort(false)
        setCollectSortAsc(false)
        setBorrowSortAsc(false)
        setTakeSortAsc(false)
    }

    const handleCollectSort = () => {
        if (isCollectSort) {
            const updated = data.sort((a, b) => a.stats.collectValue - b.stats.collectValue)
            setCollectSortAsc(true)
            setDataSort(updated)
        } else {
            const updated = data.sort((a, b) => b.stats.collectValue - a.stats.collectValue)
            setDataSort(updated)
            setCollectSortAsc(false)
        }
        setCollectSort(prev => !prev)
        setPointSort(false)
        setBorrowSort(false)
        setTakeSort(false)
        setPointSortAsc(false)
        setBorrowSortAsc(false)
        setTakeSortAsc(false)
    }

    const handleBorrowSort = () => {
        if (isBorrowSort) {
            const updated = data.sort((a, b) => a.stats.borrowValue - b.stats.borrowValue)
            setDataSort(updated)
            setBorrowSortAsc(true)
        } else {
            const updated = data.sort((a, b) => b.stats.borrowValue - a.stats.borrowValue)
            setDataSort(updated)
            setBorrowSortAsc(false)
        }
        setBorrowSort(prev => !prev)
        setPointSort(false)
        setCollectSort(false)
        setTakeSort(false)
        setPointSortAsc(false)
        setCollectSortAsc(false)
        setTakeSortAsc(false)
    }

    const handleTakeSort = () => {
        if (isTakeSort) {
            const updated = data.sort((a, b) => a.stats.takeValue - b.stats.takeValue)
            setTakeSortAsc(true)
            setDataSort(updated)
        } else {
            const updated = data.sort((a, b) => b.stats.takeValue - a.stats.takeValue)
            setDataSort(updated)
            setTakeSortAsc(false)
        }
        setTakeSort(prev => !prev)
        setPointSort(false)
        setBorrowSort(false)
        setCollectSort(false)
        setPointSortAsc(false)
        setBorrowSortAsc(false)
        setCollectSortAsc(false)
    }

    return (
        <main>
            <div className=" mx-auto p-2" style={{ width: tableWidth }}>
                <p>
                    <span className=' me-2 text-neutral-400'>Filtered by</span>
                    {isPointSort && (
                        <span>
                            Point
                            <i className="bi bi-sort-down mx-2"></i>
                        </span>
                    )}
                    {isPointSortAsc && (
                        <span>
                            Point
                            <i className="bi bi-sort-up mx-2"></i>
                        </span>
                    )}
                    {isCollectSort && (
                        <span>
                            Pengumpulan
                            <i className="bi bi-sort-down mx-2"></i>
                        </span>
                    )}
                    {isCollectSortAsc && (
                        <span>
                            Pengumpulan
                            <i className="bi bi-sort-up mx-2"></i>
                        </span>
                    )}
                    {isBorrowSort && (
                        <span>
                            Peminjaman
                            <i className="bi bi-sort-down mx-2"></i>
                        </span>
                    )}
                    {isBorrowSortAsc && (
                        <span>
                            Peminjaman
                            <i className="bi bi-sort-up mx-2"></i>
                        </span>
                    )}
                    {isTakeSort && (
                        <span>
                            Pengambilan
                            <i className="bi bi-sort-down mx-2"></i>
                        </span>
                    )}
                    {isTakeSortAsc && (
                        <span>
                            Pengambilan
                            <i className="bi bi-sort-up mx-2"></i>
                        </span>
                    )}
                </p>
            </div>
            <table className=' mx-auto' border={1} ref={tableref}>
                <thead>
                    <tr className=''>
                        <th className=' p-4 cursor-pointer group'>
                            <span className=' font-mono font-light'>Rank</span>
                        </th>
                        <th className=' p-4 cursor-pointer group'>
                            <span className=' font-mono font-light'>Tingkat</span>
                        </th>
                        <th className=' p-4 cursor-pointer group'>
                            <span className=' font-mono font-light'>Kelas</span>
                        </th>
                        <th className=' p-4 group'>
                            <button type='button' className=' cursor-pointer' onClick={() => handleCollectSort()}>
                                <span className=' font-mono font-light'>Pengumpulan</span>
                                <i className="bi bi-chevron-down mx-2 opacity-0 group-hover:opacity-100 transition-all duration-500"></i>
                            </button>
                        </th>
                        <th className=' p-4 group'>
                            <button type='button' className=' cursor-pointer' onClick={() => handleBorrowSort()}>
                                <span className=' font-mono font-light'>Peminjaman</span>
                                <i className="bi bi-chevron-down mx-2 opacity-0 group-hover:opacity-100 transition-all duration-500"></i>
                            </button>
                        </th>
                        <th className=' p-4 group'>
                            <button type='button' className=' cursor-pointer' onClick={() => handleTakeSort()}>
                                <span className=' font-mono font-light'>Pengumpulan</span>
                                <i className="bi bi-chevron-down mx-2 opacity-0 group-hover:opacity-100 transition-all duration-500"></i>
                            </button>
                        </th>
                        <th className=' p-4 group'>
                            <button type="button" className=' cursor-pointer' onClick={() => handlePointSort()}>
                                <span className=' font-mono font-light'>Poin Total</span>
                                <i className="bi bi-chevron-down mx-2 opacity-0 group-hover:opacity-100 transition-all duration-500"></i>
                            </button>
                        </th>
                        <th className=' p-4 group'>
                            <button type="button" className=' cursor-pointer'>
                                <span className=' font-mono font-light'>Progress</span>
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {dataSort?.map((a, index) => {
                        return (
                            <tr key={index} className=' border border-x-0 border-neutral-200'>
                                <td className=' p-4 font-bold text-center'>
                                    {index + 1}
                                </td>
                                <td className=' p-4 text-center'>{a.grade}</td>
                                <td className=' p-4 text-center'>{a.name}</td>
                                <td className=' p-4'>
                                    <div className=" bg-blue-50 text-blue-600 p-2 px-6 w-fit rounded-xl mx-auto cursor-pointer">
                                        {a.stats.collectValue.toString().length < 2
                                            ? `0${a.stats.collectValue.toString()}`
                                            : a.stats.collectValue.toString()}
                                    </div>
                                </td>
                                <td className=' p-4'>
                                    <div className=" bg-amber-50 text-amber-600 p-2 px-6 w-fit rounded-xl mx-auto cursor-pointer">
                                        {a.stats.borrowValue.toString().length < 2
                                            ? `0${a.stats.borrowValue.toString()}`
                                            : a.stats.borrowValue.toString()}
                                    </div>
                                </td>
                                <td className=' p-4'>
                                    <div className=" bg-green-50 text-green-600 p-2 px-6 w-fit rounded-xl mx-auto cursor-pointer">
                                        {a.stats.takeValue.toString().length < 2
                                            ? `0${a.stats.takeValue.toString()}`
                                            : a.stats.takeValue.toString()}
                                    </div>
                                </td>
                                <td className={`p-4 text-center font-semibold
                                            ${a.stats.points == 0
                                        ? " text-red-600"
                                        : ""}`}>
                                    <span>{a.stats.points} Pts</span>
                                </td>
                                <td className=' p-4 text-center'>
                                    {topPoint !== 0 && topPoint !== a.stats.points && (
                                        // <div className=" p-2 px-6 text-center bg-green-50 text-green-600 rounded-full">
                                        //     {((a.stats.points / topPoint) * 100).toFixed(2)}%
                                        // </div>
                                        <aside className=' flex justify-start items-center gap-4'>
                                            <div className=" h-8 w-24 border border-green-200 rounded-full overflow-hidden">
                                                <div className={` h-full bg-green-600`}
                                                    style={{ width: `${((a.stats.points / topPoint) * 100).toFixed(2)}%` }}></div>
                                            </div>
                                            <span>{((a.stats.points / topPoint) * 100).toFixed(2)}%</span>
                                        </aside>
                                    )}
                                    {topPoint !== 0 && topPoint == a.stats.points && (
                                        <div className="">
                                            {a.uuid} ON TOP 😎
                                        </div>
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </main>
    )
}

export default LeaderboardReport