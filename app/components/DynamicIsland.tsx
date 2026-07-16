import React, { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { DataClass } from "../class/[id]/page"
import albumImage from "@/public/album.webp"
import dynamic from "next/dynamic"
import Audiocontrol from "./Audiocontrol"

const Clock = dynamic(() => import("./Clock"), { ssr: false })
export interface DynamicIslanInterface {
    isHome: boolean
    data: DataClass | null
    progress?: number
}

const DynamicIsland = ({ isHome, data, progress }: DynamicIslanInterface) => {
    const audioRef = useRef<HTMLAudioElement>(null)

    const [open, setOpen] = useState<boolean>(false)

    const toggleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.currentTarget.id) {
            setOpen(prev => !prev)
        }
    }

    const handleReset = () => {
        window.location.reload()
    }

    return (
        <nav
            id="liquid"
            className={`fixed top-12 left-1/2 -translate-x-1/2 p-4 flex flex-col items-center justify-center
                bg-gray-200/36 backdrop-blur text-neutral-800 cursor-pointer h-fit
                shadow shadow-white border transition-[width,border-radius,padding] duration-500 ease-in-out will-change-[width,border-radius]transform-gpu
                ${open
                    ? "w-[48dvw] rounded-[1.8rem] gap-4 p-4"
                    : isHome
                        ? "w-[24dvw] pb-2 active:scale-95 rounded-4xl"
                        : "w-[24dvw] pb-2 active:scale-95 rounded-[8rem]"
                }`}
            onClick={toggleOpen} style={{ borderColor: data ? data.colors.subtle_color : isHome ? "#fff" : "#450A0A" }}>

            <div className="flex justify-between items-center w-full transition-all duration-500">
                <div className="flex items-center gap-4">
                    <button type="button" className={`w-6 h-6 rounded-full animate-pulse shadow cursor-pointer active:scale-95
                    ${!isHome && !data ? "shadow-red-900" : ""}`} style={{ backgroundColor: data ? data.colors.primary_color : isHome ? "#60a5fa" : "#800000" }}>
                    </button>
                    <span className="font-medium text-sm select-none">Bijak Bergawai</span>
                </div>
                <div className={`flex justify-center items-center text-sm select-none
                ${open
                        ? " text-lg"
                        : " text-sm"}`}
                    style={{ color: data ? data.colors.base_color : isHome ? "#2563eb" : "#450A0A" }}>
                    <i className="bi bi-wifi me-2"></i>
                    <i className="bi bi-reception-3 me-2"></i>
                    <Clock type="hour" />
                </div>
            </div>
            <div
                className={`w-full flex items-center transition-all duration-500 ease-in-out 
                    ${open
                        ? "opacity-100 max-h-16 translate-y-0 justify-between mt-2"
                        : "opacity-0 max-h-0 -translate-y-2 pointer-events-none overflow-hidden justify-between"
                    }`}
            >
                {!isHome && data && (
                    <div className=" flex gap-2 justify-start">
                        <Link href={'/class'}
                            className={`p-2 px-4 rounded-xl border bg-neutral-50 hover:text-white transition-all duration-300 flex items-center`}
                            style={{ borderColor: data.colors.subtle_color, color: data.colors.primary_color }}
                            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                e.currentTarget.style.backgroundColor = data.colors.subtle_color
                            }}
                            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                e.currentTarget.style.backgroundColor = "#ffffff"
                            }}>
                            <i className="bi bi-arrow-left-short"></i>
                        </Link>
                        <Link
                            href="/"
                            className={`p-2 px-4 rounded-xl border bg-neutral-50 hover:text-white transition-all duration-300 flex items-center`}
                            style={{ borderColor: data.colors.subtle_color, color: data.colors.primary_color }}
                            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                e.currentTarget.style.backgroundColor = data.colors.subtle_color
                            }}
                            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                                e.currentTarget.style.backgroundColor = "#ffffff"
                            }}
                            onClick={(e) => e.stopPropagation()}>
                            <span>Home</span>
                        </Link>
                    </div>
                )}
                {data && (
                    <div className="p-2 px-4 rounded-2xl font-semibold"
                        style={{ backgroundColor: data.colors.subtle_color, color: data.colors.primary_color }}>
                        {data.uuid.replace(" ", "-")}
                    </div>
                )}
                {!isHome && !data && (
                    <section className=" flex justify-between items-center w-full">
                        <div className=" flex gap-4 items-center w-[50%]">
                            {albumImage && (
                                <img src={albumImage.src} alt="" className="w-[4dvw] rounded-2xl" />
                            )}
                            <div className=" w-full">
                                <Audiocontrol src="/loveephipany.mp3" />
                            </div>
                        </div>
                        <div className=" flex flex-col justify-between h-full items-end gap-2">
                            <span className=" text-xs text-neutral-400">Dedy As @ XI-RPL</span>
                            <div className=" flex gap-2">
                                <Link href={'/'}
                                    className={`p-2 px-4 rounded-xl border bg-neutral-50 border-neutral-200 hover:text-red-50 hover:bg-red-800 hover:border-neutral-400 
                                        transition-all duration-300 flex items-center`}
                                    onClick={() => handleReset()}>
                                    <i className="bi bi-arrow-left-short"></i>
                                </Link>
                                <Link
                                    href={"/"}
                                    className={`p-2 px-4 rounded-xl border bg-neutral-50 border-neutral-200 hover:text-red-50 hover:bg-red-800 hover:border-neutral-400 
                                    transition-all duration-300 flex items-center`}>
                                    <span>Form</span>
                                </Link>
                            </div>
                        </div>
                    </section>
                )}
                {isHome && (
                    <section className=" justify-between flex w-full">
                        <div className=" flex gap-2 justify-start">
                            <Link href={''}
                                className={`p-2 px-4 rounded-xl border bg-neutral-50 border-neutral-200 hover:text-blue-800 hover:bg-blue-50 hover:border-blue-200 
                                    transition-all duration-300 flex items-center`}
                                onClick={() => handleReset()}>
                                <i className="bi bi-arrow-repeat"></i>
                            </Link>
                            <Link
                                href="/class"
                                className={`p-2 px-4 rounded-xl border bg-neutral-50 border-neutral-200 hover:text-blue-800 hover:bg-blue-50 hover:border-blue-200 
                                transition-all duration-300 flex items-center`}>
                                <span>Class</span>
                            </Link>
                        </div>
                        <div className=" flex flex-col justify-between h-full ">
                            <span className=" text-xs text-neutral-400">Form Pengumpulan Gawai</span>
                        </div>
                    </section>
                )}
            </div>
            {progress !== null && isHome && (
                <div className=" h-2 rounded-full border border-neutral-200 overflow-hidden transition-all duration-500 my-2 w-full">
                    <div className={` h-full ${progress == 100 ? "bg-green-600" : "bg-blue-600"} transition-all duration-500`} style={{ width: `${progress}%` }}></div>
                </div>
            )}
            {!progress && !isHome && (
                <hr className={` mt-2 transition-all duration-500 bg-neutral-400 w-50
                    ${open
                        ? " opacity-0 hidden"
                        : " opacity-100 block"}`} />
            )}
        </nav>
    )
}

export default DynamicIsland