import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileInput } from './dto/update-profile.input';
import { CreateSkillInput, UpdateSkillInput } from './dto/skill.input';
import { CreateProjectInput, UpdateProjectInput } from './dto/project.input';
import { CreateExperienceInput, UpdateExperienceInput } from './dto/experience.input';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  // --- Profile ---
  async getProfile() {
    return this.prisma.profile.findFirst({
      include: {
        skills: true,
        experience: true,
        projects: true,
      },
    });
  }

  // Updated to automatically find the singleton profile ID if not passed, 
  // or you can keep accepting `id` if you prefer.
  async updateProfile(id: string, input: UpdateProfileInput) {
    return this.prisma.profile.update({
      where: { id },
      data: input,
      // FIXED: Changed `experiences` to `experience` to match schema.prisma
      include: { skills: true, projects: true, experience: true },
    });
  }

  // --- Skills ---
  async addSkill(profileId: string, input: CreateSkillInput) {
    return this.prisma.skill.create({
      data: { ...input, profileId },
    });
  }

  async updateSkill(id: string, input: UpdateSkillInput) {
    return this.prisma.skill.update({
      where: { id },
      data: input,
    });
  }

  async deleteSkill(id: string) {
    await this.prisma.skill.delete({ where: { id } });
    return true;
  }

  // --- Projects ---
  async addProject(profileId: string, input: CreateProjectInput) {
    return this.prisma.project.create({
      // FIXED: Ensure profileId is attached even if omitted from the input DTO
      data: { ...input, profileId },
    });
  }

  async updateProject(id: string, input: UpdateProjectInput) {
    return this.prisma.project.update({
      where: { id },
      data: input,
    });
  }

  async deleteProject(id: string) {
    await this.prisma.project.delete({ where: { id } });
    return true;
  }

  // --- Experiences ---
  async addExperience(profileId: string, input: CreateExperienceInput) {
    return this.prisma.experience.create({
      // FIXED: Ensure profileId is attached even if omitted from the input DTO
      data: { ...input, profileId },
    });
  }

  async updateExperience(id: string, input: UpdateExperienceInput) {
    return this.prisma.experience.update({
      where: { id },
      data: input,
    });
  }

  async deleteExperience(id: string) {
    await this.prisma.experience.delete({ where: { id } });
    return true;
  }
}