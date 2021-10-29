import base64 from "crypto-js/enc-base64";
import sha1 from "crypto-js/sha1";
import md5 from "crypto-js/md5";

class CryptoPay {
  constructor(private api_secret: any,private api_key: any, private callback_secret:any) {}

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


const testObj = new CryptoPay('api_secret', 'api_key', 'callback_secret')
