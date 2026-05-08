import React from 'react'
import Statusbox from './Statusbox'
import { Colors } from './FieldSelect'

export interface ImageModalProps {
    src: string
    func: () => void
    name: string
    type: string
    colors: Colors
    uuid:string
}

const ImageModal = ({ src, func, name, type, colors, uuid }: ImageModalProps) => {
    return (
        <main className=' modalBox p-4 fixed bg-neutral-100/20 items-center justify-center rounded-2xl backdrop-blur shadow border border-neutral-100 flex flex-col gap-4'>
            <section className=' flex justify-between items-center w-full'>
                <div className=" font-semibold font-mono">
                    <i className=" bi bi-info-circle me-2"></i>
                    <span>Foto Petugas</span>
                    <span style={{ color: colors.primary_color }}> {uuid}</span>
                </div>
                <div className="">
                    <button className=' p-2 border rounded-xl bg-neutral-200 border-neutral-400 hover:opacity-75' onClick={func}>
                        <span>Close</span>
                        <i className="bi bi-x-circle mx-2"></i>
                    </button>
                </div>
            </section>
            <section>
                {src && (
                    <img src={src} alt="" className=' rounded-2xl' />
                )}
                {!src && (
                    <img src="https://placehold.co/600x400?text=Tidak+Ada+Foto" alt="" className=' rounded-2xl' />
                )}
            </section>
            <section className=' flex justify-between w-full'>
                <div className=" p-2 px-4 rounded-xl shadow" style={{ backgroundColor: colors.subtle_color, color: colors.primary_color }}>
                    <p>{name}</p>
                </div>
                <Statusbox tipe={type} />
            </section>
        </main>
    )
}

export default ImageModal