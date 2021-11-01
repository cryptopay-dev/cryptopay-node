import axios from "axios";
import { IHeaders } from "../interfaces/IHeaders";
import { IInvoiceResult } from "../interfaces/IInvoceResult";
import { IInvoiceParams } from "../interfaces/IInvoiceParams";

export const createInvoice = async (
  path: string,
  invoice: IInvoiceParams,
  headers: IHeaders
): Promise<IInvoiceResult> => {
  try {
    const response = await axios.post(path, invoice, headers);
    return response.data;
  } catch (err) {
    console.log("createInvoice: ", err);
    throw "createInvoice: " + err;
  }
};

export const getListInvoces = async (
  path: string,
  customer_id: string,
  starting_after: string,
  headers: IHeaders
): Promise<IInvoiceResult[]> => {
  try {
    const response = await axios.get(path, {
      headers,
      params: { customer_id, starting_after },
    });
    return response.data;
  } catch (err) {
    console.log("getListInvoces: ", err);
    throw "getListInvoces: " + err;
  }
};

export const getListInvoceByInvoiceId = async (
  path: string,
  invoice_id: string,
  headers: IHeaders
): Promise<IInvoiceResult> => {
  try {
    const response = await axios.get(path, {
      headers,
      params: { invoice_id },
    });
    return response.data;
  } catch (err) {
    console.log("getListInvoceByInvoiceId: ", err);
    throw "getListInvoceByInvoiceId: " + err;
  }
};
