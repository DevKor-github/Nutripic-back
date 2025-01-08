import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUid(uid: string): string;
    createUser(uid: string): Promise<string>;
    deleteUser(uid: string): Promise<string>;
}
