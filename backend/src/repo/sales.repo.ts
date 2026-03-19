import { ISales } from "@/model/sales.model ";
import { BaseRepo } from "./base";
import { ISalesRepo } from "@/interface/sales/sales.repo.interface";
import { inject } from "inversify";
import { injectable } from "inversify";
import { TYPES } from "@/types/inversify/types";
import mongoose, { Model } from "mongoose";

@injectable()
export class SalesRepo extends BaseRepo<ISales> implements ISalesRepo {
    constructor(@inject(TYPES.ISaleModel) private _salesModel: Model<ISales>) {
        super(_salesModel);
    }

    async removeSales(saleId: string): Promise<void> {
        await this._salesModel.updateOne(
            { _id: new mongoose.Types.ObjectId(saleId) },
            { $set: { isDeleted: true } },
        );
    }

    async getAllSales(start: string, end: string, page: number): Promise<ISales[]> {
        const skip = (page - 1) * 10;
        const query: any = { isDeleted: false };

        if (start || end) {
            const dateFilter: any = {};

            if (start) {
                // Force LOCAL time (not UTC)
                const startDate = new Date(`${start}T00:00:00`);
                dateFilter.$gte = startDate;
            }

            if (end) {
                const endDate = new Date(`${end}T00:00:00`);
                endDate.setDate(endDate.getDate() + 1); // next day
                dateFilter.$lt = endDate;
            }

            query.createdAt = dateFilter;
        }

        return this._salesModel
            .find(query)
            .populate("customerId", "name")
            .populate("items.itemId", "name price")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(10);
    }

    async getSaleByCustomer(
        customerId: string,
        start: string,
        end: string,
        page: number,
    ): Promise<ISales[]> {
        const skip = (page - 1) * 10;
        const query: any = { isDeleted: false };
        query.customerId = new mongoose.Types.ObjectId(customerId);

        if (start || end) {
            const dateFilter: any = {};

            if (start) {
                // Force LOCAL time (not UTC)
                const startDate = new Date(`${start}T00:00:00`);
                dateFilter.$gte = startDate;
            }

            if (end) {
                const endDate = new Date(`${end}T00:00:00`);
                endDate.setDate(endDate.getDate() + 1); // next day
                dateFilter.$lt = endDate;
            }

            query.createdAt = dateFilter;
        }
        return await this._salesModel
            .find(query)
            .populate("customerId", "name")
            .populate("items.itemId", "name price")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(10);
    }
}
