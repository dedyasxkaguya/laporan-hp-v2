import React, { useState } from 'react'

export interface ClockInterface {
    type: string
}

const Clock = ({ type }: ClockInterface) => {
    const [time, setTime] = useState<Date>(new Date())

    setInterval(() => {
        setTime(new Date())
    }, 1000);

    const handleDigit = (a:number)=> {
        if(a.toString().length == 2){
            return a.toString()
        }else{
            return `0${a}`
        }
    }

    return (
        <div className=" font-light">
            {type == "hour" && (
                <div>
                    <span>
                        {handleDigit(time.getHours())}
                    </span>
                    <span>
                        :
                    </span>
                    <span>
                        {handleDigit(time.getMinutes())}
                    </span>
                    <span>
                        :
                    </span>
                    <span>
                        {handleDigit(time.getSeconds())}
                    </span>
                </div>
            )}
        </div>
    )
}

export default Clock