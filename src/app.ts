import axios from "axios";
import base64 from "crypto-js/enc-base64";
import sha1 from "crypto-js/sha1";
import md5 from "crypto-js/md5";

class CryptoPay {
  private api_key;
  private api_secret;
  private callback_secret;

  constructor(api_secret: any, api_key: any, callback_secret:any) {
    this.api_key = api_key;
    this.api_secret = api_secret;
    this.callback_secret = callback_secret;
  }

  private headerCreator = (method: string, path: string, body: any) => {
    const date = new Date().toUTCString();
    const contentType = "application/json";
    const bodyHash = body ? md5(body).toString() : "";

    const stringToSign = `${method}\n${bodyHash}\n${contentType}\n${date}\n${path}`;
    const signature = base64.stringify(sha1(stringToSign, this.api_secret));
    const authorization = `HMAC ${this.api_key}:${signature}`;
    return {
      date,
      authorization,
    };
  };
}
