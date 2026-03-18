import { AuthController } from "@/contollers/auth.controller";
import container from "@/di/di.container";
import { IAuthenticateMiddleware } from "@/interface/auth/auth.middleware.interface";
import { validateRequest } from "@/middleware/validation.middleware";
import { LoginSchema } from "@/schema/auth/auth.login.schema";
import { TYPES } from "@/types/inversify/types";
import { wrapAsyncController } from "@/utils/wrap.controller";
import { Router } from "express";

export function AuthRoutes(controller: AuthController) {
    const router = Router();
    const authMiddleware = wrapAsyncController(
        container.get<IAuthenticateMiddleware>(TYPES.IAuthMiddleware),
    );

    router.get(
        "/me",
        authMiddleware.handle.bind(authMiddleware),
        controller.getUser.bind(controller),
    );
    router.post("/login", validateRequest(LoginSchema), controller.login.bind(controller));

    return router;
}
