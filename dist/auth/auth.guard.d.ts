import { ExecutionContext, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { FirebaseService } from './firebase/firebase.service';
export declare const IS_PUBLIC_KEY = "isPublic";
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export declare class FirebaseAuthGuard implements CanActivate {
    private readonly firebaseService;
    private readonly reflector;
    private logger;
    private auth;
    constructor(firebaseService: FirebaseService, reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractToken;
}
