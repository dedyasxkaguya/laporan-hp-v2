import { UAParser } from "ua-parser-js"

export const checkDevice = () =>{
    const parser = new UAParser(window.navigator.userAgent)
    const os = parser.getOS()
    return os.name
}