import { ICustomers } from "@/model/customers.model";
import { IBaseRepo } from "@/repo/base";

export interface ICustomersRepo extends IBaseRepo<ICustomers> {
    customerWithName: (name: string) => Promise<ICustomers | null>;
    customerWithNameOtherThan: (customerId: string, name: string) => Promise<ICustomers | null>;
    remove: (customerId: string) => Promise<void>;
    getAllCustomers: (search: string, page: number) => Promise<ICustomers[]>;
    getCustomerList: () => Promise<ICustomers[]>;
}
