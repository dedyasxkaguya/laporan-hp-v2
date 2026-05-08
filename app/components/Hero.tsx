
const Hero = () => {
    return (
        <main className=" flex flex-col gap-4">
            <p className=" text-4xl font-light font-mono">
                Halo, <span className=" text-blue-600 font-semibold font-sans">Selamat Datang</span>
            </p>
            <div className="p-2 px-6 rounded-full text-sm text-blue-600 bg-blue-200 w-fit ">
                <p className="m-0 font-semibold">#BijakBergawai</p>
            </div>
            <hr className=" text-blue-400 "/>
        </main>
    )
}

export default Hero