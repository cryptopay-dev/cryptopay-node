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
exports.getRetesByPair = exports.getRates = void 0;
const axios_1 = __importDefault(require("axios"));
const errorCreaterHelper_1 = require("../helpers/errorCreaterHelper");
exports.getRates = (path, headers) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(path, { headers });
        return response.data.data;
    }
    catch (err) {
        throw errorCreaterHelper_1.CustomErrorCreater(err);
    }
});
exports.getRetesByPair = (path, headers) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(path, { headers });
        return response.data.data;
    }
    catch (err) {
        throw errorCreaterHelper_1.CustomErrorCreater(err);
    }
});
//# sourceMappingURL=ratesSevices.js.map