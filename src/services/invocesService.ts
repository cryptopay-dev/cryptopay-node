import axios from "axios";
import { IHeaders } from "../interfaces/IHeaders";
import { IInvoiceParams } from "../interfaces/IInvoiceParams";

export const createInvoice  = async (path: string, invoice:IInvoiceParams , headers:IHeaders) => {
    try {
        const response = await axios.post(path, invoice, headers);
        return response.data
    } catch (err) {
        console.log( "createInvoice: ", err );
        throw "createInvoice: " + err; 
    }
}