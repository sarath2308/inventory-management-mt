import { ICustomersRepo } from "@/interface/customer/customers.repo.interface";
import { ICustomers } from "@/model/customers.model";
import { TYPES } from "@/types/inversify/types";
import { inject } from "inversify";
import { injectable } from "inversify";
import mongoose, { Model, mongo } from "mongoose";
import { BaseRepo } from "./base";

@injectable()
export class CustomersRepo extends BaseRepo<ICustomers> implements ICustomersRepo {
    constructor(@inject(TYPES.CustomerModel) private _customerModel: Model<ICustomers>) {
        super(_customerModel);
    }
    async customerWithName(name: string): Promise<ICustomers | null> {
        return await this._customerModel.findOne({
            name: { $regex: `^${name}$`, $options: "i" },
            isDeleted: false,
        });
    }
    async customerWithNameOtherThan(customerId: string, name: string): Promise<ICustomers | null> {
        return await this._customerModel.findOne({
            _id: { $ne: new mongoose.Types.ObjectId(customerId) },
            isDeleted: false,
        });
    }
    async remove(customerId: string): Promise<void> {
        await this._customerModel.updateOne(
            { _id: new mongoose.Types.ObjectId(customerId) },
            { $set: { isDeleted: true } },
        );
    }
    async getAllCustomers(): Promise<ICustomers[]> {
        return await this._customerModel.find({ isDeleted: false });
    }
}
