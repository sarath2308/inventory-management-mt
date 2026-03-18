type ItemType = {
    itemId: string;
    quantity: number;
};

export type CreateSalePayloadType = {
    customerId: string;
    items: ItemType[];
    paymentType: "cash" | "online";
};
