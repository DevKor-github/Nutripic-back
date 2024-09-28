import { Injectable } from "@nestjs/common";
import * as admin from "firebase-admin";
import firebaseConfig from "./firebase.config";

@Injectable()
export class FirebaseService {
    private firebaseService: admin.app.App;

    constructor() {
        this.firebaseService = admin.initializeApp({
            credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount)
        })
    }

    getAuth = (): admin.auth.Auth => {
        return this.firebaseService.auth();
    }
}