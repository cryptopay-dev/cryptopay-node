import axios, { AxiosError, AxiosResponse } from "axios";
import { CustomErrorCreater } from "../helpers/errorCreaterHelper";
import { IHeaders } from "../interfaces/IHeaders";
import { IRate } from "../interfaces/IRate";

export const getRates = async (path: string, headers: IHeaders): Promise<IRate[]> => {
  try {
    const response = await axios.get(path, { headers });
    return response.data.data;
  } catch (err) {
    throw CustomErrorCreater(err)
  }
};

export const getRetesByPair = async (path: string, headers: IHeaders) => {
  try {
    const response = await axios.get(path, { headers });
    return response;
  } catch (err) {
    // throw CustomErrorCreater(err)
    throw err
  }
};
