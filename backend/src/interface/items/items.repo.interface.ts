import { Iitems } from "@/model/item.model";
import { BaseRepo } from "@/repo/base";

export interface ItemsRepoInterface extends BaseRepo<Iitems> {
    getItemWithSameName: (name: string) => Promise<Iitems | null>;
    findDuplicateItem: (itemId: string, name: string) => Promise<Iitems | null>;
    remove: (itemId: string) => Promise<void>;
    getAllItems: () => Promise<Iitems[]>;
}
