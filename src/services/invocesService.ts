import axios, { AxiosError, AxiosResponse } from "axios";
import { CustomErrorCreater } from "../helpers/errorCreaterHelper";
import { IHeaders } from "../interfaces/IHeaders";
import { IInvoiceResult } from "../interfaces/IInvoceResult";
import { IInvoiceListResult } from "../interfaces/IInvoiceListResult";
import { IInvoiceParams } from "../interfaces/IInvoiceParams";
import { IInvoiceRecalculationResult } from "../interfaces/IInvoiceRecalculationResult";
import { IInvoiceRefundResult } from "../interfaces/IInvoiceRefundResult";

export const createInvoice = async (
  path: string,
  headers: IHeaders,
  invoice: IInvoiceParams
): Promise<IInvoiceResult> => {
  try {
    const response = await axios.post(path, invoice, headers);
    return response.data.data;
  } catch (err) {
      throw CustomErrorCreater(err)
  }
};

export const getListInvoces = async (
  path: string,
  headers: IHeaders,
  customer_id?: string,
  starting_after?: string
): Promise<IInvoiceListResult> => {
  try {
    const response = await axios.get(path, {
      params: { customer_id, starting_after },
      ...headers,
    });
    return response.data;
  } catch (err) {
    throw CustomErrorCreater(err)
  }
};

export const getInvoceByCustomId = async (
  path: string,
  headers: IHeaders
): Promise<IInvoiceResult> => {
  try {
    const response = await axios.get(path, headers);
    return response.data.data;
  } catch (err) {
    throw CustomErrorCreater(err)
  }
};

export const createRecalculateInvoices = async (
  path: string,
  headers: IHeaders,
  force_commit: boolean
): Promise<IInvoiceRecalculationResult> => {
  try {
    const response = await axios.post(path, { force_commit }, headers);
    return response.data.data;
  } catch (err) {
    throw CustomErrorCreater(err);
  }
};

export const commitRecalculateInvoicesByIds = async (
  path: string,
  headers: IHeaders
): Promise<IInvoiceRecalculationResult> => {
  try {
    const response = await axios.post(path, {
      headers,
    });
    return response.data.data;
  } catch (err) {
    throw CustomErrorCreater(err);
  }
};

export const createInvoiceRefund = async (
  path: string,
  headers: IHeaders,
  address: string
): Promise<IInvoiceRefundResult> => {
  try {
    const response = await axios.post(path, { address }, headers);
    return response.data.data;
  } catch (err) {
    throw CustomErrorCreater(err);
  }
};

export const getListInvoiceRefund = async (
  path: string,
  headers: IHeaders
): Promise<IInvoiceRefundResult[]> => {
  try {
    const response = await axios.get(path, {
      ...headers,
    });
    return response.data;
  } catch (err) {
    throw CustomErrorCreater(err);
  }
};
