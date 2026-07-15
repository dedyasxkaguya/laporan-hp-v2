import React from 'react'

const Forbidden = () => {
    return (
        <main className=' flex flex-col justify-center items-center h-dvh gap-4'>
            <div className=" text-center font-mono">
                <p className=' text-neutral-200'>Mohon maaf</p>
                <p className='text-9xl font-black font-sans tracking-tighter bg-linear-to-b from-neutral-200 to-neutral-600 bg-clip-text text-transparent opacity-80 select-none'>
                    403
                </p>
            </div>
            <section className=" p-4 rounded-3xl shadow bg-neutral-900 max-w-[64dvw] text-neutral-100">
                <div className=" p-2 rounded-xl bg-red-600/16 text-red-400 font-semibold mb-4">
                    <i className="bi bi-shield-slash me-2"></i>
                    <span className=' bg-linear-to-t from-red-400 to-red-600 bg-clip-text text-transparent'>Unauthorized access</span>
                </div>
                <div className='font-mono font-light'>
                    <span className=' text-neutral-400 text-sm'>Information : </span>
                    <br />
                    <span className=' text-xl'>You dont have permissions to access this page</span>
                </div>
            </section>
            {/* <Login /> */}
        </main>
    )
}

export default Forbidden