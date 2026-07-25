import React, { useEffect, useState } from 'react'
import Fields from './Fields'
import FieldSelect, { customObject } from './FieldSelect'
import Camera from './Camera'
import dataTeacher from '../api/json/teacher.json'
import axios from 'axios'
import Swal from 'sweetalert2'
import { ClassInterface } from '../lib/studentclass'
export interface FormI {
  func: (a: number) => void
}

const Form = ({ func }: FormI) => {

  const [type, setType] = useState<string>("")
  const [classId, setClass] = useState<string>()
  const [classes, setClasses] = useState<ClassInterface[] | null>(null)

  const [isNama, setNama] = useState<boolean>(false)
  const [isKelas, setKelas] = useState<boolean>(false)
  const [isBentuk, setBentuk] = useState<boolean>(false)
  const [isGuru, setGuru] = useState<boolean>(false)
  const [isPhone, setPhone] = useState<boolean>(false)
  const [isPhoto, setPhoto] = useState<boolean>(false)
  const [isCatatan, setCatatan] = useState<boolean>(false)
  const [isSubmit, setSubmit] = useState<boolean>(false)
  const [isClear, setClear] = useState<boolean>(false)

  const [isNamaError, setNamaError] = useState<boolean>(false)
  const [isPhoneError, setPhoneError] = useState<boolean>(false)
  // const [isKelasError, setKelasError] = useState<boolean>(false)
  // const [isBentukError, setBentukError] = useState<boolean>(false)
  // const [isGuruError, setGuruError] = useState<boolean>(false)
  // const [isPhotoError, setPhotoError] = useState<boolean>(false)
  // const [isCatatanError, setCatatanError] = useState<boolean>(false)
  // const [isSubmitError, setSubmitError] = useState<boolean>(false)
  // const [isClearError, setClearError] = useState<boolean>(false)

  const nameErrorMessage = "Nama tidak boleh melebihi 24 karakter"
  const phoneErrorMessage = "Handphone tidak boleh lebih dari 36, jika tetap submit, maka akan terhitung 36"

  const [valueNama, setNamaValue] = useState<string>()
  const [valueKelas, setKelasValue] = useState<string>()
  const [valueBentuk, setBentukValue] = useState<string>()
  const [valueGuru, setGuruValue] = useState<string>()
  const [valuePhone, setPhoneValue] = useState<number>()
  const [valueCatatan, setCatatanValue] = useState<string>()
  const [photoFile, setPhotoFile] = useState<File>()

  const progress = [isNama, isKelas, isGuru, isPhone, isPhoto].filter(Boolean).length * 20;

  useEffect(() => {
    axios.get<{ status: boolean, data: ClassInterface[] }>("/api/classes")
      .then(data => {
        const fetched = data.data
        if (!classes) {
          setClasses(fetched.data.sort((a, b) => a.order - b.order))
        }
      })

    func(progress)

  }, [progress])

  const bentuk = [
    { id: 1, text: "Pengumpulan" },
    { id: 2, text: "Peminjaman" },
    { id: 3, text: "Pengambilan" },
  ]

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value)
    if (e.target.value) {
      setBentukValue(e.target.value)
      if (!isBentuk) {
        setBentuk(true)
      }
    } else if (e.target.value == "") {
      setBentuk(false)
    }
  }

  const handleClass = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClass(e.target.value)
    if (e.target.value) {
      setKelasValue(e.target.value)
      if (!isKelas) {
        setKelas(true)
      }
    } else if (e.target.value == "") {
      setKelas(false)
    }
  }

  const handleNama = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      if (e.target.value.length <= 24) {
        setNamaValue(e.target.value)
        setNamaError(false)
        if (!isNama) {
          setNama(true)
        }
      } else {
        setNamaError(true)
      }
    } else if (e.target.value == "") {
      setNama(false)
    }
  }

  const handleGuru = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setGuruValue(e.target.value)
      if (!isGuru) {
        setGuru(true)
      }
    } else if (e.target.value == "") {
      setGuru(false)
    }
  }

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(e.target.value) <= 36) {
      setPhoneValue(Number(e.target.value))
      setPhoneError(false)
      if (!isPhone) {
        setPhone(true)
      }
    } else if (Number(e.target.value) > 36) {
      setPhoneError(true)
      setPhoneValue(36)
      if (!isPhone) {
        setPhone(true)
      }
    } else if (e.target.value == "") {
      setPhone(false)
    }
  }
  const handleCatatan = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setCatatanValue(e.target.value)
      if (!isCatatan) {
        setCatatan(true)
      }
    } else if (e.target.value == "") {
      setCatatan(false)
    }
  }

  const handleDummy = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e)
  }

  const handleCamera = (photoUrl: string, file: File) => {
    console.log("Sudah mengambil gambar")
    setPhotoFile(file)
    console.log(file)
    setPhoto(true)
  }

  const handleSubmit = () => {
    setSubmit(true)
    const formdata = new FormData()
    const formdataImg = new FormData()

    if (valueNama && valueKelas && valueBentuk && valueGuru && valuePhone && photoFile) {

      formdataImg.set("image", photoFile as Blob)

      axios.post("/api/upload", formdataImg)
        .then(response => {
          const result = response.data
          setClear(true)
          console.log(result)

          if (result.status) {

            formdata.append("name", valueNama as string)
            formdata.append("student_class", valueKelas as string)
            formdata.append("report_type", valueBentuk as string)
            formdata.append("teacher", valueGuru as string)
            formdata.append("phone", valuePhone.toString() as string)
            formdata.append("image", result.link as string)

            if (isCatatan) {
              formdata.append("note", valueCatatan as string)
            }

            axios.post("/api/reports", formdata)
              .then(data => {
                const fetched = data.data
                console.log(fetched)
                if (fetched.status) {
                  Swal.fire({
                    icon: "success",
                    title: "Berhasil",
                    text: "Berhasil mengirimkan laporan",
                    showConfirmButton: false,
                    toast: true,
                    timer: 2096,
                    timerProgressBar: true,
                    animation: true
                  })
                  setTimeout(() => {
                    location.reload()
                  }, 2000);
                }
              })
          }
        })
    }
  }

  return (
    <section className=' flex gap-4'>
      <main className=' flex flex-col gap-4 mt-8 w-[40dvw]'>
        <Fields label='Form Pengumpulan Gawai' isDisabled={true} icon='calender-event' func={handleDummy} isTime={true} type='text' isDataSet={false} defaultValue={false}
          errorMessage='' isError={false} />
        <Fields label='Nama Petugas' isDisabled={false} icon='person-badge' func={handleNama} isTime={false} type='text' isDataSet={false} defaultValue={false}
          errorMessage={nameErrorMessage} isError={isNamaError} />
        {classes && (
          <FieldSelect label='Pilih Kelas' icon='mortarboard' placeholder='Pilih Kelas' datas={classes as unknown as customObject[]} name="class"
            func={handleClass} />
        )}
        {!classes && (
          <p>Fetching classes data...</p>
        )}
        <FieldSelect label='Bentuk Laporan' icon='clipboard-check' placeholder='Opsi Laporan' datas={bentuk} name="report" func={handleType} />
        {type == "" && (
          <Fields label='Nama Guru' isDisabled={true} icon='person-workspace' func={handleGuru} isTime={false} type='text' isDataSet={false} defaultValue={false}
            errorMessage='' isError={false} />
        )}
        {type == "Pengumpulan" && (
          <Fields label='Nama Guru Pertama' isDisabled={false} icon='person-workspace' func={handleGuru} isTime={false} type='text' isDataSet={dataTeacher} defaultValue={false}
            errorMessage='' isError={false} />
        )}
        {type == "Peminjaman" && (
          <Fields label='Nama Guru Penanggung Jawab' isDisabled={false} icon='person-workspace' func={handleGuru} isTime={false} type='text' isDataSet={dataTeacher} defaultValue={false}
            errorMessage='' isError={false} />
        )}
        {type == "Peminjaman" && (
          <Fields label='Catatan' isDisabled={false} icon='exclamation-circle' func={handleCatatan} isTime={false} type='text' isDataSet={false} defaultValue={false}
            errorMessage='' isError={false} />
        )}
        {type == "Pengambilan" && (
          <Fields label='Nama Guru Terakhir' isDisabled={false} icon='person-workspace' func={handleGuru} isTime={false} type='text' isDataSet={dataTeacher} defaultValue={false}
            errorMessage='' isError={false} />
        )}

        <Fields label='Jumlah Handphone' isDisabled={false} icon='phone' func={handlePhone} isTime={false} type='number' isDataSet={false} defaultValue={false}
          errorMessage={phoneErrorMessage} isError={isPhoneError} />

      </main>
      <section className=' flex flex-col gap-4'>
        <Camera func={handleCamera} isSubmit={isSubmit} progress={progress} submitfunc={handleSubmit} isClear={isClear} />
      </section>
    </section>
  )
}

export default Form