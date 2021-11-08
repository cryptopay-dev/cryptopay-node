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
const crypto_js_1 = __importDefault(require("crypto-js"));
const moment_1 = __importDefault(require("moment"));
const ratesSevices = __importStar(require("./services/ratesSevices"));
const invocesService = __importStar(require("./services/invocesService"));
/**
 *
 * @export
 * @class CryptoPay
 */
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
                return yield invocesService.createInvoice(`${this.uri}${path}`, headers, invoice);
            }
            catch (err) {
                throw err;
            }
        });
        this.getListInvoces = (customer_id, starting_after) => __awaiter(this, void 0, void 0, function* () {
            try {
                const path = `/api/invoices`;
                const headers = this.headerCreator("GET", path);
                return yield invocesService.getListInvoces(`${this.uri}${path}`, headers, customer_id, starting_after);
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
        this.createRecalculateInvoices = (invoice_id, force_commit = true) => __awaiter(this, void 0, void 0, function* () {
            try {
                const path = `/api/invoices/${invoice_id}/recalculations`;
                const headers = this.headerCreator("POST", path, { force_commit });
                return yield invocesService.createRecalculateInvoices(`${this.uri}${path}`, headers, force_commit);
            }
            catch (err) {
                throw err;
            }
        });
        this.commitRecalculateInvoicesByIds = (invoice_id, recalculation_id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const path = `/api/invoices/${invoice_id}/recalculations/${recalculation_id}/commit`;
                const headers = this.headerCreator("POST", path);
                return yield invocesService.commitRecalculateInvoicesByIds(`${this.uri}${path}`, headers);
            }
            catch (err) {
                throw err;
            }
        });
        this.createInvoiceRefund = (invoice_id, address) => __awaiter(this, void 0, void 0, function* () {
            try {
                const path = `/api/invoices/${invoice_id}/refunds`;
                const headers = this.headerCreator("POST", path, { address });
                return yield invocesService.createInvoiceRefund(`${this.uri}${path}`, headers, address);
            }
            catch (err) {
                throw err;
            }
        });
        this.getListInvoiceRefund = (invoice_id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const path = `/api/invoices/${invoice_id}/refunds`;
                const headers = this.headerCreator("GET", path);
                return yield invocesService.getListInvoiceRefund(`${this.uri}${path}`, headers);
            }
            catch (err) {
                throw err;
            }
        });
    }
    headerCreator(method, path, body) {
        const date = moment_1.default().format("YYYY-MM-DDTHH:mm:ssZ");
        const contentType = "application/json";
        const bodyHash = body ? crypto_js_1.default.MD5(JSON.stringify(body)).toString() : "";
        const stringToSign = `${method}\n${bodyHash}\n${contentType}\n${date}\n${path}`;
        const signature = crypto_js_1.default.enc.Base64.stringify(crypto_js_1.default.HmacSHA1(stringToSign, this.api_secret));
        return {
            headers: {
                Date: date,
                Authorization: `HMAC ${this.api_key}:${signature}`,
                "Content-Type": contentType,
            },
        };
    }
}
exports.CryptoPay = CryptoPay;
const myTest = () => __awaiter(this, void 0, void 0, function* () {
    const callback_secret = "sn8MGpjYipbVMv0oiU8FAYNRMkbAL9BZcYYSY28cnTE";
    // const api_key = "7AA2P-w0RxZXG-_K4cRngQ";
    // const api_secret = "NGR0vvNXKO_p3v2zz5ZuShP36Vp19ekZ9nLORtVZYpc";
    const api_key = "D-d6gn9axIWNPn5cPIukoA";
    const api_secret = "waNXkbUH7d-yRcImNM8vx9gLDX9ZgjTCpvtwX_anRyg";
    const testObj = new CryptoPay(api_secret, api_key, callback_secret);
    try {
        // const resp = await testObj.getRetes(); //+
        // const resp = await testObj.getRetesByPair("XRP/ZAR"); //+
        // const resp = await testObj.createInvoice(invoiceParamsToTest); // +
        // const resp = await testObj.getListInvoces(); //+
        // const resp = await testObj.getListInvoceByInvoiceId('e4ae8549-5b7d-43c6-a6b9-3fe3be04e085');  //+
        // const resp = await testObj.getListInvoceByCustomId('PAYMENT-123'); //+
        const resp = yield testObj.createRecalculateInvoices("4149435c-2ee7-4f2f-b906-32a1415240c9", true); //invoice_not_recalculatable
        // const resp = await testObj.getRecalculateInvoicesByIds(
        //   "", //?
        //   "", //?
        // ); //--
        // const resp = await testObj.createInvoiceRefund(
        //   'e4ae8549-5b7d-43c6-a6b9-3fe3be04e085',
        //   '2NA7eYDPh8VMGm7ZhaUkpPmWhyaq5bsjYi2'
        // ); //'invoice status not refundable'
        // const resp = await testObj.getListInvoiceRefund(
        //   'e4ae8549-5b7d-43c6-a6b9-3fe3be04e085' 
        //   );  //+- data: []
        // console.log("resp=======", resp);
    }
    catch (err) {
        console.log("[err]", err);
    }
});
myTest();
//# sourceMappingURL=app.js.map