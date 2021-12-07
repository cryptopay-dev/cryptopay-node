import { AxiosError, AxiosResponse } from 'axios';
import { ICustomError } from '../interfaces/ICustomError';

export const CustomErrorCreater = (err: AxiosError): ICustomError => {
  const { data, status, config } = err.response as AxiosResponse;
  const { method = 'get' } = config;
  return {
    method,
    httpStatus: status,
    responseBody: data,
  };
};
