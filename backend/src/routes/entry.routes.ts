import { Router } from "express";
import { AuthRoutes } from "./auth.routes";
import { wrapAsyncController } from "@/utils/wrap.controller";
import container from "@/di/di.container";
import { AuthController } from "@/contollers/auth.controller";
import { TYPES } from "@/types/inversify/types";
import { ItemsController } from "@/contollers/items.controller";
import { IAuthenticateMiddleware } from "@/interface/auth/auth.middleware.interface";
import { ItemRoutes } from "./item.routes";
import { CustomerController } from "@/contollers/customer.controller";
import { CustomerRoutes } from "./customer.routes";
import { SalesController } from "@/contollers/sale.controller";
import { SalesRoutes } from "./sales.routes";

export function EntryRoutes() {
    const router = Router();

    const authController = wrapAsyncController(container.get<AuthController>(TYPES.AuthController));
    const itemController = wrapAsyncController(
        container.get<ItemsController>(TYPES.ItemsController),
    );
    const authMiddleware = wrapAsyncController(
        container.get<IAuthenticateMiddleware>(TYPES.IAuthMiddleware),
    );

    const customerController = wrapAsyncController(
        container.get<CustomerController>(TYPES.CustomerController),
    );

    const salesController = wrapAsyncController(
        container.get<SalesController>(TYPES.SalesController),
    );

    router.use("/auth", AuthRoutes(authController));
    router.use("/items", authMiddleware.handle.bind(authMiddleware), ItemRoutes(itemController));
    router.use(
        "/customers",
        authMiddleware.handle.bind(authMiddleware),
        CustomerRoutes(customerController),
    );
    router.use("/sales", authMiddleware.handle.bind(authMiddleware), SalesRoutes(salesController));

    return router;
}
