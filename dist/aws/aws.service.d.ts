import { ConfigType } from '@nestjs/config';
import awsConfig from './aws.config';
export declare class AwsService {
    private config;
    constructor(config: ConfigType<typeof awsConfig>);
    private s3Client;
    uploadFile(userId: string, file: Express.Multer.File): Promise<string>;
    getPresignedUrl(fileName: string): Promise<string>;
}
