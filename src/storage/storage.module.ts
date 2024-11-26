import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { StorageRepository } from './storage.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [StorageController],
  providers: [StorageService, PrismaService, StorageRepository],
})
export class StorageModule {}
