export interface iStatus {
    tipe: string | undefined
}
const Statusbox = ({ tipe }: iStatus) => {
    if (!tipe) {
        return (
            <div className={` text-red-600 cursor-pointer flex gap-2 items-center justify-center lg:justify-start`}>
                <i className={`bi text-lg bi-exclamation-circle`}></i>
                <span className=" hidden lg:inline">Tidak ada</span>
            </div>
        )
    }
    return (
        <div className={`${tipe == "Pengumpulan" ? "text-blue-600" : tipe == "Pengambilan" ? "text-green-600" : "text-amber-600"} cursor-pointer flex gap-2 items-center justify-center lg:justify-start`}>
            <i className={`bi text-lg ${tipe == "Pengumpulan"
                ? "bi-arrow-down-circle"
                : tipe == "Pengambilan"
                    ? "bi-arrow-up-circle"
                    : "bi-arrow-down-up"}`}></i>
            <span className=" hidden lg:inline">{tipe}</span>
        </div>
    )
}

export default Statusbox 