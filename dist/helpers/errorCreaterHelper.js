"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomErrorCreater = void 0;
const CustomErrorCreater = (err) => {
    const { data, status, config } = err.response;
    const { method = 'get' } = config;
    return {
        method,
        httpStatus: status,
        responseBody: data,
    };
};
exports.CustomErrorCreater = CustomErrorCreater;
