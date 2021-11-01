"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var invoiceStatusEnum;
(function (invoiceStatusEnum) {
    invoiceStatusEnum[invoiceStatusEnum["new"] = 0] = "new";
    invoiceStatusEnum[invoiceStatusEnum["completed"] = 1] = "completed";
    invoiceStatusEnum[invoiceStatusEnum["unresolved"] = 2] = "unresolved";
    invoiceStatusEnum[invoiceStatusEnum["refunded"] = 3] = "refunded";
    invoiceStatusEnum[invoiceStatusEnum["cancelled"] = 4] = "cancelled";
})(invoiceStatusEnum || (invoiceStatusEnum = {}));
var invoiceStatusContextEnum;
(function (invoiceStatusContextEnum) {
    invoiceStatusContextEnum[invoiceStatusContextEnum["overpaid"] = 0] = "overpaid";
    invoiceStatusContextEnum[invoiceStatusContextEnum["underpaid"] = 1] = "underpaid";
    invoiceStatusContextEnum[invoiceStatusContextEnum["paid_late"] = 2] = "paid_late";
    invoiceStatusContextEnum[invoiceStatusContextEnum["illicit_resource"] = 3] = "illicit_resource";
})(invoiceStatusContextEnum || (invoiceStatusContextEnum = {}));
//# sourceMappingURL=IInvoceResult.js.map