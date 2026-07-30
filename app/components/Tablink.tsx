import Link from 'next/link'
import React from 'react'

interface TabLinkInterface {
    status: string
    link: string
    label: string
    icon: string
    statusReq: string
    func: (e:React.MouseEvent<HTMLAnchorElement>) => void
    func1:() => void
}

const Tablink = ({ status, link, label, icon, statusReq, func, func1 }: TabLinkInterface) => {
    return (
        <Link href={link}
            className={` p-4 rounded-full transition-all duration-300 hover:text-blue-600 group flex items-center relative overflow-hidden ease-in-out
                ${status == statusReq ? " text-blue-800 bg-neutral-50" : ""}`} onMouseEnter={func} onMouseLeave={func1}>
            <i className={`bi bi-${icon} transition-all duration-300 me-2`}></i>
            <span className={`transition-all duration-300
                ${status == statusReq ? "" : "opacity-0 max-w-0 group-hover:opacity-100 group-hover:max-w-32"}`}>
                {label}
            </span>
        </Link>
    )
}

export default Tablink