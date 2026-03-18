import { HttpStatus } from "@/constants/http.status";
import { Messages } from "@/constants/messages";
import { AppError } from "@/error/app.error";
import { IAuthService } from "@/interface/auth/auth.service.interface";
import { IPasswordService } from "@/interface/password.service.interface";
import { IUserRepo } from "@/interface/user/user.repo.interface";
import { LoginDataType } from "@/schema/auth/auth.login.schema";
import { UserResponseType } from "@/schema/user/user.response.schema";
import { TYPES } from "@/types/inversify/types";
import { ITokenService } from "@/utils/token.service";
import { inject } from "inversify";
import { injectable } from "inversify";

@injectable()
export class AuthService implements IAuthService {
    constructor(
        @inject(TYPES.IUserRepo) private _userRepo: IUserRepo,
        @inject(TYPES.IPasswordService) private _passwordService: IPasswordService,
        @inject(TYPES.ITokenService) private _tokenService: ITokenService,
    ) {}

    async login(payload: LoginDataType): Promise<{ accessToken: string }> {
        const userData = await this._userRepo.findByEmail(payload.email);
        if (!userData) {
            throw new AppError(Messages.INVALID_CREDENTIALS, HttpStatus.UNAUTHORIZED);
        }
        const check = await this._passwordService.comparePassword(
            userData.password,
            payload.password,
        );
        if (!check) {
            throw new AppError(Messages.INCORRECT_PASSWORD, HttpStatus.UNAUTHORIZED);
        }

        const accessToken = await this._tokenService.signAccessToken({
            userId: String(userData._id),
        });
        return { accessToken };
    }

    async getUser(userId: string): Promise<UserResponseType> {
        const userData = await this._userRepo.findById(userId);
        if (!userData) {
            throw new AppError(Messages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }
        return { name: userData.name, email: userData.email };
    }
}
