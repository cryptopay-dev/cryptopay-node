import axios from "axios";
import { IHeaders } from "../interfaces/IHeaders";

export const getRates = async (path: string, headers: IHeaders) => {
  try {
    console.log(headers);
    const response = await axios.get(path, { headers });
    return response.data;
  } catch (err) {
    console.log("getRetes: ", err);
    throw "getRetes: " + err;
  }
};

export const getRetesByPair = async (path: string, headers: IHeaders) => {
  try {
    const response = await axios.get(path, { headers });
    return response.data;
  } catch (err) {
    throw "getRetes: " + err;
  }
};
