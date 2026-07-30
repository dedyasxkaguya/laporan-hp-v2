import React from 'react'
import { LeaderboardDataI } from '../leaderboard/page'

interface LeaderboardboxInterface {
    data: LeaderboardDataI
    place: number
}

const Leaderboardbox = ({ data, place }: LeaderboardboxInterface) => {
    return (
        <div className={`second border p-2 rounded-3xl flex flex-col items-center 
        ${place == 1
                ? "w-48 h-88"
                : place == 2
                    ? "w-48 h-72"
                    : "w-48 h-64"}`}
            style={{ backgroundColor: `${data.colors.subtle_color}40`, borderColor: data.colors.primary_color }}>
            <div className=" w-full flex justify-start">
                <div className=' p-2 rounded-full flex justify-start items-center w-fit'
                    style={{ backgroundColor: data.colors.subtle_color, color: data.colors.primary_color }}>
                    <i className=' text-[16px] bi bi-award-fill me-2'></i>
                    {place == 1 && (
                        <span className=' text-[12px] '>1st Position</span>
                    )}
                    {place == 2 && (
                        <span className=' text-[12px] '>2nd Position</span>
                    )}
                    {place == 3 && (
                        <span className=' text-[12px] '>3rd Position</span>
                    )}
                </div>
            </div>
            <div className=' w-16 h-16 flex justify-center flex-col items-center rounded-full shadow mt-12'
                style={{ backgroundColor: data.colors.subtle_color, color: data.colors.primary_color }}>
                {data.uuid}
            </div>
            <div className=' mt-4 p-2 px-6 rounded-full shadow'
                style={{ backgroundColor: `${data.colors.subtle_color}60`, color: data.colors.primary_color }}>
                {data.stats.points} Pts.
            </div>
        </div>
    )
}

export default Leaderboardbox