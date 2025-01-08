import { UserRepository } from './user.repository';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    createUser(uid: string): Promise<string>;
    deleteUser(uid: string): Promise<string>;
}
