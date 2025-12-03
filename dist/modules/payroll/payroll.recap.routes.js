"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payroll_recap_controller_1 = require("./payroll.recap.controller");
const router = (0, express_1.Router)();
router.get('/recap', payroll_recap_controller_1.getPayrollRecap);
exports.default = router;
//# sourceMappingURL=payroll.recap.routes.js.map