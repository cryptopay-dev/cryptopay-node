import axios, { AxiosError, AxiosResponse } from "axios";
import { IHeaders } from "../interfaces/IHeaders";
import { IRate } from "../interfaces/IRate";

export const getRates = async (path: string, headers: IHeaders): Promise<IRate[]> => {
  try {
    const response = await axios.get(path, { headers });
    return response.data.data;
  } catch (err) {
    console.log("getRetes: ", ((err as AxiosError).response as AxiosResponse).data);
    throw  err;
  }
};

export const getRetesByPair = async (path: string, headers: IHeaders):Promise<IRate> => {
  try {
    const response = await axios.get(path, { headers });
    return response.data.data;
  } catch (err) {
    console.log("getRetes: ", ((err as AxiosError).response as AxiosResponse).data);
    throw "getRetes: " + err;
  }
};
