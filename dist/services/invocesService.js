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
const axios_1 = __importDefault(require("axios"));
exports.createInvoice = (path, invoice, headers) => __awaiter(this, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(path, invoice, headers);
        return response.data;
    }
    catch (err) {
        console.log("createInvoice: ", err.response);
        throw "createInvoice: " + err;
    }
});
exports.getListInvoces = (path, customer_id, starting_after, headers) => __awaiter(this, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(path, {
            headers,
            params: { customer_id, starting_after },
        });
        return response.data;
    }
    catch (err) {
        console.log("getListInvoces: ", err);
        throw "getListInvoces: " + err;
    }
});
exports.getInvoceByPathWithParams = (path, headers) => __awaiter(this, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(path, {
            headers,
        });
        return response.data;
    }
    catch (err) {
        console.log("getInvoceByPathWithParams: ", err);
        throw "getInvoceByPathWithParams: " + err;
    }
});
exports.getRecalculateInvoices = (path, bodyParams, headers) => __awaiter(this, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(path, {
            headers,
            body: Object.assign({}, bodyParams),
        });
        return response.data.data;
    }
    catch (err) {
        console.log("getInvoceByPathWithParamsAndBody: ", err);
        throw "getInvoceByPathWithParamsAndBody: " + err;
    }
});
exports.getRecalculateInvoicesByIds = (path, headers) => __awaiter(this, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(path, {
            headers,
        });
        return response.data.data;
    }
    catch (err) {
        console.log("getRecalculateInvoicesByIds: ", err);
        throw "getRecalculateInvoicesByIds: " + err;
    }
});
exports.createInvoiceRefund = (path, bodyParams, headers) => __awaiter(this, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(path, {
            headers,
            body: Object.assign({}, bodyParams),
        });
        return response.data.data;
    }
    catch (err) {
        console.log("createInvoiceRefund: ", err);
        throw "createInvoiceRefund: " + err;
    }
});
exports.getListInvoiceRefund = (path, headers) => __awaiter(this, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(path, {
            headers,
        });
        return response.data.data;
    }
    catch (err) {
        console.log("getListInvoiceRefund: ", err);
        throw "getListInvoiceRefund: " + err;
    }
});
//# sourceMappingURL=invocesService.js.map