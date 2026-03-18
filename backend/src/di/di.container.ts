import { AuthController } from "@/contollers/auth.controller";
import { CustomerController } from "@/contollers/customer.controller";
import { ItemsController } from "@/contollers/items.controller";
import { SalesController } from "@/contollers/sale.controller";
import { IAuthenticateMiddleware } from "@/interface/auth/auth.middleware.interface";
import { IAuthService } from "@/interface/auth/auth.service.interface";
import { ICustomersRepo } from "@/interface/customer/customers.repo.interface";
import { ICustomerService } from "@/interface/customer/customers.service.interface";
import { ItemsRepoInterface } from "@/interface/items/items.repo.interface";
import { IItemsService } from "@/interface/items/items.service.interface";
import { IPasswordService } from "@/interface/password.service.interface";
import { ISalesRepo } from "@/interface/sales/sales.repo.interface";
import { ISalesService } from "@/interface/sales/sales.service.interface";
import { IUserRepo } from "@/interface/user/user.repo.interface";
import { AuthenticateMiddleware } from "@/middleware/authentication.middleware";
import { CustomersModel, ICustomers } from "@/model/customers.model";
import { Iitems, ItemsModel } from "@/model/item.model";
import { ISales, SalesModel } from "@/model/sales.model ";
import { IUser, UserModel } from "@/model/user.model";
import { CustomersRepo } from "@/repo/customers.repo";
import { ItemsRepo } from "@/repo/items.repo";
import { SalesRepo } from "@/repo/sales.repo";
import { UserRepo } from "@/repo/user.repo";
import { AuthService } from "@/services/auth.service";
import { CustomerService } from "@/services/customer.service";
import { ItemsService } from "@/services/items.service";
import { SalesService } from "@/services/sales.service";
import { TYPES } from "@/types/inversify/types";
import { PasswordService } from "@/utils/password.service";
import { ITokenService, TokenService } from "@/utils/token.service";
import { Container } from "inversify";
import { Model } from "mongoose";
import "reflect-metadata";

const container = new Container();

//Model
container.bind<Model<ISales>>(TYPES.ISaleModel).toConstantValue(SalesModel);
container.bind<Model<IUser>>(TYPES.IUserModel).toConstantValue(UserModel);
container.bind<Model<ICustomers>>(TYPES.ICustomerModel).toConstantValue(CustomersModel);
container.bind<Model<Iitems>>(TYPES.ItemModel).toConstantValue(ItemsModel);

//Repository
container.bind<ISalesRepo>(TYPES.ISalesRepo).to(SalesRepo).inSingletonScope();
container.bind<IUserRepo>(TYPES.IUserRepo).to(UserRepo).inSingletonScope();
container.bind<ICustomersRepo>(TYPES.ICustomerRepo).to(CustomersRepo).inSingletonScope();
container.bind<ItemsRepoInterface>(TYPES.ItemsRepo).to(ItemsRepo).inSingletonScope();

//services
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService).inSingletonScope();
container.bind<ISalesService>(TYPES.ISaleService).to(SalesService).inSingletonScope();
container.bind<ICustomerService>(TYPES.ICustomerService).to(CustomerService).inSingletonScope();
container.bind<IItemsService>(TYPES.ItemService).to(ItemsService).inSingletonScope();

//controllers
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container.bind<ItemsController>(TYPES.ItemsController).to(ItemsController);
container.bind<CustomerController>(TYPES.CustomerController).to(CustomerController);
container.bind<SalesController>(TYPES.SalesController).to(SalesController);

//middleware
container.bind<IAuthenticateMiddleware>(TYPES.IAuthMiddleware).to(AuthenticateMiddleware);

//utils

container.bind<ITokenService>(TYPES.ITokenService).to(TokenService).inSingletonScope();
container.bind<IPasswordService>(TYPES.IPasswordService).to(PasswordService).inSingletonScope();

export default container;
