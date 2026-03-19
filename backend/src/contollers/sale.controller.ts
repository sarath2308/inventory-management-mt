import { HttpStatus } from "@/constants/http.status";
import { ISalesService } from "@/interface/sales/sales.service.interface";
import { TYPES } from "@/types/inversify/types";
import { Request, Response } from "express";
import { inject } from "inversify";

export class SalesController {
    constructor(@inject(TYPES.ISaleService) private _salesService: ISalesService) {}

    async createSales(req: Request, res: Response): Promise<void> {
        const { body } = req.validated!;
        await this._salesService.createSale(body);
        res.status(HttpStatus.OK).json({ success: true });
    }

    async removeSales(req: Request, res: Response): Promise<void> {
        const { params } = req.validated!;
        const { saleId } = params;
        await this._salesService.removeSale(saleId);
        res.status(HttpStatus.OK).json({ success: true });
    }

    async getAllSales(req: Request, res: Response): Promise<void> {
        const { query } = req.validated!;
        const { start, end, page } = query;
        const saleData = await this._salesService.getAllSales(start, end, page ? Number(page) : 1);
        res.status(HttpStatus.OK).json({ success: true, saleData });
    }

    async getCustomerLedgerData(req: Request, res: Response): Promise<void> {
        const { query, params } = req.validated!;
        const { start, end, page } = query;
        const { customerId } = params;

        const ledgerData = await this._salesService.getSalesDataForLedger(
            customerId,
            start,
            end,
            page ? Number(page) : 1,
        );

        res.status(HttpStatus.OK).json({ success: true, ledgerData });
    }
}
