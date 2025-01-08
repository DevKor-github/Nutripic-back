import * as admin from 'firebase-admin';
import { FirebaseConfig } from './firebase.config';
export declare class FirebaseService {
    private readonly firebaseConfig;
    private firebaseService;
    constructor(firebaseConfig: FirebaseConfig);
    getAuth: () => admin.auth.Auth;
}
