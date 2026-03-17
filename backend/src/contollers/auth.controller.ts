import { HttpStatus } from "@/constants/http.status";
import { Messages } from "@/constants/messages";
import { IAuthService } from "@/interface/auth/auth.service.interface";
import { TYPES } from "@/types/inversify/types";
import { Request, Response } from "express";
import { injectable } from "inversify";
import { inject } from "inversify";

@injectable()
export class AuthController {
    constructor(@inject(TYPES.IAuthService) private _authService: IAuthService) {}

    async login(req: Request, res: Response): Promise<void> {
        const result = await this._authService.login(req.body);

        res.cookie("accessToken", result.accessToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(HttpStatus.OK).json({
            success: true,
            message: Messages.LOGIN_SUCCESS,
        });
    }
}
