import { HttpStatus } from "@/constants/http.status";
import { Messages } from "@/constants/messages";
import { AppError } from "@/error/app.error";
import { ICustomersRepo } from "@/interface/customer/customers.repo.interface";
import { ICustomerService } from "@/interface/customer/customers.service.interface";
import { CustomerMapper } from "@/mapper/customer.mapper";
import { CreateCustomerType } from "@/schema/customers/customer.create.schema";
import { CustomerResponseType } from "@/schema/customers/customer.response.schema";
import { UpdateCustomerType } from "@/schema/customers/customer.update.schema";
import { TYPES } from "@/types/inversify/types";
import { inject } from "inversify";
import { injectable } from "inversify";

@injectable()
export class CustomerService implements ICustomerService {
    constructor(@inject(TYPES.ICustomerRepo) private _customerRepo: ICustomersRepo) {}

    async createCustomer(payload: CreateCustomerType): Promise<void> {
        const duplicate = await this._customerRepo.customerWithName(payload.name);
        if (duplicate) {
            throw new AppError(Messages.CUSTOMER_DUPLICATE, HttpStatus.BAD_REQUEST);
        }
        const createdCustomer = await this._customerRepo.create({ ...payload });
        if (!createdCustomer) {
            throw new AppError(Messages.CUSTOMER_NOT_CREATED, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateCustomer(customerId: string, payload: UpdateCustomerType): Promise<void> {
        const customerData = await this._customerRepo.findById(customerId);

        console.log();

        if (!customerData) {
            throw new AppError(Messages.CUSTOMER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        if (payload.name) {
            const duplicate = await this._customerRepo.customerWithNameOtherThan(
                customerId,
                payload.name,
            );
            if (duplicate) {
                throw new AppError(Messages.CUSTOMER_DUPLICATE, HttpStatus.BAD_REQUEST);
            }
        }

        customerData.name = payload.name ?? customerData.name;
        customerData.address = payload.address ?? customerData.address;
        customerData.mobile = payload.mobile ?? customerData.mobile;
        await customerData.save();
    }
    async removeCustomer(customerId: string): Promise<void> {
        await this._customerRepo.remove(customerId);
    }
    async getAllCustomerForTable(search: string, page: number): Promise<CustomerResponseType[]> {
        const customersData = await this._customerRepo.getAllCustomers(search, page);
        const responseObj = customersData.map((customer) => {
            return CustomerMapper(customer);
        });

        return responseObj;
    }

    async findByCustomerId(customerId: string): Promise<CustomerResponseType | null> {
        const customerData = await this._customerRepo.findById(customerId);
        if (!customerData) return null;
        return CustomerMapper(customerData);
    }

    async getCustomers(): Promise<CustomerResponseType[]> {
        const customerData = await this._customerRepo.getCustomerList();
        const responsData = customerData.map((customer) => CustomerMapper(customer));

        return responsData;
    }
}
