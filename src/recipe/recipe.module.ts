import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { StorageService } from 'src/storage/storage.service';
import { RecipeRepository } from './recipe.respository';
import { StorageRepository } from 'src/storage/storage.repository';

@Module({
  imports: [AuthModule],
  providers: [
    RecipeService,
    PrismaService,
    UserService,
    StorageService,
    StorageRepository,
    RecipeRepository,
  ],
  controllers: [RecipeController],
})
export class RecipeModule {}
