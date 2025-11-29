"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KPIController = void 0;
const kpi_service_1 = __importDefault(require("./kpi.service"));
class KPIController {
    async createKPI(req, res) {
        try {
            const kpiData = req.body;
            const kpi = await kpi_service_1.default.createKPI(kpiData);
            res.status(201).json({
                success: true,
                message: 'KPI created successfully',
                data: kpi
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to create KPI'
            });
        }
    }
    async getMyKPIs(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                });
                return;
            }
            const kpis = await kpi_service_1.default.getEmployeeKPIs(req.user.id);
            res.json({
                success: true,
                message: 'KPIs retrieved successfully',
                data: kpis
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to get KPIs'
            });
        }
    }
    async getAllKPIs(_req, res) {
        try {
            const kpis = await kpi_service_1.default.getAllKPIs();
            res.json({
                success: true,
                message: 'All KPIs retrieved successfully',
                data: kpis
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to get KPIs'
            });
        }
    }
}
exports.KPIController = KPIController;
exports.default = new KPIController();
//# sourceMappingURL=kpi.controller.js.map