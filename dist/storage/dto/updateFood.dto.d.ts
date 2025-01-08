import { StorageType } from '@prisma/client';
export declare class UpdateFoodDto {
    id: number;
    storageType?: StorageType;
    name?: string;
    class1?: string;
    class2?: string;
    icon?: string;
    addedDate?: string | Date;
    expireDate?: string | Date;
    expired?: boolean;
}
