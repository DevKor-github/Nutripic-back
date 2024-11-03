import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { StorageService } from 'src/storage/storage.service';

@Module({
  imports: [AuthModule],
  providers: [RecipeService, PrismaService, UserService, StorageService],
  controllers: [RecipeController],
})
export class RecipeModule {}
