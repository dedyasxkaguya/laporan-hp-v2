import React, { useEffect } from 'react'
import Fields from './Fields'
import { Data } from './Classreport';

export interface IClassDetail{
    data:DataClass
}

export interface DataClass {
    _id: string;
    grade: string;
    name: string;
    vocation: string;
    uuid: string;
    teacher_name: string;
    classroom: string;
    colors: Colors;
    reports: Report[];
}

export interface Colors {
    base_color: string;
    primary_color: string;
    secondary_color: string;
    subtle_color: string;
}

export interface Report {
    _id: string;
    name: string;
    student_class: string;
    report_type: string;
    teacher: string;
    phone: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

const Classdetail = ({data}:IClassDetail) => {
    useEffect(()=>{
        console.info(data);
    },[])
    const handleDummy = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
    }
    return (
        <main>
            <section className=' flex gap-2 flex-wrap justify-between'>
                <Fields label='Kelas' icon='mortarboard' isDisabled={true} isDataSet={false} type='text' func={handleDummy} isTime={false} defaultValue={data.uuid} />
                <Fields label='Bidang' icon='book' isDisabled={true} isDataSet={false} type='text' func={handleDummy} isTime={false} defaultValue={data.vocation} />
                <Fields label='Wali Kelas' icon='person-vcard' isDisabled={true} isDataSet={false} type='text' func={handleDummy} isTime={false} defaultValue={data.teacher_name} />
                <Fields label='Ruang Kelas' icon='geo-alt' isDisabled={true} isDataSet={false} type='text' func={handleDummy} isTime={false} defaultValue={data.classroom} />
            </section>
        </main>
    )
}

export default Classdetail