import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile() {
    return this.prisma.profile.findFirst({
      include: {
        skills: true,
        experience: true,
        projects: true,
      },
    });
  }
}