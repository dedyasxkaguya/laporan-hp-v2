import Image from 'next/image'
import Link from 'next/link'
import smk from '../../public/smk.svg'
import { usePathname } from 'next/navigation'

const Navbar = () => {
    const location = usePathname()
    const isHome = location.includes("class") ? false : true
    return (
        <main className=' w-full flex justify-between items-center shadow fixed bg-neutral-200/20 backdrop-blur-xl top-0 right-0 
        p-2 lg:p-4 text-xs lg:text-base' >
            <section className=' '>
                <Link className=" p-2 gap-4 flex items-center rounded-full shadow bg-neutral-50 text-blue-800 transition-all duration-500 
                hover:bg-blue-800 hover:text-neutral-50 text-xs lg:text-base hover:shadow hover:opacity-75 pe-4 lg:pe-8 "
                    href={'/'}>
                    <Image src={smk} alt="" width={32} height={32} />
                    {isHome && (
                        <p className=' font-mono font-semibold drop-shadow-2xl text-base lg:text-xl'>Laporan Pengumpulan Gawai</p>
                    )}
                    {!isHome && (
                        <p className=' font-mono font-semibold drop-shadow-2xl text-base lg:text-xl'>Home</p>
                    )}
                </Link>
            </section>
            <section>
                <div className="">
                    <Link href={'/class'} className=' cursor-pointer hover:opacity-75 bg-blue-800 text-neutral-50 transition-all duration-500 p-2 px-4 
                    rounded-xl text-lg lg:text-2xl '>
                        <span>Class</span>
                        <i className="bi bi-mortarboard mx-2"></i>
                    </Link>
                </div>
            </section>
        </main>
    )
}

export default Navbar