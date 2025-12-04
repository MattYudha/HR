"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPayrollRecap = void 0;
const payroll_recap_service_1 = require("./payroll.recap.service");
const getPayrollRecap = async (req, res) => {
    const { period } = req.query;
    if (typeof period !== 'string') {
        return res.status(400).json({ message: 'Period query parameter is required' });
    }
    try {
        const recapData = await (0, payroll_recap_service_1.getRecapData)(period);
        res.json(recapData);
        return;
    }
    catch (error) {
        console.error('Error fetching payroll recap:', error);
        res.status(500).json({ message: 'Failed to fetch payroll recap data' });
        return;
    }
};
exports.getPayrollRecap = getPayrollRecap;
//# sourceMappingURL=payroll.recap.controller.js.map