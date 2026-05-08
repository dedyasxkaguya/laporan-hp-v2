export interface iStatus {
    tipe: string
}
const Statusbox = ({ tipe }: iStatus) => {
    return (
        <div className={`${tipe == "Pengumpulan" ? "text-blue-600" : tipe == "Pengambilan" ? "text-green-600" : "text-amber-600"}`}>
            <i className={`bi text-lg ${tipe == "Pengumpulan"
                ? "bi-arrow-down-circle"
                : tipe == "Pengambilan"
                    ? "bi-arrow-up-circle"
                    : "bi-arrow-down-up"} me-2`}></i>
            <span>{tipe}</span>
        </div>
    )
}

export default Statusbox 