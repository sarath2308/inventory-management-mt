import { Router } from "express";
import { AuthRoutes } from "./auth.routes";
import { wrapAsyncController } from "@/utils/wrap.controller";
import container from "@/di/di.container";
import { AuthController } from "@/contollers/auth.controller";
import { TYPES } from "@/types/inversify/types";

export function EntryRoutes() {
    const router = Router();

    const authController = wrapAsyncController(container.get<AuthController>(TYPES.AuthController));

    router.use("/auth", AuthRoutes(authController));
    return router;
}
