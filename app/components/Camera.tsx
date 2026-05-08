import { useEffect, useRef, useState } from "react"

export interface ICamera {
    func: (photoUrl: string, file: File) => void
}

const Camera = ({ func }: ICamera) => {
    const [photo, setPhoto] = useState<Blob | null>(null)
    const [image, setImage] = useState<string | null>(null)
    const canvas = useRef<HTMLCanvasElement>(null)
    const video = useRef<HTMLVideoElement>(null)
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
                            func(imageUrl, convertFile(a,"image"))
                        }
                    }
                }, 'image/webp')
            }
        }
    }
    useEffect(() => {
        handleCamera()
    }, [])
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
                    <img src={image} alt="Image" width={480} height={360} className=" rounded-2xl shadow" style={{ transform: 'scaleX(-1)' }} />
                    {/* <button type='button' className=' p-2 px-4 bg-blue-600 text-neutral-100 w-fit rounded-lg'
                        onClick={() => takePhoto()}>
                        <span>Foto Ulang</span>
                        <i className=' bi bi-webcam-fill mx-2'></i>
                    </button> */}
                </section>
            )}
            {!image && (
                <section className=" flex flex-col gap-4">
                    <video autoPlay playsInline ref={video} className=" rounded-2xl" style={{ transform: 'scaleX(-1)' }}></video>
                    <button type='button' className=' p-2 px-4 bg-blue-600 text-neutral-100 rounded-xl transition-all duration-500 hover:opacity-75'
                        onClick={() => takePhoto()}>
                        <span>Ambil Foto</span>
                        <i className=' bi bi-webcam-fill mx-2'></i>
                    </button>
                </section>
            )}
        </main>
    )
}

export default Camera