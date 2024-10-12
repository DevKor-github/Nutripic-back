import {
  Injectable,
  Logger,
} from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  private logger: Logger = new Logger(AuthService.name);

  async createFirebaseToken(uid: string): Promise<string> {
    return admin.auth().createCustomToken(uid);
  }

}
