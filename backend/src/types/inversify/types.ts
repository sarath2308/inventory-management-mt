import { AuthController } from "@/contollers/auth.controller";
import { symbol } from "zod";

export const TYPES = {
    ISaleModel: Symbol.for("ISaleModel"),
    ICustomerModel: Symbol.for("ICustomerModel"),
    ItemModel: Symbol.for("ItemModel"),
    IUserModel: Symbol.for("IUserModel"),
    ITokenService: Symbol.for("ITokenService"),
    CustomerModel: Symbol.for("ICustomerModel"),
    ISalesRepo: Symbol.for("ISalesRepo"),
    ICustomerRepo: Symbol.for("ICustomerRepo"),
    ItemsRepo: Symbol.for("ItemsRepo"),
    IUserRepo: Symbol.for("IUserRepo"),
    ItemService: Symbol.for("ItemService"),
    ISaleService: Symbol.for("ISaleService"),
    ICustomerService: Symbol.for("ICustomerService"),
    IPasswordService: Symbol.for("IPasswordService"),
    IAuthService: Symbol.for("IAuthService"),
    AuthController: Symbol.for("AuthController"),
    ItemsController: Symbol.for("ItemController"),
    CustomerController: Symbol.for("CustomerController"),
    SalesController: Symbol.for("SalesController"),
    IAuthMiddleware: Symbol.for("IAuthMiddleware"),
};
