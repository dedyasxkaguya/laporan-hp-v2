'use client'
import Hero from './components/Hero'
import Form from './components/Form'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { checkDevice } from './components/check'
import Forbidden from './components/Error/Forbidden'
import Lenis from 'lenis'
import Welcomepage from './components/Welcomepage'
import DynamicIsland from './components/DynamicIsland'
const Page = () => {
  const [isWelcome, setWelcome] = useState<boolean>(true)
  const [isAndroid, setCheckOS] = useState<boolean>()
  const [progressNum, setProgress] = useState<number>(0)
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      duration: 1.5
    })
    lenis.start()
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

  const handleWelcome = () => {
    setWelcome(!isWelcome)
  }
  const handleProgress = (a: number) => {
    setProgress(a)
  }
  if (isAndroid) {
    return (
      <Forbidden />
    )
  } else {
    return (
      <>
        {isWelcome && (
          <Welcomepage func={handleWelcome} />
        )}
        <section className=' w-dvw flex items-center justify-center'>
          {/* <Navbar isGlass={scroll > .1 ? true : false} /> */}
          <DynamicIsland isHome data={null} progress={progressNum} />
        </section>
        <main className=' rounded-4xl shadow-2xl min-h-[80dvh] w-[64dvw] mx-auto '
          style={{ marginTop: "8dvh", marginBottom: "8dvh" }}>
          <section className=' p-8'>
            <Hero />
            <Form func={handleProgress} />
          </section>
        </main>
      </>
    )
  }
}

export default Page