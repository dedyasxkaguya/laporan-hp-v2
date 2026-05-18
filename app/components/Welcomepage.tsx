import React, { useEffect, useState } from 'react'

const Welcomepage = ({ func }: { func: () => void }) => {
    const [progress, setProgress] = useState<number>()
    const [isLoad,setLoad] = useState<boolean>(false)
    setTimeout(() => {
        setLoad(true)
    }, 2120);
    useEffect(() => {
        let timer = 50
        const duration = 50
        const interv = setInterval(() => {
            if (timer > 0) {
                timer -= 1
                setProgress((duration - timer) * (100 / duration))
            } else {
                clearInterval(interv)
                setTimeout(() => {
                    func()
                }, 500);
            }
        }, 100)
        return () => { clearInterval(interv) }
    }, [func])
    return (
        <main className=' w-dvw h-dvh bg-neutral-100/90 backdrop-blur-md z-40 fixed flex justify-center items-center flex-col gap-4'>
            <section className=' fade-up duration-500 transition-all flex justify-center items-center flex-col relative'>
                <div className="w-48 h-48 rounded-4xl bg-linear-210 from-blue-200 to-blue-600 flex justify-center items-center text-white">
                    <i className="bi bi-phone text-9xl"></i>
                </div>
                <p className=' text-2xl text-neutral-400 font-mono font-light'>Bijak bergawai</p>
                {progress && (
                    <section className=' flex flex-col gap-4 w-[24dvw] justify-center items-center' style={{ opacity:isLoad ? '1' : 0 }}>
                        <div className={`rounded-2xl w-full overflow-hidden bg-neutral-200 mt-8`}>
                            <div className={` p-1 ${progress == 100 ? "bg-green-600 border-green-600" : "bg-blue-600 border-blue-600"} border transition-all duration-500 text-center 
              text-neutral-50 ${progress > 1 ? "opacity-100" : "opacity-0"}`} style={{ width: `${progress}%` }}></div>
                        </div>
                        <p className={`${progress == 100 ? "text-green-600" : "text-neutral-200"}`}>
                            {progress}%
                        </p>
                    </section>
                )}
            </section>
        </main>
    )
}

export default Welcomepage