import { AuthController } from "@/contollers/auth.controller";
import { validateRequest } from "@/middleware/validation.middleware";
import { LoginSchema } from "@/schema/auth/auth.login.schema";
import { Router } from "express";

export function AuthRoutes(controller: AuthController) {
    const router = Router();

    router.post("/login", validateRequest(LoginSchema), controller.login.bind(controller));

    return router;
}
