import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { StorageService } from 'src/storage/storage.service';
import { RecipeRepository } from './recipe.repository';
import { StorageRepository } from 'src/storage/storage.repository';

@Module({
  imports: [AuthModule],
  providers: [
    RecipeService,
    PrismaService,
    StorageService,
    StorageRepository,
    RecipeRepository,
  ],
  controllers: [RecipeController],
})
export class RecipeModule {}
