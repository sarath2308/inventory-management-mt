import { ISales } from "@/model/sales.collection ";
import { IBaseRepo } from "@/repo/base";

export interface ISalesRepo extends IBaseRepo<ISales> {
    removeSales: (saleId: string) => Promise<void>;
    getAllSales: () => Promise<ISales[] | []>;
}
