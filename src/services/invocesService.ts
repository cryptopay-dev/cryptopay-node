import axios from "axios";
import { IHeaders } from "../interfaces/IHeaders";
import { IInvoiceResult } from "../interfaces/IInvoceResult";
import { IInvoiceListResult } from "../interfaces/IInvoiceListResult";
import { IInvoiceParams } from "../interfaces/IInvoiceParams";
import { IInvoiceRecalculationResult } from "../interfaces/IInvoiceRecalculationResult";
import { IInvoiceRefundResult } from "../interfaces/IInvoiceRefundResult";

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
): Promise<IInvoiceListResult> => {
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

export const getInvoceByPathWithParams = async (
  path: string,
  headers: IHeaders
): Promise<IInvoiceResult> => {
  try {
    const response = await axios.get(path, {
      headers,
    });
    return response.data;
  } catch (err) {
    console.log("getInvoceByPathWithParams: ", err);
    throw "getInvoceByPathWithParams: " + err;
  }
};

export const getRecalculateInvoices = async (
  path: string,
  bodyParams: any,
  headers: IHeaders
): Promise<IInvoiceRecalculationResult> => {
  try {
    const response = await axios.post(path, {
      headers,
      body: {
        ...bodyParams,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log("getInvoceByPathWithParamsAndBody: ", err);
    throw "getInvoceByPathWithParamsAndBody: " + err;
  }
};

export const getRecalculateInvoicesByIds = async (
  path: string,
  headers: IHeaders
): Promise<IInvoiceRecalculationResult> => {
  try {
    const response = await axios.post(path, {
      headers,
    });
    return response.data.data;
  } catch (err) {
    console.log("getRecalculateInvoicesByIds: ", err);
    throw "getRecalculateInvoicesByIds: " + err;
  }
};

export const createInvoiceRefund = async (
  path: string,
  bodyParams: any,
  headers: IHeaders
): Promise<IInvoiceRefundResult> => {
  try {
    const response = await axios.post(path, {
      headers,
      body: {
        ...bodyParams,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log("createInvoiceRefund: ", err);
    throw "createInvoiceRefund: " + err;
  }
};
