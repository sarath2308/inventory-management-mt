import { CustomerController } from "@/contollers/customer.controller";
import { validateRequest } from "@/middleware/validation.middleware";
import { CreateCustomerSchema } from "@/schema/customers/customer.create.schema";
import { RemoveCustomerSchema } from "@/schema/customers/customer.remove.schema";
import { UpdateCustomerSchema } from "@/schema/customers/customer.update.schema";
import { Router } from "express";

export function CustomerRoutes(controller: CustomerController) {
    const router = Router();

    router.get("/", controller.getAllCustomers.bind(controller));
    router.post(
        "/",
        validateRequest(CreateCustomerSchema),
        controller.createCustomer.bind(controller),
    );
    router.patch(
        "/:customerId",
        validateRequest(UpdateCustomerSchema),
        controller.updateCustomer.bind(controller),
    );
    router.delete(
        "/:customerId",
        validateRequest(RemoveCustomerSchema),
        controller.removeCustomer.bind(controller),
    );
    return router;
}
