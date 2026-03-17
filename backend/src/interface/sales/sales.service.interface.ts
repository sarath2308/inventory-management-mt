import { CreateSalesDataType } from "@/schema/sales/sales.create.schema";
import { SalesResponseDataType } from "@/schema/sales/sales.response.schema";

export interface ISalesService {
    createSale: (payload: CreateSalesDataType) => Promise<void>;
    removeSale: (salesId: string) => Promise<void>;
    getAllSales: () => Promise<SalesResponseDataType[]>;
}
