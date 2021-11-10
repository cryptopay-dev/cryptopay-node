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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const invoiceParamsToTest_1 = require("./dataToTesting/invoiceParamsToTest");
const callback_secret = "sn8MGpjYipbVMv0oiU8FAYNRMkbAL9BZcYYSY28cnTE";
const api_key = "D-d6gn9axIWNPn5cPIukoA";
const api_secret = "waNXkbUH7d-yRcImNM8vx9gLDX9ZgjTCpvtwX_anRyg";
const cryptoPay = new app_1.default(api_secret, api_key, callback_secret);
// // var assert = require('assert');
let invoiceID = "";
const custom_id = "PAYMENT-123"; // need to create dynamic
let address = "";
let recalculation_id = "";
describe("Rates", () => {
    it("Get Retes has response", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield cryptoPay.getRetes();
        expect(resp).toBeTruthy();
    }));
    it("Get Retes By Pair has response", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield cryptoPay.getRetesByPair("BTC/EUR");
        expect(resp).toBeTruthy();
    }));
    it("Get Retes By Pair with wrong params", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield cryptoPay.getRetesByPair("wrongParams");
        }
        catch (error) {
            expect(error).toBeTruthy();
        }
    }));
});
describe("Invoice", () => {
    it("Create invoice has response", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield cryptoPay.createInvoice(invoiceParamsToTest_1.invoiceParamsToTest);
        invoiceID = resp.id;
        address = resp.address;
        expect(resp).toBeTruthy();
    }));
    it("Get list invoice has response ", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield cryptoPay.getListInvoces();
        expect(resp).toBeTruthy();
    }));
    it("Get invoice by invoice id has response ", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield cryptoPay.getInvoceByInvoiceId(invoiceID);
        expect(resp).toBeTruthy();
    }));
    it("Get invoice by invoice id with wrong param ", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield cryptoPay.getInvoceByInvoiceId("wrong params");
        }
        catch (error) {
            expect(error).toBeTruthy();
        }
    }));
    it("Get list invoce by custom id has response ", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield cryptoPay.getListInvoceByCustomId(custom_id);
        expect(resp).toBeTruthy();
    }));
    it("Get list invoce by custom id  with wrong param ", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield cryptoPay.getListInvoceByCustomId("wrong params");
        }
        catch (error) {
            expect(error).toBeTruthy();
        }
    }));
    // Temporarily not working
    // it("Create recalculate invoices has response", async () => {
    //   const resp = await cryptoPay.createRecalculateInvoices(invoiceID, true);
    //   expect(resp).toBeTruthy()
    // });
    // it("Create refund invoices has response", async () => {
    //   const resp = await cryptoPay.createInvoiceRefund(invoiceID ,address);
    //   expect(resp).toBeTruthy()
    // });
    // it("Commit recalculate invoices has response", async () => {
    //   const resp = await cryptoPay.commitRecalculateInvoicesByIds(invoiceID ,recalculation_id);
    //   expect(resp).toBeTruthy()
    // });
    it("Get list refund list has response", () => __awaiter(void 0, void 0, void 0, function* () {
        const resp = yield cryptoPay.getListInvoiceRefund(invoiceID);
        expect(resp).toBeTruthy();
    }));
    it("Get list refund list with wrong param ", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield cryptoPay.getListInvoiceRefund("wrong params");
        }
        catch (error) {
            expect(error).toBeTruthy();
        }
    }));
});
//# sourceMappingURL=api.spec.js.map