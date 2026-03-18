import { CreateCustomerType } from "@/schema/customers/customer.create.schema";
import { CustomerResponseType } from "@/schema/customers/customer.response.schema";
import { UpdateCustomerType } from "@/schema/customers/customer.update.schema";

export interface ICustomerService {
    createCustomer: (payload: CreateCustomerType) => Promise<void>;
    updateCustomer: (customerId: string, payload: UpdateCustomerType) => Promise<void>;
    getAllCustomer: (search: string,page: number) => Promise<CustomerResponseType[]>;
    removeCustomer: (customerId: string) => Promise<void>;
    findByCustomerId: (customerId: string) => Promise<CustomerResponseType | null>;
}
