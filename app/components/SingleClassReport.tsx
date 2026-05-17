import { useRef, useState } from 'react';
import ChartElement from './ChartElement';
import Statusbox from './Statusbox'
import ImageModal from './ImageModal';

export interface ISingleClassReport {
    data: DataClass
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
    image: string
}


const SingleClassReport = ({ data }: ISingleClassReport) => {
    const [len, setLen] = useState<number>(7)
    const [photo, setPhoto] = useState<string>()
    const [name, setName] = useState<string>()
    const [type, setType] = useState<string>()
    const [show, setShow] = useState<boolean>(false)

    const toLatestList: Report[] = data?.reports?.toReversed()

    const handleLen = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLen(Number(e.target.value))
    }

    const handleShow = () => {
        setShow(!show)
    }

    const handlePhoto = (img: string,name: string,type: string) => {
        setPhoto(img)
        setName(name)
        setType(type)
        handleShow()
    }
    return (
        <main>
            <table className=' table border-collapse border-spacing-2'>
                <tbody>
                    <tr>
                        <td className=' text-neutral-400 font-mono text-base lg:text-xl p-2 lg:p-4'>Petugas</td>
                        <td className=' text-neutral-400 font-mono text-base lg:text-xl p-2 lg:p-4'>Nama Guru</td>
                        <td className=' text-neutral-400 font-mono text-base lg:text-xl hidden lg:table-cell p-2 lg:p-4'>Tanggal</td>
                        <td className=' text-neutral-400 font-mono text-base lg:text-xl hidden lg:table-cell p-2 lg:p-4'>Jumlah Handphone</td>
                        <td className=' text-neutral-400 font-mono text-base lg:text-xl p-2 lg:p-4'>Status</td>
                        <td className=' text-neutral-400 font-mono text-base lg:text-xl hidden lg:table-cell p-2 lg:p-4'>Foto</td>
                    </tr>
                    {toLatestList.map((a, index) => {
                        return (
                            <tr key={index}>
                                <td className='border border-neutral-200 border-r-0 border-l-0 capitalize p-2 lg:p-4 text-xs lg:text-base'>
                                    {a.name}
                                </td>
                                <td className='border border-neutral-200 border-r-0 border-l-0 font-semibold p-2 lg:p-4 text-xs lg:text-base'>
                                    {a.teacher}
                                </td>
                                <td className='border border-neutral-200 border-r-0 border-l-0 text-neutral-400 hidden lg:table-cell p-2 lg:p-4 text-xs lg:text-base'>
                                    {a ? new Date(a?.createdAt).toLocaleDateString("id-ID", {
                                        dateStyle: "full"
                                    }) : "-"}
                                </td>
                                <td className='border border-neutral-200 border-r-0 border-l-0 text-center hidden lg:table-cell p-2 lg:p-4 text-xs lg:text-base'>
                                    {a.phone} <span className=' text-neutral-400'>/ 36 ({((a.phone / 36) * 100).toFixed(1)}%)</span>
                                </td>
                                <td className='border border-neutral-200 border-r-0 border-l-0 p-2 lg:p-4 text-xs lg:text-base'>
                                    <Statusbox tipe={a.report_type} />
                                </td>
                                <td className='border border-neutral-200 border-r-0 border-l-0 hidden lg:table-cell p-2 lg:p-4 text-xs lg:text-base'>
                                    {a.image && (
                                        <img src={a.image} alt="" className=' h-16 rounded-xl m-2 shadow'
                                            onClick={() => handlePhoto(a.image , a.name , a.report_type)} />
                                    )}
                                    {!a.image && (
                                        <img src={"https://placehold.co/600x400?text=Tidak+Ada+Foto"} alt="" className=' h-16 rounded-xl m-2 shadow' />
                                    )}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <section className=' mt-4'>
                <div className="">
                    <p className=' font-semibold font-mono text-base lg:text-2xl'>
                        <span>Diagram Laporan Gawai</span>
                        <span style={{ color: data?.colors.primary_color }}> {data?.uuid}</span>
                    </p>
                    <div className=" text-xs lg:text-base">
                        <label htmlFor="" className=' text-neutral-400'>Menunjukkan {len} data laporan</label><br />
                        <select name="" id="" onChange={(e) => handleLen(e)} className=' p-1 px-2 pe-4 rounded-lg border my-2'>
                            <option value="default" defaultValue={"default"} hidden>Pilih Jangkauan Data</option>
                            <option value={5}>5 Laporan</option>
                            <option value={7} defaultChecked>7 Laporan</option>
                            <option value={10}>10 Laporan</option>
                            <option value={14}>14 Laporan</option>
                            <option value={28}>28 Laporan</option>
                        </select>
                    </div>
                </div>
                <ChartElement latestData={toLatestList} length={len} kelas={data.uuid} />
            </section>
            {photo && show && name && type && (
                <ImageModal src={photo} func={()=>handleShow()} name={name} type={type} colors={data.colors} uuid={data.uuid}/>
            )}
        </main>
    )
}

export default SingleClassReport