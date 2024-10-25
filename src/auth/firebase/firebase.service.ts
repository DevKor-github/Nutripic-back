import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FirebaseConfig } from './firebase.config';

@Injectable()
export class FirebaseService {
  private firebaseService: admin.app.App;

  constructor(private readonly firebaseConfig: FirebaseConfig) {
    this.firebaseService = admin.initializeApp({
      credential: admin.credential.cert(
        this.firebaseConfig.getFirebaseConfig() as admin.ServiceAccount
      ),
    });
  }

  getAuth = (): admin.auth.Auth => {
    return this.firebaseService.auth();
  };
}
