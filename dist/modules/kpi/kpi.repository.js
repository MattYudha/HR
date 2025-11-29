"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KPIRepository = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
class KPIRepository {
    async createKPI(data) {
        return await prisma_1.default.kPI.create({
            data,
            include: {
                employee: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async updateKPI(id, data) {
        return await prisma_1.default.kPI.update({
            where: { id },
            data,
            include: {
                employee: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async findKPIsByEmployee(employeeId) {
        return await prisma_1.default.kPI.findMany({
            where: { employeeId },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                employee: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async findKPIById(id) {
        return await prisma_1.default.kPI.findUnique({
            where: { id },
            include: {
                employee: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async findAllKPIs() {
        return await prisma_1.default.kPI.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                employee: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
}
exports.KPIRepository = KPIRepository;
exports.default = new KPIRepository();
//# sourceMappingURL=kpi.repository.js.map