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
exports.getListInvoiceRefund = exports.createInvoiceRefund = exports.commitRecalculateInvoicesByIds = exports.createRecalculateInvoices = exports.getInvoceByCustomId = exports.getListInvoces = exports.createInvoice = void 0;
const axios_1 = __importDefault(require("axios"));
const errorCreaterHelper_1 = require("../helpers/errorCreaterHelper");
exports.createInvoice = (path, headers, invoice) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(path, invoice, headers);
        return response.data.data;
    }
    catch (err) {
        throw errorCreaterHelper_1.CustomErrorCreater(err);
    }
});
exports.getListInvoces = (path, headers, customer_id, starting_after) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(path, Object.assign({ params: { customer_id, starting_after } }, headers));
        return response.data.data;
    }
    catch (err) {
        throw errorCreaterHelper_1.CustomErrorCreater(err);
    }
});
exports.getInvoceByCustomId = (path, headers) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(path, headers);
        return response.data.data;
    }
    catch (err) {
        throw errorCreaterHelper_1.CustomErrorCreater(err);
    }
});
exports.createRecalculateInvoices = (path, headers, force_commit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(path, { force_commit }, headers);
        return response.data.data;
    }
    catch (err) {
        throw errorCreaterHelper_1.CustomErrorCreater(err);
    }
});
exports.commitRecalculateInvoicesByIds = (path, headers) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(path, {
            headers,
        });
        return response.data.data;
    }
    catch (err) {
        throw errorCreaterHelper_1.CustomErrorCreater(err);
    }
});
exports.createInvoiceRefund = (path, headers, address) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(path, { address }, headers);
        return response.data.data;
    }
    catch (err) {
        throw errorCreaterHelper_1.CustomErrorCreater(err);
    }
});
exports.getListInvoiceRefund = (path, headers) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(path, Object.assign({}, headers));
        return response.data;
    }
    catch (err) {
        throw errorCreaterHelper_1.CustomErrorCreater(err);
    }
});
//# sourceMappingURL=invocesService.js.map