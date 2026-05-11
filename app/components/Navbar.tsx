import Image from 'next/image'
import Link from 'next/link'
import smk from '../../public/smk.svg'

const Navbar = () => {
    return (
        <main className=' w-full p-4 flex justify-between items-center shadow fixed bg-neutral-200/20 backdrop-blur-xl top-0 right-0' >
            <section className=' '>
                <Link className=" p-2 gap-4 flex items-center rounded-full pe-8 shadow bg-neutral-50" href={'/'}>
                    <Image src={smk} alt="" width={32} height={32}/>
                    <p className=' font-mono font-semibold text-blue-800 text-xl drop-shadow-2xl'>Laporan Pengumpulan Gawai</p>
                </Link>
            </section>
            <section>
                <div className="">
                    <Link href={'/class'} className=' cursor-pointer hover:opacity-75 text-blue-800 text-2xl '>
                        Class
                    </Link>
                </div>
            </section>
        </main>
    )
}

export default Navbar