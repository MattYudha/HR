"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendance_controller_1 = __importDefault(require("./attendance.controller"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const router = (0, express_1.Router)();
router.post('/check-in', authMiddleware_1.authMiddleware, (req, res) => attendance_controller_1.default.checkIn(req, res));
router.post('/check-out', authMiddleware_1.authMiddleware, (req, res) => attendance_controller_1.default.checkOut(req, res));
router.get('/me', authMiddleware_1.authMiddleware, (req, res) => attendance_controller_1.default.getMyAttendance(req, res));
exports.default = router;
//# sourceMappingURL=attendance.routes.js.map