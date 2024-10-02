import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as admin from "firebase-admin"
import { getAuth } from "firebase-admin/auth"

@Injectable()
export class FirebaseConfig {
    constructor(private readonly configService: ConfigService) {}
    
    getFirebaseConfig() {
        return {
            type: this.configService.get('FIREBASE_TYPE'),
            project_id: this.configService.get('FIREBASE_PRIVATE_ID'),
            private_key_id: this.configService.get('FIREBASE_KEY_ID'),
            private_key: this.configService.get('FIREBASE_PRIVATE_KEY'),
            client_email: this.configService.get('FIREBASE_CLIENT_EMAIL'),
            client_id: this.configService.get('FIREBASE_CLIENT_ID'),
            auth_uri: this.configService.get('FIREBASE_AUTH_URI'),
            token_uri: this.configService.get('FIREBASE_TOKEN_URI'),
            auth_provider_x509_cert_url: this.configService.get('FIREBASE_AUTH_CERT_URL'),
            client_x509_cert_url: this.configService.get('FIREBASE_CLIENT_CERT_URL'),
            universe_domain: this.configService.get('FIREBASE_UNIVERSE_DOMAIN'),
        }
    }
}