"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomErrorCreater = void 0;
exports.CustomErrorCreater = (err) => {
    const { data, status, config } = err.response;
    const { method } = config;
    return {
        method,
        httpStatus: status,
        responseBody: data,
    };
};
//# sourceMappingURL=errorCreaterHelper.js.map