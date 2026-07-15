import React, { useEffect, useRef, useState } from 'react'
import Statusbox from './Statusbox'
import { Colors } from './FieldSelect'

export interface ImageModalProps {
    src: string
    func: () => void
    name: string
    type: string
    colors: Colors
    uuid: string
}

const ImageModal = ({ src, func, name, type, uuid }: ImageModalProps) => {

    const nameRef = useRef<HTMLButtonElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const [bgWidth, setBgWidth] = useState<number>(0)
    const [bgPos, setBgPos] = useState<number>(0)
    useEffect(() => {
        if (nameRef.current) {
            setBgWidth(nameRef.current.offsetWidth)
        }
    }, [])

    const handleTabClick = (e:React.MouseEvent<HTMLButtonElement>, isNameTab = false) => {
        const clickedElement = e.currentTarget;

        if (isNameTab) {
            nameRef.current?.classList.add("activeBar");
            if (clickedElement) {
                setBgPos(Number(clickedElement.offsetLeft - 7));
                setBgWidth(Number(clickedElement.offsetWidth));
            }
        } else {
            if (clickedElement) {
                setBgPos(Number(clickedElement.offsetLeft - 7));
                setBgWidth(Number(clickedElement.offsetWidth));
            }
            nameRef.current?.classList.remove("activeBar");
        }
    };

    return (
        <main className=' modalBox p-2 fixed bg-neutral-100/20 items-center justify-center rounded-4xl backdrop-blur shadow border border-neutral-100 flex flex-col gap-4 w-[36dvw]'>
            <section className=' flex justify-center items-center relative w-[40dvw]'>
                <div className=" rounded-4xl bg-neutral-800/24 backdrop-blur absolute z-80 top-4 flex justify-between items-center p-2 w-[80%]z">
                    <div className=" font-semibold font-mono p-2 rounded-3xl text-neutral-100">
                        <i className=" bi bi-info-circle me-2"></i>
                        <span className=' me-2'>Foto Petugas</span>
                        <span>{uuid}</span>
                    </div>
                    <div className="">
                        <button className='group p-2 rounded-full hover:opacity-75 active:scale-95 duration-500 transition-all flex items-center overflow-hidden bg-neutral-100/64'
                            onClick={func}>
                            <span>Close</span>
                            <i className="bi bi-x-circle mx-2 text-2xl"></i>
                        </button>
                    </div>
                </div>
                {src && (
                    <img src={src} alt="" className=' rounded-4xl w-full' />
                )}
                {!src && (
                    <img src="https://placehold.co/600x400?text=Tidak+Ada+Foto" alt="" className=' rounded-2xl' />
                )}
                <div className=" rounded-full bg-neutral-100/20 backdrop-blur absolute z-80 bottom-4 flex justify-between items-center p-2  w-[80%]">
                    {bgWidth && (
                        <div
                            className="h-[72%] absolute bg-neutral-100/48 -z-10 rounded-full transition-all duration-500 ease-in-out"
                            style={{
                                width: bgWidth,
                                transform: `translateX(${bgPos}px)`
                            }}
                        />
                    )}
                    <button className=" p-2 px-4 rounded-3xl cursor-pointer capitalize text-neutral-200 text-xl font-mono activeBar transition-all duration-500
                    border border-neutral-100/24 backdrop-blur bg-neutral-800/24 active:scale-90" ref={nameRef}
                        onClick={(e) => { handleTabClick(e, true) }}>
                        <p>{name}</p>
                    </button>

                    <button className=" p-2 rounded-full border border-neutral-800/24 backdrop-blur active:scale-90 transition-all duration-500"
                        onClick={(e) => { handleTabClick(e, false) }} ref={buttonRef}>
                        <Statusbox tipe={type} />
                    </button>
                </div>
            </section>
        </main>
    )
}

export default ImageModal