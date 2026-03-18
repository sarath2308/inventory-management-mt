import { HttpStatus } from "@/constants/http.status";
import { ISalesService } from "@/interface/sales/sales.service.interface";
import { TYPES } from "@/types/inversify/types";
import { Request, Response } from "express";
import { inject } from "inversify";
import { success } from "zod";

export class SalesController {
    constructor(@inject(TYPES.ISaleService) private _salesService: ISalesService) {}

    async createSales(req: Request, res: Response): Promise<void> {
        await this._salesService.createSale(req.body);
        res.status(HttpStatus.OK).json({ success: true });
    }

    async removeSales(req: Request, res: Response): Promise<void> {
        const saleId = req.params.saleId as string;
        await this._salesService.removeSale(saleId);
        res.status(HttpStatus.OK).json({ success: true });
    }

    async getAllSales(req: Request, res: Response): Promise<void> {
        const start = req.query.start as string;
        const end = req.query.end as string;
        const page = req.query.page as string;
        const saleData = await this._salesService.getAllSales(start, end, page ? Number(page) : 1);
        res.status(HttpStatus.OK).json({ success: true, saleData });
    }
}
