import React from 'react'
import { Colors } from './FieldSelect'

export interface NoteModalProps {
    func: () => void
    name: string
    colors: Colors
    uuid: string
}

const NoteModal = ({ func, name, colors, uuid }: NoteModalProps) => {
    return (
        <main className=' modalBox p-4 fixed bg-neutral-100/24 items-center justify-center rounded-4xl backdrop-blur shadow border border-neutral-100 flex flex-col gap-4'>
            <section className=' flex justify-between items-center w-full gap-8'>
                <div className=" font-semibold font-mono">
                    <i className=" bi bi-info-circle me-2"></i>
                    <span>Catatan Peminjaman</span>
                    <span style={{ color: colors.primary_color }}> {uuid}</span>
                </div>
                <div className="">
                    <button className='group p-2 rounded-full hover:opacity-75 active:scale-95 duration-500 transition-all flex items-center overflow-hidden' onClick={func}>
                        <i className="bi bi-x-circle mx-2 text-2xl bg-white cursor-pointer"></i>
                        {/* <span className='relative left-12 opacity-0 group-hover:left-0 group-hover:opacity-100 duration-500 transition-all'>
                            Close
                        </span> */}
                    </button>
                </div>
            </section>
            <section>
                <p>``blablablbablablablabalblabla``</p>
            </section>
            <section className=' flex justify-between w-full items-center'>
                <div className=" p-2 px-4 rounded-xl shadow cursor-pointer bg-neutral-100">
                    <p>{name}</p>
                </div>
                <div className="cursor-pointer text-neutral-400 font-light">
                    <p>Smth July 2026</p>
                </div>
            </section>
        </main>
    )
}

export default NoteModal 