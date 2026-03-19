import { ItemsController } from "@/contollers/items.controller";
import { validateRequest } from "@/middleware/validation.middleware";
import { GetItemsSchema } from "@/schema/items/item.get.schema";
import { RemoveItemSchema } from "@/schema/items/item.remove.schema";
import { CreateItemSchema } from "@/schema/items/items.create.schema";
import { UpdateItemSchema } from "@/schema/items/items.update.schema";
import { Router } from "express";

export function ItemRoutes(controller: ItemsController) {
    const router = Router();
    router.get("/", validateRequest(GetItemsSchema), controller.getAllItems.bind(controller));
    router.get("/options", controller.getAllItemsList.bind(controller));
    router.post("/", validateRequest(CreateItemSchema), controller.createItem.bind(controller));
    router.patch(
        "/:itemId",
        validateRequest(UpdateItemSchema),
        controller.updateItem.bind(controller),
    );
    router.delete(
        "/:itemId",
        validateRequest(RemoveItemSchema),
        controller.remove.bind(controller),
    );

    return router;
}
