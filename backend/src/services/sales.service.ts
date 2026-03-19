import { ISalesRepo } from "@/interface/sales/sales.repo.interface";
import { ISalesService } from "@/interface/sales/sales.service.interface";
import { CreateSalesDataType } from "@/schema/sales/sales.create.schema";
import { TYPES } from "@/types/inversify/types";
import { PAYMENT_TYPE } from "@/types/payment.type";
import { injectable } from "inversify";
import { inject } from "inversify";
import mongoose from "mongoose";
import { ItemsService } from "./items.service";
import { AppError } from "@/error/app.error";
import { Messages } from "@/constants/messages";
import { HttpStatus } from "@/constants/http.status";
import { SalesMapper } from "@/mapper/sales.mapper";
import { SalesResponseDataType } from "@/schema/sales/sales.response.schema";

@injectable()
export class SalesService implements ISalesService {
    constructor(
        @inject(TYPES.ISalesRepo) private _salesRepo: ISalesRepo,
        @inject(TYPES.ItemService) private _itemService: ItemsService,
    ) {}

    async createSale(payload: CreateSalesDataType): Promise<void> {
        let finalAmount = 0;

        const processedItems = [];

        for (const saleItem of payload.items) {
            const itemData = await this._itemService.findById(saleItem.itemId);

            if (!itemData) {
                throw new AppError(Messages.ITEM_NOT_FOUND, HttpStatus.NOT_FOUND);
            }

            if (itemData.quantity < saleItem.quantity) {
                throw new AppError(Messages.ITEM_OUT_OF_STOCK, HttpStatus.BAD_REQUEST);
            }

            const itemTotal = itemData.price * saleItem.quantity;

            finalAmount += itemTotal;

            processedItems.push({
                itemId: new mongoose.Types.ObjectId(saleItem.itemId),
                quantity: saleItem.quantity,
                price: itemData.price,
                total: itemTotal,
            });

            //inventory reduce -----------

            await this._itemService.reduceCount(saleItem.itemId, saleItem.quantity);
        }

        const customerObjId = new mongoose.Types.ObjectId(payload.customerId);

        await this._salesRepo.create({
            customerId: customerObjId,
            items: processedItems,
            totalAmount: finalAmount,
            date: new Date(),
            paymentType:
                payload.paymentType === PAYMENT_TYPE.CASH ? PAYMENT_TYPE.CASH : PAYMENT_TYPE.ONLINE,
        });
    }
    async removeSale(salesId: string): Promise<void> {
        await this._salesRepo.removeSales(salesId);
    }
    async getAllSales(start: string, end: string, page: number): Promise<SalesResponseDataType[]> {
        const salesData = await this._salesRepo.getAllSales(start, end, page);

        const responseData = salesData.map((sale) => {
            return SalesMapper(sale);
        });

        return responseData;
    }

    async getSalesDataForLedger(
        customerId: string,
        start: string,
        end: string,
        page: number,
    ): Promise<SalesResponseDataType[]> {
        const salesData = await this._salesRepo.getSaleByCustomer(customerId, start, end, page);
        const responseData = salesData.map((sale) => SalesMapper(sale));

        return responseData;
    }
}
