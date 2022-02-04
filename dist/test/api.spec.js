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
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const __1 = __importDefault(require(".."));
const error_json_1 = __importDefault(require("./data/error.json"));
const invoice_created_json_1 = __importDefault(require("./data/invoice/invoice_created.json"));
const invoices_list_json_1 = __importDefault(require("./data/invoice/invoices_list.json"));
const recalculation_json_1 = __importDefault(require("./data/invoice/recalculation.json"));
const invoiceParamsToTest_1 = require("./data/invoiceParamsToTest");
const list_json_1 = __importDefault(require("./data/rates/list.json"));
// responce to test
const pair_json_1 = __importDefault(require("./data/rates/pair.json"));
dotenv_1.default.config();
// fake data to test that
const invoiceID = 'invoiceID';
const address = 'address';
const recalculationID = 'recalculationId';
const customID = 'customID';
const callbackSecret = process.env.CALLBACK_SECRET || '';
const apiKey = process.env.API_KEY || '';
const apiSecret = process.env.API_SECRET || '';
const cryptopay = new __1.default(apiSecret, apiKey, callbackSecret);
jest.mock('axios');
const mockedAxios = axios_1.default;
describe('Rates', () => {
    it('Get Rates validation response', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            mockedAxios.request.mockResolvedValue(list_json_1.default);
            const resp = yield cryptopay.rates().all();
            expect(resp).toBeTruthy();
            expect(resp).toEqual(list_json_1.default);
            expect(mockedAxios.request).toHaveBeenCalledWith({
                headers: {},
                method: 'GET',
                url: `${cryptopay.url}/api/rates`,
            });
        }
        catch (error) {
            expect(error).toBeFalsy();
        }
    }));
    it('Get Rate  By Pair validation response', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            mockedAxios.request.mockResolvedValue(pair_json_1.default);
            const resp = yield cryptopay.rates().retrieve('BTC', 'EUR');
            expect(resp).toEqual(pair_json_1.default);
            expect(mockedAxios.request).toHaveBeenCalledWith({
                headers: {},
                method: 'GET',
                url: `${cryptopay.url}/api/rates`,
            });
        }
        catch (error) {
            expect(error).toBeFalsy();
        }
    }));
    it('Get Rates By Pair with wrong params', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            mockedAxios.request.mockRejectedValue(error_json_1.default);
            yield cryptopay.rates().retrieve('wrong', 'Params');
            expect(mockedAxios.request).toHaveBeenCalledWith({
                headers: {},
                method: 'GET',
                url: `${cryptopay.url}/api/rates`,
            });
        }
        catch (error) {
            expect(error).toBeTruthy();
            expect(error).toEqual(error_json_1.default);
        }
    }));
});
describe('Invoice', () => {
    it('Create invoice validation response', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            mockedAxios.request.mockResolvedValue(invoice_created_json_1.default);
            const resp = yield cryptopay.invoices().create(invoiceParamsToTest_1.invoiceParamsToTest);
            expect(resp).toEqual(invoice_created_json_1.default);
            expect(mockedAxios.request).toHaveBeenCalledWith({
                data: JSON.stringify(invoiceParamsToTest_1.invoiceParamsToTest),
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                url: `${cryptopay.url}/api/invoices`,
            });
        }
        catch (error) {
            expect(error).toBeFalsy();
        }
    }));
    it('Get list invoice has response ', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            mockedAxios.request.mockResolvedValue(invoices_list_json_1.default);
            const resp = yield cryptopay.invoices().list();
            expect(resp).toEqual(invoices_list_json_1.default);
            expect(mockedAxios.request).toHaveBeenCalledWith({
                headers: {},
                method: 'GET',
                url: `${cryptopay.url}/api/invoices`,
            });
        }
        catch (error) {
            expect(error).toBeFalsy();
        }
    }));
    it('Get invoice by invoice id validate response ', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            mockedAxios.request.mockResolvedValue(invoice_created_json_1.default);
            const resp = yield cryptopay.invoices().retrieve(invoiceID);
            expect(resp).toEqual(invoice_created_json_1.default);
            expect(mockedAxios.request).toHaveBeenCalledWith({
                headers: {},
                method: 'GET',
                url: `${cryptopay.url}/api/invoices/${invoiceID}`,
            });
        }
        catch (error) {
            expect(error).toBeFalsy();
        }
    }));
    it('Get invoice by invoice id with wrong param ', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            mockedAxios.request.mockRejectedValue(error_json_1.default);
            yield cryptopay.invoices().list('wrongParams');
            expect(mockedAxios.request).toHaveBeenCalledWith({
                headers: {},
                method: 'GET',
                url: `${cryptopay.url}/api/invoices/wrongParams`,
            });
        }
        catch (error) {
            expect(error).toBeTruthy();
            expect(error).toEqual(error_json_1.default);
        }
    }));
    it('Get list invoce by custom id validate response ', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            mockedAxios.request.mockResolvedValue(invoice_created_json_1.default);
            const resp = yield cryptopay.invoices().retrieveByCustomId(customID);
            expect(resp).toBeTruthy();
            expect(resp).toEqual(invoice_created_json_1.default);
            expect(mockedAxios.request).toHaveBeenCalledWith({
                headers: {},
                method: 'GET',
                url: `${cryptopay.url}/api/invoices/custom_id/${customID}`,
            });
        }
        catch (error) {
            expect(error).toBeFalsy();
        }
    }));
    it('Get list invoce by custom id  with wrong param ', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            mockedAxios.request.mockRejectedValue(error_json_1.default);
            yield cryptopay.invoices().retrieveByCustomId('wrongParams');
            expect(mockedAxios.request).toHaveBeenCalledWith({
                headers: {},
                method: 'GET',
                url: `${cryptopay.url}/api/invoices/custom_id/wrongParams`,
            });
        }
        catch (error) {
            expect(error).toBeTruthy();
            expect(error).toEqual(error_json_1.default);
        }
    }));
    it('Get list refund list has response', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            mockedAxios.request.mockResolvedValue(invoices_list_json_1.default);
            const resp = yield cryptopay.invoices().listRefunds(invoiceID);
            expect(resp).toBeTruthy();
            expect(resp).toEqual(invoices_list_json_1.default);
            expect(mockedAxios.request).toHaveBeenCalledWith({
                headers: {},
                method: 'GET',
                url: `${cryptopay.url}/api/invoices/${invoiceID}/refunds`,
            });
        }
        catch (error) {
            expect(error).toBeFalsy();
        }
    }));
    it('Get list refund list with wrong param ', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            mockedAxios.request.mockRejectedValue(error_json_1.default);
            yield cryptopay.invoices().listRefunds('wrongParams');
            expect(mockedAxios.request).toHaveBeenCalledWith({
                headers: {},
                method: 'GET',
                url: `${cryptopay.url}/api/invoices/wrongParams/refunds`,
            });
        }
        catch (error) {
            expect(error).toBeTruthy();
            expect(error).toEqual(error_json_1.default);
        }
    }));
    it('Create recalculate invoices has response', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            mockedAxios.request.mockResolvedValue(recalculation_json_1.default);
            const resp = yield cryptopay.invoices().createRecalculation(invoiceID, true);
            expect(resp).toBeTruthy();
            expect(resp).toEqual(recalculation_json_1.default);
            expect(mockedAxios.request).toHaveBeenCalledWith({
                headers: {
                    'Content-Type': 'application/json',
                },
                data: 'true',
                method: 'POST',
                url: `${cryptopay.url}/api/invoices/${invoiceID}/recalculations`,
            });
        }
        catch (error) {
            expect(error).toBeFalsy();
        }
    }));
    it('Create refund invoices has response', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            mockedAxios.request.mockResolvedValue(recalculation_json_1.default);
            const resp = yield cryptopay.invoices().createRefund(invoiceID, address);
            expect(resp).toBeTruthy();
            expect(resp).toEqual(recalculation_json_1.default);
            expect(mockedAxios.request).toHaveBeenCalledWith({
                headers: {
                    'Content-Type': 'application/json',
                },
                data: address,
                method: 'POST',
                url: `${cryptopay.url}/api/invoices/${invoiceID}/refunds`,
            });
        }
        catch (error) {
            expect(error).toBeFalsy();
        }
    }));
    it('Commit recalculate invoices has response', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            mockedAxios.request.mockResolvedValue(recalculation_json_1.default);
            const resp = yield cryptopay.invoices().commitRecalculation(invoiceID, recalculationID);
            expect(resp).toBeTruthy();
            expect(resp).toEqual(recalculation_json_1.default);
            expect(mockedAxios.request).toHaveBeenCalledWith({
                headers: {},
                method: 'POST',
                url: `${cryptopay.url}/api/invoices/${invoiceID}/recalculations/${recalculationID}/commit`,
            });
        }
        catch (error) {
            expect(error).toBeFalsy();
        }
    }));
});
describe('Validation callback', () => {
    const secret = 'hzeRDX54BYleXGwGm2YEWR4Ony1_ZU2lSTpAuxhW1gQ';
    const body = '{"type":"Invoice","event":"status_changed","data":{"id":"ff48eeba-ab18-4088-96bc-4be10a82b994","status":"completed","status_context":null,"address":"rs9pE6CnNLE8YiTgTwbAk1AkFyS3opsm7K?dt=701","price_amount":"1.0","price_currency":"EUR","pay_amount":"3.113326","pay_currency":"XRP","paid_amount":"3.113326","exchange":{"pair":"XRPEUR","rate":"0.3212"},"transactions":[{"txid":"3EA591FED2F1F61263CB66AAC6BCF520B0714A08F2481D56DE267F31E0C782B9","risk":null}],"name":null,"description":null,"metadata":null,"custom_id":null,"success_redirect_url":null,"created_at":"2019-04-09T15:22:09+00:00","expires_at":"2019-04-09T15:32:09+00:00"}}';
    const signature = '7c021857107203da4af1d24007bb0f752e2f04478e5e5bff83719101f2349b54';
    const cryptopay = new __1.default(apiSecret, apiKey, secret);
    it('Valid callback', () => {
        const correct = cryptopay.verifyCallback(body, { 'x-cryptopay-signature': signature });
        expect(correct).toBeTruthy();
    });
    it('Without headers', () => {
        try {
            cryptopay.verifyCallback(body, {});
        }
        catch ({ message }) {
            expect(message).toEqual('Header x-cryptopay-signature is missing or empty');
        }
    });
    it('With wrong headers', () => {
        try {
            cryptopay.verifyCallback(body, { wrong: 'wrong' });
        }
        catch ({ message }) {
            expect(message).toEqual('Header x-cryptopay-signature is missing or empty');
        }
    });
    it('With wrong body', () => {
        const wrongBody = '{"wrong":"wrong"}';
        const correct = cryptopay.verifyCallback(wrongBody, { 'x-cryptopay-signature': signature });
        expect(correct).toBeFalsy();
    });
    it('Without body', () => {
        try {
            cryptopay.verifyCallback('', { 'x-cryptopay-signature': signature });
        }
        catch ({ message }) {
            expect(message).toEqual('Body is empty');
        }
    });
    it('Not valid json', () => {
        try {
            cryptopay.verifyCallback('{', { 'x-cryptopay-signature': signature });
        }
        catch ({ message }) {
            expect(message).toEqual('Invalid JSON in body. Error message: Unexpected end of JSON input');
        }
    });
});
