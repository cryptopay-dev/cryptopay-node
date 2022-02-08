"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
const apitest = () => __awaiter(void 0, void 0, void 0, function* () {
    const callbackSecret = process.env.CALLBACK_SECRET || '';
    const apiKey = process.env.API_KEY || '';
    const apiSecret = process.env.API_SECRET || '';
    const cryptopay = new __1.Cryptopay(apiSecret, apiKey, callbackSecret);
    try {
        const res = yield cryptopay.rates.all();
        // eslint-disable-next-line no-console
        console.log(res === null || res === void 0 ? void 0 : res.data);
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.log({ error });
    }
});
apitest();
