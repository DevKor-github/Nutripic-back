import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { S3 } from 'aws-sdk';
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

  async uploadFiles(
    userId: string,
    files: Express.Multer.File[]
  ): Promise<string[]> {
    if (!files) return;
    return Promise.all(
      files.map(async (file) => {
        const ext = file.mimetype.split('/')[1]; // 파일 확장자
        const originalName = file.originalname.split('.').slice(0, -1); // 파일 원본 이름
        const fileName = `${userId}-${new Date().getTime()}-${originalName}`; // 파일 저장 이름
        const request = this.s3Client.putObject({
          Bucket: this.config.bucketName,
          Key: `diary/${fileName}.${ext}`,
          Body: file.buffer,
          ContentType: `image/${ext}`,
        });
        request.send((err) => {
          if (err) throw err;
        });
        return `https://${this.config.bucketName}.s3.${this.config.region}.amazonaws.com/diary/${fileName}.${ext}`;
      })
    ).then((urls) => {
      return urls;
    });
  }
}
