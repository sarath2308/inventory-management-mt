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

        if (start && end) {
            query.createdAt = {
                $gte: new Date(start),
                $lte: new Date(end),
            };
        }

        return this._salesModel
            .find(query)
            .populate("customerId", "name")
            .populate("items.itemId", "name price")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(10);
    }
}
