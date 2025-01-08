"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseConfig = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let FirebaseConfig = class FirebaseConfig {
    constructor(configService) {
        this.configService = configService;
    }
    getFirebaseConfig() {
        return {
            type: this.configService.get('FIREBASE_TYPE'),
            project_id: this.configService.get('FIREBASE_PROJECT_ID'),
            private_key_id: this.configService.get('FIREBASE_KEY_ID'),
            private_key: this.configService.get('FIREBASE_PRIVATE_KEY'),
            client_email: this.configService.get('FIREBASE_CLIENT_EMAIL'),
            client_id: this.configService.get('FIREBASE_CLIENT_ID'),
            auth_uri: this.configService.get('FIREBASE_AUTH_URI'),
            token_uri: this.configService.get('FIREBASE_TOKEN_URI'),
            auth_provider_x509_cert_url: this.configService.get('FIREBASE_AUTH_CERT_URL'),
            client_x509_cert_url: this.configService.get('FIREBASE_CLIENT_CERT_URL'),
            universe_domain: this.configService.get('FIREBASE_UNIVERSE_DOMAIN'),
        };
    }
};
exports.FirebaseConfig = FirebaseConfig;
exports.FirebaseConfig = FirebaseConfig = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FirebaseConfig);
//# sourceMappingURL=firebase.config.js.map