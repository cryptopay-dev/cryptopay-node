"use strict";
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
        this.headerCreator = (method, path, body) => {
            const date = new Date().toUTCString();
            const contentType = "application/json";
            const bodyHash = body ? md5_1.default(body).toString() : "";
            const stringToSign = `${method}\n${bodyHash}\n${contentType}\n${date}\n${path}`;
            const signature = enc_base64_1.default.stringify(sha1_1.default(stringToSign, this.api_secret));
            const authorization = `HMAC ${this.api_key}:${signature}`;
            return {
                date,
                authorization,
            };
        };
        this.test = () => {
            console.log('hello world');
            console.log(this.api_key);
            console.log(this.api_secret);
            console.log(this.callback_secret);
        };
    }
}
const tmp = new CryptoPay('api_secret', 'api_key', 'callback_secret');
tmp.test();
//# sourceMappingURL=app.js.map