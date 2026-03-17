import { ISales } from "@/model/sales.collection ";
import { SalesResponseSchema } from "@/schema/sales/sales.response.schema";

export function SalesMapper(sale: ISales) {
    const customerName =
        typeof sale.customerId === "object" && "name" in sale.customerId
            ? sale.customerId.name
            : "Cash Sale";

    const s = {
        id: String(sale._id),
        totalItems: sale.items.length,
        customerName,
        totalAmount: sale.totalAmount,
        date: sale.date.toISOString().split("T")[0],
        paymentType: sale.paymentType,
    };

    return SalesResponseSchema.parse(s);
}
