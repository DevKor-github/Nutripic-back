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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsService = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const aws_config_1 = require("./aws.config");
let AwsService = class AwsService {
    constructor(config) {
        this.config = config;
        this.s3Client = new aws_sdk_1.S3({
            region: config.region,
            credentials: {
                accessKeyId: config.accessKeyId,
                secretAccessKey: config.secretAccessKey,
            },
        });
    }
    async uploadFile(userId, file) {
        if (!file)
            return;
        const ext = file.mimetype.split('/')[1];
        const originalName = file.originalname.split('.').slice(0, -1);
        const fileName = `${userId}-${new Date().getTime()}-${originalName}`;
        const request = this.s3Client.putObject({
            Bucket: this.config.bucketName,
            Key: `diary/${fileName}.${ext}`,
            Body: file.buffer,
            ContentType: `image/${ext}`,
        });
        request.send((err) => {
            if (err)
                throw err;
        });
        return `https://${this.config.bucketName}.s3.${this.config.region}.amazonaws.com/diary/${fileName}.${ext}`;
    }
    async getPresignedUrl(fileName) {
        const url = this.s3Client.getSignedUrl('putObject', {
            Bucket: this.config.bucketName,
            Key: `diary/${fileName}`,
            Expires: 45,
        });
        if (!url)
            throw new common_1.BadGatewayException('URL 생성에 실패했습니다.');
        return url;
    }
};
exports.AwsService = AwsService;
exports.AwsService = AwsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(aws_config_1.default.KEY)),
    __metadata("design:paramtypes", [void 0])
], AwsService);
//# sourceMappingURL=aws.service.js.map