'use client'
import Hero from './components/Hero'
import Form from './components/Form'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { checkDevice } from './components/check'
import Forbidden from './components/Error/Forbidden'
import Lenis from 'lenis'
const Page = () => {
  const [isAndroid, setCheckOS] = useState<boolean>()
  const [scroll, setScroll] = useState<number>(0)
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      duration: 1.5
    })
    lenis.start()
    lenis.on("scroll", (e) => {
      setScroll(e.progress !== 0 ? e.progress : .1)
    })
    axios.get("/api")
      .then(data => {
        console.log(data.data)
        const os = checkDevice()
        if (os && os?.toLowerCase() == "android") {
          setCheckOS(true)
        } else {
          setCheckOS(false)
        }
      })
  }, [])
  if (isAndroid) {
    return (
      <Forbidden />
    )
  } else {
    return (
      <>
        <section className=' w-dvw flex items-center justify-center'>
          <Navbar isGlass={scroll > .1 ? true : false } />
        </section>
        <main className=' rounded-4xl shadow-2xl min-h-[80dvh] w-[64dvw] mx-auto '
          style={{ marginTop: "16dvh", marginBottom: "8dvh" }}>
          <section className=' p-8'>
            <Hero />
            <Form />
          </section>
        </main>
      </>
    )
  }
}

export default Page