import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import * as admin from "firebase-admin"
import { getAuth } from "firebase-admin/auth"


export const getAdminAuth = () => {
    const serviceAccount = {
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.FIREBASE_PRIVATE_ID,
        private_key_id: process.env.FIREBASE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
        universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
    }

    const app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    })

    return getAuth(app);
}