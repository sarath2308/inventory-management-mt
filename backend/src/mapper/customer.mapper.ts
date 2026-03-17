import { ICustomers } from "@/model/customers.model";
import { CustomerResponseSchema } from "@/schema/customers/customer.response.schema";

export function CustomerMapper(customer: ICustomers) {
    const cus = {
        id: String(customer._id),
        name: customer.name,
        address: customer.address,
        mobile: customer.mobile,
    };

    return CustomerResponseSchema.parse(cus);
}
