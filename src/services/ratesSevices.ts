import axios from "axios";
import { IHeaders } from "../interfaces/IHeaders";

export const getRates = async (path: string, headers:IHeaders) => {
    try {
        const response = await axios.get(path, headers);
        console.log({ response });
        return response.data
    } catch (err) {
        throw "getRetes: " + err; 
    }
}

export const getRetesByPair = async (path: string, headers:IHeaders) => {
    try {
        const response = await axios.get(path, headers);
        console.log({ response });
        return response.data
    } catch (err) {
        throw "getRetes: " + err; 
    }
}