import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AwsService } from './aws.service';
import awsConfig from './aws.config';

@Module({
  imports: [ConfigModule.forFeature(awsConfig)],
  providers: [AwsService],
  exports: [AwsService],
})
export class AwsModule {}
