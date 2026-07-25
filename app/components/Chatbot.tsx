import React, { useEffect, useRef, useState } from 'react'
import { DataClass } from '../class/[id]/page'
import { chat_ai } from '../lib/ai_chatbot'
import ReactMarkdown from "react-markdown";
import { spawn } from 'child_process';
export interface ChatbotInterface {
    data: DataClass
}

export interface MessageArrayInterface {
    msg_data: string
    res_data: string
}

const Chatbot = ({ data }: ChatbotInterface) => {

    const placeholder: MessageArrayInterface[] = [
        {
            "msg_data": "hello",
            "res_data": "Halo! Selamat datang di sistem phone-box SMKN 1 Jakarta! Saya siap membantu Anda dengan pertanyaan atau informasi yang Anda butuhkan. Apa yang ingin Anda tanyakan atau lakukan hari ini?"
        },
        {
            "msg_data": "rangkumin plis",
            "res_data": "Halo!😊\n\nRangkuman untuk kelas RPL Anda adalah sebagai berikut:\n\n**Info Kelas**\n\nKelas RPL yang Anda pimpin memiliki nomor urut 6, dengan jurusan informatika. Guru kelas adalah Alzaro Rashad Prakas, S.Tr. Kelas ini berada di ruang R.205.\n\n**Laporan Top 3 Officer**\n\nBerikut adalah top 3 officer dengan laporan yang paling banyak:\n\n1. syeera dan callylaa\n2. fauzan\n3. callyla Sakhi Faiha\n\n**Rata-Rata Phone per Report**\n\nRata-rata phone per report untuk kelas RPL adalah 32,1.\n\n**Tanggapalang Laporan**\n\nBerikut adalah tanggal-tanggal untuk setiap jenis laporan:\n\n- Pengumpulan: 11 Mei 2026 - 23 Juli 2026\n- Pengambilan: 11 Mei 2026 - 23 Juli 2026\n- Peminjaman: 26 Mei 2026 - 23 Juli 2026"
        },
        {
            "msg_data": "nicee",
            "res_data": "Selamat datang, teman! 😊 Saya siap membantu Anda dengan data kelas dan laporan terkini. Apa yang ingin Anda tanyakan atau tahu tentang data ini?"
        }
    ]

    const [open, setOpen] = useState<boolean>(false)
    const [res, setResult] = useState<string>("")
    const [msgArray, setArray] = useState<MessageArrayInterface[]>()
    const [load, setLoad] = useState<boolean>(false)
    const [msg, setMsg] = useState<string>("")

    const charRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const scrollToBottom = () => {
        charRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end"
        })
    }

    const handleOpen = () => {
        setOpen(prev => !prev)
    }

    const handleClick = async () => {
        setArray(prev => [...(prev || []), { msg_data: msg, res_data: "..." }])

        if (inputRef.current) inputRef.current.value = ""

        setLoad(true)

        scrollToBottom()

        chat_ai(msg, data)
            .then(data => {
                if (data) {
                    setResult(data)
                    setLoad(false)
                    setArray(prev => {
                        if (!prev || prev.length === 0) return prev

                        return prev.map((a, index) => {
                            if (index === prev.length - 1) {
                                return { ...a, res_data: a.res_data = data }
                            }
                            return a
                        })

                    }
                    )
                    scrollToBottom()
                }
            })
    }



    useEffect(() => {
        scrollToBottom();
    }, [msgArray, load]);

    const handleMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMsg(e.target.value)
    }

    return (
        <main className={` flex gap-2 flex-col fixed right-8 bottom-24 rounded-4xl p-4 transition-all duration-700 ease-in-out
        ${open
                ? " w-[36dvw] h-[48dvh] bg-neutral-100/64 backdrop-blur"
                : " w-[6dvh] h-[6dvh] bg-transparent"}`}>
            {!open && (
                <button
                    className={` bg-green-600 text-neutral-100 text-2xl p-4 rounded-2xl cursor-pointer duration-500 transition-all hover:scale-95 active:scale-90 w-12 h-12 flex justify-center text-center items-center`}
                    onClick={() => handleOpen()}>
                    {/* <span className=' me-2'>Chatbot</span> */}
                    <i className="bi bi-chat-fill leading-0" style={{ transform: "scaleX(-1)" }}></i>
                </button>
            )}
            {open && (
                <section className=' flex items-center justify-start gap-2'>
                    <button type="button" className=' rounded-full transition-all duration-500 cursor-pointer hover:drop-shadow-xl hover:scale-95 '
                        onClick={() => handleOpen()}>
                        <i className="bi bi-chevron-left"></i>
                    </button>
                    <div className=" w-8 h-8 rounded-full flex justify-center items-center text-center"
                        style={{ backgroundColor: data.colors.subtle_color, color: data.colors.primary_color }}>AI</div>
                    <div className=" flex flex-col">
                        <span>Chatbot {data.uuid}</span>
                        {!load && (
                            <span className=' text-xs text-green-400'>Online</span>
                        )}
                        {load && (
                            <span className=' text-xs text-neutral-400 animate-pulse'>Typing ...</span>
                        )}
                    </div>
                </section>
            )}
            {open && (

                <section className=' h-[40dvh] overflow-y-scroll justify-between w-[34dvw] scroll-m-4'>
                    {load && (
                        <p className=' animate-pulse'>Menunggu jawaban ...</p>
                    )}
                    <section className=' flex flex-col gap-4 mt-4'>
                        {msgArray?.map((a, index) => {
                            return (
                                <div className=" flex flex-col gap-2 " key={index} >
                                    <aside className=" w-full flex justify-end">
                                        <div className=' p-2 bg-neutral-200 rounded-2xl w-fit'>
                                            <ReactMarkdown
                                                components={{
                                                    p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                                                    strong: ({ children }) => (
                                                        <strong className="font-semibold" style={{ color: data.colors.primary_color }}>{children}</strong>
                                                    ),
                                                    ol: ({ children }) => (
                                                        <ol className="list-decimal list-inside my-2 space-y-1 pl-2">{children}</ol>
                                                    ),
                                                    ul: ({ children }) => (
                                                        <ul className="list-disc list-inside my-2 space-y-1 pl-2">{children}</ul>
                                                    ),
                                                    li: ({ children }) => <li className="text-gray-700">{children}</li>,
                                                }}>
                                                {a.msg_data}
                                            </ReactMarkdown>
                                        </div>
                                    </aside>
                                    <div className=' p-2 bg-green-200 rounded-2xl w-fit'>
                                        <ReactMarkdown
                                            components={{
                                                p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                                                strong: ({ children }) => (
                                                    <strong className="font-semibold" style={{ color: data.colors.primary_color }}>{children}</strong>
                                                ),
                                                ol: ({ children }) => (
                                                    <ol className="list-decimal list-inside my-2 space-y-1 pl-2">{children}</ol>
                                                ),
                                                ul: ({ children }) => (
                                                    <ul className="list-disc list-inside my-2 space-y-1 pl-2">{children}</ul>
                                                ),
                                                li: ({ children }) => <li className="text-gray-700">{children}</li>,
                                            }}>
                                            {a.res_data}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            )
                        })}
                        <div className="" ref={charRef}></div>
                    </section>
                </section>

            )}
            {open && (
                <div className="">
                    <div className={` text-xs text-neutral-400 
                        ${open
                            ? " opacity-100"
                            : " opacity-0"}`}>
                        Personalised Chatbot for {data.uuid}
                    </div>
                    <div className=" flex gap-2">
                        <input type="text" className=' w-full bg-neutral-100 border border-neutral-200 rounded-2xl p-4 outline-0' onChange={(e) => handleMessage(e)} ref={inputRef} />
                        <button type="button" className='flex justify-center items-center p-2 px-4 rounded-xl bg-green-200 text-green-600 outline-0 transition-all duration-500 disabled:cursor-not-allowed hover:scale-95 active:scale-90' disabled={load}
                            onClick={() => handleClick()}>
                            <span>Kirim</span>
                            <i className="bi bi-send-fill mx-2"></i>
                        </button>
                    </div>
                </div>
            )}
        </main>
    )
}

export default Chatbot