import { IUser } from "@/model/user.model";
import { IBaseRepo } from "@/repo/base";

export interface IUserRepo extends IBaseRepo<IUser> {
    findByEmail: (email: string) => Promise<IUser | null>;
}
