import { SalesController } from "@/contollers/sale.controller";
import { validateRequest } from "@/middleware/validation.middleware";
import { CreateSalesSchema } from "@/schema/sales/sales.create.schema";
import { RemoveSalesSchema } from "@/schema/sales/sales.remove.schema";
import { Router } from "express";

export function SalesRoutes(controller: SalesController) {
    const router = Router();
    router.get("/", controller.getAllSales.bind(controller));
    router.post("/", validateRequest(CreateSalesSchema), controller.createSales.bind(controller));
    router.delete(
        "/:saleId",
        validateRequest(RemoveSalesSchema),
        controller.removeSales.bind(controller),
    );

    return router;
}
