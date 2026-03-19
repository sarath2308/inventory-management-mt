import { HttpStatus } from "@/constants/http.status";
import { Messages } from "@/constants/messages";
import { IItemsService } from "@/interface/items/items.service.interface";
import { TYPES } from "@/types/inversify/types";
import { Request, Response } from "express";
import { inject } from "inversify";
import { injectable } from "inversify";

@injectable()
export class ItemsController {
    constructor(@inject(TYPES.ItemService) private _itemService: IItemsService) {}

    async createItem(req: Request, res: Response): Promise<void> {
        const { body } = req.validated!;
        await this._itemService.createItem(body);
        res.status(HttpStatus.CREATED).json({ success: true, message: Messages.ITEM_CREATED });
    }

    async updateItem(req: Request, res: Response): Promise<void> {
        const { params, body } = req.validated!;
        const { itemId } = params;
        await this._itemService.updateItem(itemId, body);
        res.status(HttpStatus.OK).json({ success: true, message: Messages.ITEM_UPDATED });
    }

    async remove(req: Request, res: Response): Promise<void> {
        const { params } = req.validated!;
        const { itemId } = params;
        await this._itemService.removeItem(itemId);
        res.status(HttpStatus.OK).json({ success: true });
    }

    async getAllItems(req: Request, res: Response): Promise<void> {
        const { query } = req.validated!;
        const { search, page } = query;
        const result = await this._itemService.getAllItemsForTable(search, page ? Number(page) : 1);
        res.status(HttpStatus.OK).json({ success: true, itemData: result });
    }

    async getAllItemsList(req: Request, res: Response): Promise<void> {
        const result = await this._itemService.getItems();
        res.status(HttpStatus.OK).json({ success: true, itemData: result });
    }
}
