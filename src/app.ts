import axios from "axios";
import base64 from "crypto-js/enc-base64";
import sha1 from "crypto-js/sha1";
import md5 from "crypto-js/md5";



const headerCreator = (method:string, path:string, api_secret:any, api_key:any, body:any) => {
  const date = new Date().toUTCString();
  const contentType = 'application/json';
  const bodyHash = body ? md5(body).toString() : '';

  const stringToSign = `${method}\n${bodyHash}\n${contentType}\n${date}\n${path}`;
  const signature = base64.stringify(sha1(stringToSign, api_secret));
  const authorization = `HMAC ${api_key}:${signature}`
  return {
    date,
    authorization,
  }
};
