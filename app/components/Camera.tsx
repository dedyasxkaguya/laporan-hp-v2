import { useEffect, useRef, useState } from "react"
import Swal from "sweetalert2"

export interface ICamera {
    func: (photoUrl: string, file: File) => void
    isSubmit: boolean
    submitfunc: () => void
    progress: number
}

const Camera = ({ func, isSubmit, progress, submitfunc }: ICamera) => {
    const [click, setClick] = useState<boolean>(false)
    const [photo, setPhoto] = useState<Blob | null>(null)
    const [image, setImage] = useState<string | null>(null)
    const [bgPos, setBgPos] = useState<number>(0)
    const [bgWidth, setBgWidth] = useState<number>(0)

    const canvas = useRef<HTMLCanvasElement>(null)
    const video = useRef<HTMLVideoElement>(null)
    const btnRef = useRef<HTMLButtonElement>(null)
    const btnRef0 = useRef<HTMLButtonElement>(null)

    const handleCamera = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: 480,
                height: 360
            },
            audio: false
        })
        setTimeout(() => {
            if (video.current) {
                if (stream) {
                    video.current.srcObject = stream
                }
            }
        }, 512);
    }

    const convertFile = (a: Blob, filename: string) => {
        return new File([a], filename, { type: a.type })
    }

    const takePhoto = () => {

        const context = canvas.current?.getContext("2d")
        let imageUrl: string = ""

        if (canvas.current) {
            canvas.current.width = 480
            canvas.current.height = 360
            if (video.current) {
                context?.drawImage(video.current, 0, 0)
                canvas.current.toBlob(a => {
                    if (a) {
                        setPhoto(a)
                        setImage(URL.createObjectURL(a))
                        imageUrl = URL.createObjectURL(a)
                        if (imageUrl) {
                            func(imageUrl, convertFile(a, "image"))
                        }
                        setTimeout(() => {
                            if (btnRef0.current) {
                                setBgWidth(btnRef0.current.offsetWidth)
                                setBgPos(btnRef0.current.offsetLeft - 10)
                            }
                        }, 100);

                    }
                }, 'image/webp')
            }
        }
    }
    useEffect(() => {
        handleCamera()
        if (btnRef.current) {
            setBgWidth(btnRef.current.clientWidth)
            setBgPos(btnRef.current.offsetLeft - 20)
        }
    }, [])

    const showSwal = () => {
        setClick(true)
        setTimeout(() => {
            if (btnRef0.current) {
                setBgWidth(btnRef0.current.offsetWidth)
                setBgPos(btnRef0.current.offsetLeft - 10)
            }
        }, 8);
        Swal.fire({
            icon: "info",
            title: "Wait a second...",
            text: "Fetching our api...",
            toast: true,
            showConfirmButton: false
        })
    }

    return (
        <main className='flex flex-col gap-2 mt-8'>
            <label htmlFor="" className="text-blue-600 font-semibold">
                <i className={`bi bi-person-bounding-box text-xl me-2`}></i>
                <span>Ambil Foto</span>
            </label>
            {!image && (
                <div className="text-neutral-400">
                    <i className="bi bi-x-circle me-2"></i>
                    <span className=''>Belum mengambil gambar</span>
                </div>
            )}
            {image && (
                <div className="text-green-600">
                    <i className="bi bi-check-circle me-2"></i>
                    <span className=''>Sudah mengambil gambar</span>
                </div>
            )}
            <canvas ref={canvas} className=" rounded-2xl " hidden></canvas>
            {image && image !== "" && (
                <section className=" flex flex-col gap-4">
                    <img src={image} alt="Image" width={480} height={360} className=" rounded-4xl shadow" style={{ transform: 'scaleX(-1)' }}>
                    </img>
                    <section className=" p-2 bg-neutral-800/24 rounded-3xl m-2 z-20 relative bottom-22 backdrop-blur flex justify-between">
                        {bgWidth && (
                            <div className=" rounded-2xl bg-neutral-100/48 absolute -z-20 h-[72%] transition-all duration-500 ease-in-out"
                                style={{ width: bgWidth, transform: `translateX(${bgPos}px)` }}>
                            </div>
                        )}

                        <button type='button' className=' p-2 px-4 bg-neutral-100/32 text-neutral-800 rounded-2xl transition-all duration-500 hover:opacity-75 disabled:cursor-not-allowed' disabled>
                            <span>Ambil foto</span>
                            <i className=' bi bi-check mx-2'></i>
                        </button>
                        <button type="button"
                            className={` bg-neutral-100/32 text-neutral-800 rounded-xl p-2 px-4 disabled:opacity-75 transition-all duration-500 cursor-pointer active:scale-95 disabled:cursor-not-allowed hover:opacity-75 ${progress == 100 ? " bg-green-600" : " "} `}
                            disabled={progress == 100 ? false : true}
                            onClick={() => {
                                showSwal()
                                submitfunc()
                            }} ref={btnRef0}>
                            {click && (
                                <span>Tunggu Sebentar ...</span>
                            )}
                            {!click && (
                                <span>Kirim Laporan</span>
                            )}
                            <i className="bi bi-cloud-upload-fill mx-2"></i>
                        </button>
                    </section>
                </section>
            )}
            {!image && (
                <section className=" flex flex-col gap-4">
                    <div className="">
                        <video autoPlay playsInline ref={video} className=" rounded-4xl" style={{ transform: 'scaleX(-1)' }}>
                        </video>
                        <section className=" p-2 bg-neutral-800/24 rounded-3xl m-2 z-20 relative bottom-18 backdrop-blur flex justify-between">

                            {bgWidth && (
                                <div className=" rounded-2xl bg-neutral-100/48 absolute -z-10 h-[72%] transition-all duration-500 ease-in-out"
                                    style={{ width: bgWidth, transform: `translateX(${bgPos}px)` }}>
                                </div>
                            )}

                            <button type='button' className=' p-2 px-4 bg-neutral-100/32 text-neutral-800 rounded-2xl transition-all duration-500 hover:opacity-75'
                                onClick={() => takePhoto()} ref={btnRef}>
                                <span>Ambil Foto</span>
                                <i className=' bi bi-webcam-fill mx-2'></i>
                            </button>

                            {!isSubmit && (
                                <button type="button" className=' bg-neutral-100/32 text-neutral-100 rounded-xl p-2 px-4 disabled:opacity-75 transition-all duration-500 disabled:cursor-not-allowed 
          hover:opacity-75' disabled={progress == 100 ? false : true} onClick={() => submitfunc()}>
                                    <span>Kirim Laporan</span>
                                    <i className="bi bi-cloud-upload-fill mx-2"></i>
                                </button>
                            )}
                        </section>
                    </div>
                </section>
            )}
        </main>
    )
}

export default Camera