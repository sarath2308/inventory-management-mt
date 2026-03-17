import { IPasswordService } from "@/interface/password.service.interface";
import bcrypt from "bcrypt";
import { injectable } from "inversify";

@injectable()
export class PasswordService implements IPasswordService {
    async hashPassword(password: string): Promise<string> {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    }
    async comparePassword(hash: string, password: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}
