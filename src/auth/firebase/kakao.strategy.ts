import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-kakao";

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
    constructor(private readonly configService: ConfigService) {
        super({
            clientID: configService.get('KAKAO_CLIENT_ID'), 
            callbackURL: `${configService.get('BACKEND_URL')}auth/kakao`, 
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: Function,
    ) {
        const user = {
            uid: profile.id,
            email: profile._json && profile._json.kaccout_email,
        };
        done(null, user);
    }

}