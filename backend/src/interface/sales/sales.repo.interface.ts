import { ISales } from "@/model/sales.model ";
import { IBaseRepo } from "@/repo/base";

export interface ISalesRepo extends IBaseRepo<ISales> {
    removeSales: (saleId: string) => Promise<void>;
    getAllSales: (start: string, end: string, page: number) => Promise<ISales[] | []>;
}
