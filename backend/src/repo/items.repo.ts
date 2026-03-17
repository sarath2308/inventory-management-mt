import { injectable } from "inversify";
import { BaseRepo } from "./base";
import { Iitems } from "@/model/item.model";
import { inject } from "inversify";
import { TYPES } from "@/types/inversify/types";
import mongoose, { Model } from "mongoose";
import { ItemsRepoInterface } from "@/interface/items/items.repo.interface";

@injectable()
export class ItemsRepo extends BaseRepo<Iitems> implements ItemsRepoInterface {
    constructor(@inject(TYPES.ItemsModel) private _itemModel: Model<Iitems>) {
        super(_itemModel);
    }
    async getItemWithSameName(name: string): Promise<Iitems | null> {
        return this._itemModel.findOne({
            isDeleted: false,
            name: { $regex: `^${name}$`, $options: "i" },
        });
    }

    async findDuplicateItem(itemId: string, name: string): Promise<Iitems | null> {
        return await this._itemModel.findOne({
            _id: { $ne: new mongoose.Types.ObjectId(itemId) },
            name: { $regex: `^${name}$`, $options: "i" },
            isDeleted: false,
        });
    }

    async remove(itemId: string): Promise<void> {
        await this._itemModel.updateOne(
            { _id: new mongoose.Types.ObjectId(itemId) },
            { $set: { isDeleted: true } },
        );
    }

    async getAllItems(): Promise<Iitems[]> {
        return await this._itemModel.find({ isDeleted: false }).lean();
    }
}
