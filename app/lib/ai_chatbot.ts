import axios from "axios";
import { DataClass } from "../components/Classdetail";

export const chat_ai = async (msg:string, data:DataClass) => {
    try{

        const response = await axios.post<string>("/api/chat", {
            msg:msg,
            data:data
        })
        
        return response.data
    }catch(error){
        if(error instanceof Error){
            return error.message
        }
    }
        
}