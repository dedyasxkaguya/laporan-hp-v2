import React, { useEffect, useRef, useState } from 'react'

export interface AudioInterface {
    src: string
}

const Audiocontrol = ({ src }: AudioInterface) => {
    const audioRef = useRef<HTMLAudioElement>(null)

    const [percentage, setPercentage] = useState<number>(0)
    const [isPaused, setPaused] = useState<boolean>(false)

    const setPlay = () => {
        setPaused(prev => !prev)
        handleButton()
    }

    useEffect(() => {
        setInterval(() => {
            if (audioRef.current) {
                const current: number = Number(audioRef.current.currentTime.toFixed(0))
                const total: number = Number(audioRef.current.duration.toFixed(0))
                setPercentage((current / total) * 100)
            }
        }, 100);
    }, [])

    const handleButton = () => {
        if (!isPaused) {
            if (audioRef.current) {
                audioRef.current.play()
            }
        } else {
            if (audioRef.current) {
                audioRef.current.pause()
            }
        }
    }

    return (
        <main className=' flex flex-col gap-2 h-full'>
            <audio src={src} ref={audioRef} hidden></audio>
            <div className=" flex gap-4">
                <button onClick={() => setPlay()} className=' h-6 w-6 bg-neutral-800 rounded-full'>
                    {isPaused
                        ? <i className="bi bi-pause-fill text-neutral-100"></i>
                        : <i className="bi bi-play-fill text-neutral-100"></i>}
                </button>
                <span>Just Some Song</span>
            </div>
            <div className=" w-full h-2 rounded-full border border-neutral-400 overflow-hidden">
                <div className=" h-full bg-black" style={{ width: `${percentage}%` }}></div>
            </div>
        </main>
    )
}

export default Audiocontrol