import React from "react"

export interface IFieldProps {
    label: string
    icon: string
    placeholder: string
    datas: customObject[]
    name: string
    func : (e:React.ChangeEvent<HTMLSelectElement>) => void 
}
export interface customObject {
    [key: string]: string | number 
}

export interface Datum {
  _id:          string;
  grade:        Grade;
  name:         string;
  vocation:     Vocation;
  uuid:         string;
  teacher_name: string;
  classroom:    string;
  colors:       Colors;
}

export interface Colors {
  base_color:      string;
  primary_color:   string;
  secondary_color: string;
  subtle_color:    string;
}

export enum Grade {
  X = "X",
  Xi = "XI",
  Xii = "XII",
}

export enum Vocation {
  Informatika = "INFORMATIKA",
}

const FieldSelect = ({ label, icon, placeholder, datas, name, func }: IFieldProps) => {
    return (
        <main className='flex flex-col gap-2'>
            <label htmlFor="" className={`text-blue-600 font-semibold`}>
                <i className={`bi bi-${icon} text-xl me-2`}></i>
                <span>{label}</span>
            </label>
            <select name="" id="" className=' p-2 rounded-lg border border-neutral-300 shadow'
            onChange={(e)=>{func(e)}}>
                <option defaultValue={placeholder} hidden>{placeholder}</option>
                {name == "class" && (
                    datas.map((a, index) => {
                        return (
                            <option value={a._id} key={index}>{a.grade} {a.name}</option>
                        )
                    })
                )}
                {name == "report" && (
                    datas.map((a, index) => {
                        return (
                            <option value={a.text} key={index}>{a.text}</option>
                        )
                    })
                )}
            </select>
            {/* <input type="text" name="" id="" disabled={isDisabled} className=' p-2 rounded-lg border border-neutral-300 shadow' /> */}
        </main>
    )
}

export default FieldSelect