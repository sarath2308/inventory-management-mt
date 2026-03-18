import { IUser } from "@/model/user.model";
import { BaseRepo } from "./base";
import { IUserRepo } from "@/interface/user/user.repo.interface";
import { injectable } from "inversify";
import { inject } from "inversify";
import { TYPES } from "@/types/inversify/types";
import { Model } from "mongoose";

@injectable()
export class UserRepo extends BaseRepo<IUser> implements IUserRepo {
    constructor(@inject(TYPES.IUserModel) private _userModel: Model<IUser>) {
        super(_userModel);
    }

    async findByEmail(email: string): Promise<IUser | null> {
        return await this._userModel.findOne({ email: email });
    }
}
