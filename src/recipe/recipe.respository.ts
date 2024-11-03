import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RecipeRepository {
  constructor(private prisma: PrismaService) {}
}
