import { injectable } from "inversify";
import { BaseRepo } from "./base";
import { Iitems } from "@/model/item.model";
import { inject } from "inversify";
import { TYPES } from "@/types/inversify/types";
import mongoose, { Model } from "mongoose";
import { ItemsRepoInterface } from "@/interface/items/items.repo.interface";

@injectable()
export class ItemsRepo extends BaseRepo<Iitems> implements ItemsRepoInterface {
    constructor(@inject(TYPES.ItemModel) private _itemModel: Model<Iitems>) {
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

    async getAllItems(search: string, page: number): Promise<Iitems[]> {
        const skip = (page - 1) * 10;

        const query: any = { isDeleted: false };

        if (search && search.trim() !== "") {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }
        return this._itemModel.find(query).skip(skip).limit(10).lean();
    }

    async getAllItemsList(): Promise<Iitems[]> {
        return await this._itemModel.find({ isDeleted: false });
    }
}
