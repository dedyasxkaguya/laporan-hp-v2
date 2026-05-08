import React from 'react'
import {
    Chart as ChartJS,
    ChartData,
    ChartOptions,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

export interface IChartProps {
    latestData: Report[]
    length: number
    kelas:string
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


const ChartElement = ({ latestData, length, kelas }: IChartProps) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    )



    const convertDate = (data: Report) => {
        if (data) {
            // const res = `${data.report_type} ${new Date(data.createdAt).toLocaleDateString("id-ID", { dateStyle: "full" })}`
            const res = `${data.report_type}`
            return res
        } else {
            return null
        }
    }

    const convertColor = (data: Report) => {
        if (data) {
            if (data.report_type.toLowerCase() == "pengumpulan") return "rgba(37, 99, 235, .4)"
            else if (data.report_type.toLowerCase() == "pengambilan") return "rgba(22, 163, 74, .4)"
            else if (data.report_type.toLowerCase() == "peminjaman") return "rgba(217, 119, 6, .4)"
        }
    }
    const convertColorHover = (data: Report) => {
        if (data) {
            if (data.report_type.toLowerCase() == "pengumpulan") return "rgba(37, 99, 235, .8)"
            else if (data.report_type.toLowerCase() == "pengambilan") return "rgba(22, 163, 74, .8)"
            else if (data.report_type.toLowerCase() == "peminjaman") return "rgba(217, 119, 6, .8)"
        }
    }
    const convertColorBorder = (data: Report) => {
        if (data) {
            if (data.report_type.toLowerCase() == "pengumpulan") return "rgba(37, 99, 235, 1)"
            else if (data.report_type.toLowerCase() == "pengambilan") return "rgba(22, 163, 74, 1)"
            else if (data.report_type.toLowerCase() == "peminjaman") return "rgba(217, 119, 6, 1)"
        }
    }


    const weeklyReport: Report[] = []
    const labels = []
    const datas = []
    const backgroundColors = []
    const backgroundColorsBorder = []
    const backgroundColorsHover = []
    const backgroundColorsHoverBorder = []

    let i: number = 0

    while (i < length) {

        weeklyReport.push(latestData[i] ?? null)
        labels.push(convertDate(latestData[i]))
        datas.push(latestData[i] ? latestData[i].phone : null,)
        backgroundColors.push(convertColor(latestData[i]))
        backgroundColorsBorder.push(convertColorHover(latestData[i]))
        backgroundColorsHover.push(convertColorHover(latestData[i]),)
        backgroundColorsHoverBorder.push(convertColorBorder(latestData[i]),)

        i++
    }

    const data: ChartData<'bar'> = {
        labels: labels,
        datasets: [{
            label: "Pengumpulan HP",
            data: datas,
            backgroundColor: backgroundColors,
            hoverBackgroundColor: backgroundColorsHover,
            borderWidth: 1.6,
            borderColor: backgroundColorsBorder,
            hoverBorderColor: backgroundColorsHoverBorder,
            normalized: true,
        }]
    }
    const options: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const
            },
            title: {
                display: true,
                text: `Laporan Gawai kelas ${kelas}`
            }
        },
        scales:{
            y:{
                beginAtZero:true,
                max:36,
                ticks:{
                    stepSize:2
                }
            },
            x:{
                offset:true,
                grid:{
                    display:false
                }
            }
        }
    }
    return (
        <main>
            {data && options && (
                <Bar data={data} options={options} />
            )}
        </main>
    )
}

export default ChartElement