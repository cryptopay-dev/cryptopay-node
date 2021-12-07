import { AxiosError, AxiosResponse } from "axios";
import { ICustomError } from "../interfaces/ICustomError";

export const CustomErrorCreater = (err: any): ICustomError => {
  const { data, status, config } = (err as AxiosError)
    .response as AxiosResponse;
  const { method = "get" } = config;
  return {
    method,
    httpStatus: status,
    responseBody: data,
  };
};
