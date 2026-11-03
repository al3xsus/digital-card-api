import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileInput } from './dto/update-profile.input';
import { CreateSkillInput, UpdateSkillInput } from './dto/skill.input';
import { CreateProjectInput, UpdateProjectInput } from './dto/project.input';
import { CreateExperienceInput, UpdateExperienceInput } from './dto/experience.input';
import { CreateSocialInput, UpdateSocialInput } from './dto/social.input';


function isPrismaNotFoundError(error: unknown): error is { code: 'P2025' } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    error.code === 'P2025'
  );
}

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  // Helper to securely grab the single profile ID
  private async getProfileId(): Promise<string> {
    const profile = await this.prisma.profile.findFirst({ select: { id: true } });
    if (!profile) {
      throw new NotFoundException('Profile not found. Please seed the database first.');
    }
    return profile.id;
  }

  // --- Profile ---
  async getProfile() {
    return this.prisma.profile.findFirst({
      include: {
        skills: true,
        experience: true,
        projects: true,
        socials: true,
      },
    });
  }

  async updateProfile(input: UpdateProfileInput) {
    const id = await this.getProfileId();
    try {
      return await this.prisma.profile.update({
        where: { id },
        data: input,
        include: { skills: true, projects: true, experience: true, socials: true },
      });
    } catch (error) {
      if (isPrismaNotFoundError(error)) {
        throw new NotFoundException('Profile not found for update');
      }
      throw error;
    }
  }

  // --- Skills ---
  async addSkill(input: CreateSkillInput) {
    const profileId = await this.getProfileId();
    return this.prisma.skill.create({
      data: { ...input, profileId },
    });
  }

  async updateSkill(id: string, input: UpdateSkillInput) {
    try {
      return await this.prisma.skill.update({
        where: { id },
        data: input,
      });
    } catch (error) {
      if (isPrismaNotFoundError(error)) {
        throw new NotFoundException(`Skill with ID ${id} not found`);
      }
      throw error;
    }
  }

  async deleteSkill(id: string) {
    try {
      await this.prisma.skill.delete({ where: { id } });
      return true;
    } catch (error) {
      if (isPrismaNotFoundError(error)) {
        throw new NotFoundException(`Skill with ID ${id} not found`);
      }
      throw error;
    }
  }

  // --- Projects ---
  async addProject(input: CreateProjectInput) {
    const profileId = await this.getProfileId();
    return this.prisma.project.create({
      data: { ...input, profileId },
    });
  }

  async updateProject(id: string, input: UpdateProjectInput) {
    try {
      return await this.prisma.project.update({
        where: { id },
        data: input,
      });
    } catch (error) {
      if (isPrismaNotFoundError(error)) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }
      throw error;
    }
  }

  async deleteProject(id: string) {
    try {
      await this.prisma.project.delete({ where: { id } });
      return true;
    } catch (error) {
      if (isPrismaNotFoundError(error)) {
        throw new NotFoundException(`Project with ID ${id} not found`);
      }
      throw error;
    }
  }

  // --- Experiences ---
  async addExperience(input: CreateExperienceInput) {
    const profileId = await this.getProfileId();
    return this.prisma.experience.create({
      data: { ...input, profileId },
    });
  }

  async updateExperience(id: string, input: UpdateExperienceInput) {
    try {
      return await this.prisma.experience.update({
        where: { id },
        data: input,
      });
    } catch (error) {
      if (isPrismaNotFoundError(error)) {
        throw new NotFoundException(`Experience with ID ${id} not found`);
      }
      throw error;
    }
  }

  async deleteExperience(id: string) {
    try {
      await this.prisma.experience.delete({ where: { id } });
      return true;
    } catch (error) {
      if (isPrismaNotFoundError(error)) {
        throw new NotFoundException(`Experience with ID ${id} not found`);
      }
      throw error;
    }
  }

  // --- Social Methods ---
  async addSocial(input: CreateSocialInput) {
    const profileId = await this.getProfileId();
    return this.prisma.social.create({
      data: { ...input, profileId },
    });
  }

  async updateSocial(id: string, input: UpdateSocialInput) {
    try {
      return await this.prisma.social.update({
        where: { id },
        data: input,
      });
    } catch (error) {
      if (isPrismaNotFoundError(error)) {
        throw new NotFoundException(`Social with ID ${id} not found`);
      }
      throw error;
    }
  }

  async deleteSocial(id: string) {
    try {
      await this.prisma.social.delete({ where: { id } });
      return true;
    } catch (error) {
      if (isPrismaNotFoundError(error)) {
        throw new NotFoundException(`Social with ID ${id} not found`);
      }
      throw error;
    }
  }
}