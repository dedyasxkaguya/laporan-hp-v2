'use client'
import Hero from './components/Hero'
import Form from './components/Form'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Navbar from './components/Navbar'
const page = () => {
  return (
    <>
      <Navbar />
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

export default page