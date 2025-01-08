import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    private logger;
    getHello(): string;
    handleKakaoCallback(body: {
        uid: string;
    }): Promise<{
        firebaseToken: string;
    }>;
}
