import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { AWSError, S3 } from 'aws-sdk';
import awsConfig from './aws.config';

@Injectable()
export class AwsService {
  constructor(
    @Inject(awsConfig.KEY) private config: ConfigType<typeof awsConfig>
  ) {
    this.s3Client = new S3({
      region: config.region,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }
  private s3Client: S3;

  async uploadFile(userId: string, file: Express.Multer.File): Promise<string> {
    if (!file) return;
    const ext = file.mimetype.split('/')[1]; // 파일 확장자
    const originalName = file.originalname.split('.').slice(0, -1); // 파일 원본 이름
    const fileName = `${userId}-${new Date().getTime()}-${originalName}`; // 파일 저장 이름
    const request = this.s3Client.putObject({
      Bucket: this.config.bucketName,
      Key: `diary/${fileName}.${ext}`,
      Body: file.buffer,
      ContentType: `image/${ext}`,
    }); // 파일 이름을 client에서 받아와서 저장 가능한지 확인 후 수정 가능
    request.send((err: AWSError) => {
      if (err) throw err; // TODO - AWSError에 대한 처리 필요
    });

    return `https://${this.config.bucketName}.s3.${this.config.region}.amazonaws.com/diary/${fileName}.${ext}`;
  }

  async getPresignedUrl(fileName: string): Promise<string> {
    const url = this.s3Client.getSignedUrl('putObject', {
      Bucket: this.config.bucketName,
      Key: `diary/${fileName}`,
      Expires: 45,
    });
    return url;
  }
}
