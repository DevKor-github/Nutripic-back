import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createUser(uid: string): Promise<string>;
    deleteUser(uid: string): Promise<string>;
    checkUserExists(uid: string): Promise<boolean>;
}
