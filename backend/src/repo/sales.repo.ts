import { ISales } from "@/model/sales.collection ";
import { BaseRepo } from "./base";
import { ISalesRepo } from "@/interface/sales/sales.repo.interface";
import { inject } from "inversify";
import { injectable } from "inversify";
import { TYPES } from "@/types/inversify/types";
import mongoose, { Model } from "mongoose";

@injectable()
export class SalesRepo extends BaseRepo<ISales> implements ISalesRepo {
    constructor(@inject(TYPES.SalesModel) private _salesModel: Model<ISales>) {
        super(_salesModel);
    }

    async removeSales(saleId: string): Promise<void> {
        await this._salesModel.updateOne(
            { _id: new mongoose.Types.ObjectId(saleId) },
            { $set: { isDeleted: true } },
        );
    }

    async getAllSales(): Promise<ISales[]> {
        return this._salesModel
            .find({ isDeleted: false })
            .populate("customerId", "name")
            .populate("items.itemId", "name price")
            .sort({ createdAt: -1 });
    }
}
