import { AxiosResponse, AxiosError } from "axios";

export const CustomErrorCreater = (err:any) => {
  const {data , status , config}= (
    (err as AxiosError).response as AxiosResponse
  );
  const { method } = config;
  return {
    method,
    httpStatus: status,
    responseBody: data,
  };
};
