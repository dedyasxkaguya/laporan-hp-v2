import React, { useState } from 'react'
import Tablink from './Tablink'

interface TabInterface {
    status: statusEnum
}

export enum statusEnum {
    home = "home",
    class = "class",
    leaderboard = "leaderboard",
    form = "form"
}

const Tabs = ({ status }: TabInterface) => {

    const [width, setWidth] = useState<number>(0)
    const [height, setHeight] = useState<number>(0)
    const [left, setLeft] = useState<number>(0)
    const [show, setShow] = useState<boolean>(false)

    const recentLink = typeof window !== 'undefined'
        ? localStorage.getItem("recent")
        : null;

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        setShow(true)
        const target = e.currentTarget
        setHeight(target.offsetHeight - 24)

        setTimeout(() => {
            setLeft(target.offsetLeft - 8)
            setWidth(target.offsetWidth)
            setHeight(target.offsetHeight)
        }, 200);

        console.log('seharusnya berubah')
    }

    const handleLeave = () => {
        setShow(false)
    }

    return (
        <main className=' p-2 rounded-full bg-neutral-100/2 backdrop-blur-lg w-fit h-fit fixed bottom-16 mx-auto fixed-center flex justify-between items-center gap-8 border border-neutral-200'>
            {show && (
                <div className={` absolute bg-neutral-400/12 rounded-full left-2 transition-all duration-500 pointer-none`}
                    style={{ width: `${width}px`, height: `${height}px`, transform: `translateX(${left}px)` }}></div>
            )}
            <Tablink status={status} link='/' label='Home' icon='house' statusReq={statusEnum.home} func={handleClick} func1={handleLeave} />
            <Tablink status={status} link='/class' label='Class' icon='mortarboard' statusReq={statusEnum.class} func={handleClick} func1={handleLeave} />
            <Tablink status={status} link={recentLink ? recentLink : '/class/6a53cf194f9f26a036f45cc1'}
                label='Recent' icon='clock-history' statusReq={statusEnum.form} func={handleClick} func1={handleLeave} />
            <Tablink status={status} link='/leaderboard' label='Leaderboard' icon='trophy-fill' statusReq={statusEnum.leaderboard} func={handleClick} func1={handleLeave} />
        </main>
    )
}

export default Tabs