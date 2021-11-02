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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const enc_base64_1 = __importDefault(require("crypto-js/enc-base64"));
const sha1_1 = __importDefault(require("crypto-js/sha1"));
const md5_1 = __importDefault(require("crypto-js/md5"));
const enc_utf8_1 = __importDefault(require("crypto-js/enc-utf8"));
const ratesSevices = __importStar(require("./services/ratesSevices"));
const invocesService = __importStar(require("./services/invocesService"));
const invoiceParamsToTest_1 = require("./dataToTesting/invoiceParamsToTest");
class CryptoPay {
    constructor(api_secret, api_key, callback_secret, uri = "https://business-sandbox.cryptopay.me") {
        this.api_secret = api_secret;
        this.api_key = api_key;
        this.callback_secret = callback_secret;
        this.uri = uri;
        //Rates
        this.getRetes = () => __awaiter(this, void 0, void 0, function* () {
            const path = "/api/rates";
            const headers = this.headerCreator("GET", path);
            try {
                return yield ratesSevices.getRates(`${this.uri}${path}`, headers);
            }
            catch (err) {
                throw err;
            }
        });
        this.getRetesByPair = (pair) => __awaiter(this, void 0, void 0, function* () {
            const path = `/api/rates/${pair}`;
            const headers = this.headerCreator("GET", path);
            try {
                return yield ratesSevices.getRetesByPair(`${this.uri}${path}`, headers);
            }
            catch (err) {
                throw err;
            }
        });
        // Invoices
        this.createInvoice = (invoice) => __awaiter(this, void 0, void 0, function* () {
            try {
                const path = `/api/invoices`;
                const headers = this.headerCreator("POST", path, invoice);
                return yield invocesService.createInvoice(`${this.uri}${path}`, invoice, headers);
            }
            catch (err) {
                throw err;
            }
        });
        this.getListInvoces = (customer_id, starting_after) => __awaiter(this, void 0, void 0, function* () {
            try {
                const path = `/api/invoices`;
                const headers = this.headerCreator("GET", path, {
                    customer_id,
                    starting_after,
                });
                return yield invocesService.getListInvoces(`${this.uri}${path}`, customer_id, starting_after, headers);
            }
            catch (err) {
                throw err;
            }
        });
        this.getListInvoceByInvoiceId = (invoice_id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const path = `/api/invoices/${invoice_id}`;
                const headers = this.headerCreator("GET", path);
                return yield invocesService.getInvoceByPathWithParams(`${this.uri}${path}`, headers);
            }
            catch (err) {
                throw err;
            }
        });
        this.getListInvoceByCustomId = (custom_id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const path = `/api/invoices/custom_id/${custom_id}`;
                const headers = this.headerCreator("GET", path);
                return yield invocesService.getInvoceByPathWithParams(`${this.uri}${path}`, headers);
            }
            catch (err) {
                throw err;
            }
        });
        this.getRecalculateInvoices = (invoice_id, force_commit) => __awaiter(this, void 0, void 0, function* () {
            try {
                const path = `/api/invoices/${invoice_id}/recalculations`;
                const headers = this.headerCreator("POST", path, { force_commit });
                return yield invocesService.getRecalculateInvoices(`${this.uri}${path}`, { force_commit }, headers);
            }
            catch (err) {
                throw err;
            }
        });
        this.getRecalculateInvoicesByIds = (invoice_id, recalculation_id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const path = `/api/invoices/${invoice_id}/recalculations/${recalculation_id}/commit`;
                const headers = this.headerCreator("POST", path);
                return yield invocesService.getRecalculateInvoicesByIds(`${this.uri}${path}`, headers);
            }
            catch (err) {
                throw err;
            }
        });
        this.createInvoiceRefund = (invoice_id, address) => __awaiter(this, void 0, void 0, function* () {
            try {
                const path = `/api/invoices/${invoice_id}/refunds`;
                const headers = this.headerCreator("POST", path, { address });
                return yield invocesService.createInvoiceRefund(`${this.uri}${path}`, { address }, headers);
            }
            catch (err) {
                throw err;
            }
        });
        this.getListInvoiceRefund = (invoice_id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const path = `/api/invoices/${invoice_id}/refunds`;
                const headers = this.headerCreator("GET", path);
            }
            catch (err) {
                throw err;
            }
        });
        this.headerCreator = (method, path, body) => {
            const date = new Date().toUTCString();
            const contentType = "application/json";
            const bodyHash = body ? md5_1.default(body).toString() : "";
            const StringToSign = `${method}\n${bodyHash}\n${contentType}\n${date}\n${path}`;
            const signature = enc_base64_1.default.stringify(sha1_1.default(this.api_secret, enc_utf8_1.default.parse(StringToSign)));
            const Authorization = `HMAC ${this.api_key}:${signature}`;
            return {
                headers: {
                    Date: date,
                    Authorization,
                    "Content-Type": contentType,
                },
            };
        };
    }
}
const test = () => __awaiter(this, void 0, void 0, function* () {
    const callback_secret = "sn8MGpjYipbVMv0oiU8FAYNRMkbAL9BZcYYSY28cnTE";
    const api_key = "7AA2P-w0RxZXG-_K4cRngQ";
    const api_secret = "NGR0vvNXKO_p3v2zz5ZuShP36Vp19ekZ9nLORtVZYpc";
    const testObj = new CryptoPay(api_secret, api_key, callback_secret);
    // const resp = await testObj.getRetes();
    // const resp = await testObj.getRetesByPair("XRP/ZAR");
    const resp = yield testObj.createInvoice(invoiceParamsToTest_1.invoiceParamsToTest);
    console.log("resp=======", resp);
});
test();
//# sourceMappingURL=app.js.map