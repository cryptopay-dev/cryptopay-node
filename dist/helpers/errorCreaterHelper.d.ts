import { AxiosError } from 'axios';
import { ICustomError } from '../interfaces/ICustomError';
export declare const CustomErrorCreater: (err: AxiosError) => ICustomError;
