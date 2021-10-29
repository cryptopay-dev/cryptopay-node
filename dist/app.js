"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const enc_base64_1 = __importDefault(require("crypto-js/enc-base64"));
const sha1_1 = __importDefault(require("crypto-js/sha1"));
const md5_1 = __importDefault(require("crypto-js/md5"));
class CryptoPay {
    constructor(api_secret, api_key, callback_secret) {
        this.api_secret = api_secret;
        this.api_key = api_key;
        this.callback_secret = callback_secret;
        //Rates
        this.getRetes = () => __awaiter(this, void 0, void 0, function* () {
            const path = '/api/rates';
            const headers = this.headerCreator("GET", path);
            // const response = await axios.get(path, headers)
            // console.log({response})
            // return response
        });
        this.headerCreator = (method, path, body) => {
            const date = new Date().toUTCString();
            const contentType = "application/json";
            const bodyHash = body ? md5_1.default(body).toString() : "";
            const stringToSign = `${method}\n${bodyHash}\n${contentType}\n${date}\n${path}`;
            const signature = enc_base64_1.default.stringify(sha1_1.default(stringToSign, this.api_secret));
            const Authorization = `HMAC ${this.api_key}:${signature}`;
            return {
                headers: {
                    Date: date,
                    Authorization,
                    'Content-Type': contentType
                }
            };
        };
    }
}
const testObj = new CryptoPay('api_secret', 'api_key', 'callback_secret');
testObj.getRetes();
//# sourceMappingURL=app.js.map