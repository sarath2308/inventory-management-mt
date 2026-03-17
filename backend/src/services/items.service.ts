import { HttpStatus } from "@/constants/http.status";
import { Messages } from "@/constants/messages";
import { AppError } from "@/error/app.error";
import { IItemsService } from "@/interface/items/items.service.interface";
import { ItemMapper } from "@/mapper/item.mapper";
import { ItemsRepo } from "@/repo/items.repo";
import { ItemResponseDataType } from "@/schema/items/item.response.schema";
import { CreateItemDataType } from "@/schema/items/items.create.schema";
import { UpdateItemDataType } from "@/schema/items/items.update.schema";
import { TYPES } from "@/types/inversify/types";
import { injectable } from "inversify";
import { inject } from "inversify";
@injectable()
export class ItemsService implements IItemsService {
    constructor(@inject(TYPES.ItemsRepo) private _itemsRepo: ItemsRepo) {}

    async createItem(payload: CreateItemDataType): Promise<void> {
        const duplicate = await this._itemsRepo.getItemWithSameName(payload.name);

        if (duplicate) {
            throw new AppError(Messages.ITEM_DUPLICATE, HttpStatus.BAD_REQUEST);
        }

        const createdItem = await this._itemsRepo.create({ ...payload });
        if (!createdItem) {
            throw new AppError(Messages.ITEM_NOT_CREATED, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateItem(itemId: string, payload: UpdateItemDataType): Promise<void> {
        const itemData = await this._itemsRepo.findById(itemId);

        if (!itemData) {
            throw new AppError(Messages.ITEM_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        if (payload.name) {
            const duplicate = await this._itemsRepo.findDuplicateItem(itemId, payload.name);
            if (duplicate) {
                throw new AppError(Messages.ITEM_DUPLICATE, HttpStatus.BAD_REQUEST);
            }
        }
        itemData.name = payload.name ?? itemData.name;
        itemData.description = payload.description ?? itemData.description;
        itemData.quantity = payload.quantity ?? itemData.quantity;
        itemData.price = payload.price ?? itemData.price;

        await itemData.save();
    }
    async removeItem(itemId: string): Promise<void> {
        await this._itemsRepo.remove(itemId);
    }
    async getAllItems(): Promise<ItemResponseDataType[]> {
        const items = await this._itemsRepo.getAllItems();
        const responseObj = items.map((item) => {
            return ItemMapper(item);
        });
        return responseObj;
    }
    async findById(id: string): Promise<ItemResponseDataType | null> {
        const itemData = await this._itemsRepo.findById(id);
        if (!itemData) return null;

        return ItemMapper(itemData);
    }

    async reduceCount(itemId: string, count: number): Promise<void> {
        const itemData = await this._itemsRepo.findById(itemId);
        if (!itemData) {
            throw new AppError(Messages.ITEM_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        itemData.quantity -= count;
        await itemData.save();
    }
}
