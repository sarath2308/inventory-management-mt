import { HttpStatus } from "@/constants/http.status";
import { Messages } from "@/constants/messages";
import { IAuthRequest } from "@/interface/auth/auth.request.interface";
import { ICustomerService } from "@/interface/customer/customers.service.interface";
import { TYPES } from "@/types/inversify/types";
import { Response } from "express";
import { inject } from "inversify";

export class CustomerController {
    constructor(@inject(TYPES.ICustomerService) private _customerService: ICustomerService) {}

    async createCustomer(req: IAuthRequest, res: Response): Promise<void> {
        await this._customerService.createCustomer(req.body);
        res.status(HttpStatus.CREATED).json({ success: true, message: Messages.CUSTOMER_CREATED });
    }

    async updateCustomer(req: IAuthRequest, res: Response): Promise<void> {
        const customerId = req.params.customerId as string;
        await this._customerService.updateCustomer(customerId, req.body);
        res.status(HttpStatus.OK).json({ success: true, message: Messages.CUSTOMER_UPDATED });
    }

    async removeCustomer(req: IAuthRequest, res: Response): Promise<void> {
        const customerId = req.params.customerId as string;
        await this._customerService.removeCustomer(customerId);
        res.status(HttpStatus.OK).json({ success: true });
    }

    async getAllCustomers(req: IAuthRequest, res: Response): Promise<void> {
        const search = req.query.search as string;
        const page = (req.query.page as string) ?? 1;
        const customerData = await this._customerService.getAllCustomerForTable(
            search,
            Number(page),
        );
        res.status(HttpStatus.OK).json({ success: true, customerData });
    }

    async getAllCustomersList(req: IAuthRequest, res: Response): Promise<void> {
        const customerData = await this._customerService.getCustomers();
        res.status(HttpStatus.OK).json({ success: true, customerData });
    }
}
