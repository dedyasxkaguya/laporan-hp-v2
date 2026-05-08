import React, { useState } from 'react'

export interface IFieldProps {
  label: string
  icon: string
  isDisabled: boolean
  isTime: boolean
  func: (e: React.ChangeEvent<HTMLInputElement>) => void
  type: string
  isDataSet: ICustomObject[] | false
  defaultValue: string | false
}
export interface ICustomObject {
  [key: string]: string | number
  [key: number]: string
}
const Fields = ({ label, icon, isDisabled, func, isTime, type, isDataSet, defaultValue }: IFieldProps) => {
  const [date, setDate] = useState<string>()
  const [time, setTime] = useState<string>()
  if (isTime) {
    setInterval(() => {

      const dateNow = new Date().toLocaleDateString("id-ID", {
        dateStyle: 'long'
      }).toString();
      setDate(dateNow)
      const timeNow = new Date().toLocaleDateString("id-ID", {
        hour: '2-digit',
        minute: "2-digit",
        second: '2-digit',
      }).split(",")[1].toString()
      setTime(timeNow)

    }, 1000)
    return (
      <main className='flex flex-col gap-2'>
        <label htmlFor="" className={`${isDisabled ? "text-neutral-400" : "text-blue-600"} font-semibold`}>
          <i className={`bi bi-${icon} text-xl me-2`}></i>
          <span>{label}</span>
        </label>
        {type == "text" && (
          <input type="text" name="" disabled={isDisabled} className=' p-2 rounded-lg border border-neutral-300 shadow disabled:bg-neutral-200 disabled:cursor-not-allowed' onChange={(e) => func(e)} value={`${date} ${time}`} />
        )}

        {type == "number" && (
          <input type="number" max={36} min={1} name="" disabled={isDisabled} className=' p-2 rounded-lg border border-neutral-300 shadow 
          disabled:bg-neutral-200 disabled:cursor-not-allowed' onChange={(e) => func(e)} value={`${date} ${time}`} />
        )}
      </main>
    )
  }
  if (type == "number") {
    return (
      <main className='flex flex-col gap-2'>
        <label htmlFor="" className={`${isDisabled ? "text-neutral-400" : "text-blue-600"} font-semibold`}>
          <i className={`bi bi-${icon} text-xl me-2`}></i>
          <span>{label}</span>
        </label>
        <input type="number" name="" disabled={isDisabled} className=' p-2 rounded-lg border border-neutral-300 shadow disabled:bg-neutral-200 disabled:cursor-not-allowed' onChange={(e) => func(e)} max={36} min={1} />
      </main>
    )
  }
  if (defaultValue) {
    return (
      <main className='flex flex-col gap-2'>
        <label htmlFor="" className={`${isDisabled ? "text-neutral-400" : "text-blue-600"} font-semibold`}>
          <i className={`bi bi-${icon} text-xl me-2`}></i>
          <span>{label}</span>
        </label>
        <input type="text" name="" disabled={isDisabled} className=' p-2 rounded-lg border border-neutral-300 shadow disabled:bg-neutral-200 disabled:cursor-not-allowed'
          onChange={(e) => func(e)} list={isDataSet ? "dataList" : ""} value={defaultValue} />
        {isDataSet && (
          <datalist id='dataList'>
            this is funny
            {isDataSet.map((a, index) => {
              return (
                <option value={a.name} key={index}>{a.name}</option>
              )
            })}
          </datalist>
        )}
      </main>
    )
  }
  return (
    <main className='flex flex-col gap-2'>
      <label htmlFor="" className={`${isDisabled ? "text-neutral-400" : "text-blue-600"} font-semibold`}>
        <i className={`bi bi-${icon} text-xl me-2`}></i>
        <span>{label}</span>
      </label>
      <input type="text" name="" disabled={isDisabled} className=' p-2 rounded-lg border border-neutral-300 shadow disabled:bg-neutral-200 disabled:cursor-not-allowed' onChange={(e) => func(e)} list={isDataSet ? "dataList" : ""} />
      {isDataSet && (
        <datalist id='dataList'>
          this is funny
          {isDataSet.map((a, index) => {
            return (
              <option value={a.name} key={index}>{a.name}</option>
            )
          })}
        </datalist>
      )}
    </main>
  )
}

export default Fields