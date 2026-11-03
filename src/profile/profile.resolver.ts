import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './models/profile.model';
import { Skill } from './models/skill.model';
import { Project } from './models/project.model';
import { Experience } from './models/experience.model';
import { UpdateProfileInput } from './dto/update-profile.input';
import { CreateSkillInput, UpdateSkillInput } from './dto/skill.input';
import { CreateProjectInput, UpdateProjectInput } from './dto/project.input';
import { CreateExperienceInput, UpdateExperienceInput } from './dto/experience.input';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Profile, { name: 'profile', nullable: true })
  async getProfile() {
    return this.profileService.getProfile();
  }

// --- Profile Mutations ---
  @Mutation(() => Profile)
  async updateProfile(@Args('input') input: UpdateProfileInput) {
    // 1. Fetch the single profile to get its ID
    const profile = await this.profileService.getProfile();
    if (!profile) {
      throw new Error('Profile not found');
    }
    // 2. Update using the fetched ID
    return this.profileService.updateProfile(profile.id, input);
  }

  // --- Skill Mutations ---
  @Mutation(() => Skill)
  async addSkill(
    @Args('profileId') profileId: string,
    @Args('input') input: CreateSkillInput,
  ) {
    return this.profileService.addSkill(profileId, input);
  }

  @Mutation(() => Skill)
  async updateSkill(
    @Args('id') id: string,
    @Args('input') input: UpdateSkillInput,
  ) {
    return this.profileService.updateSkill(id, input);
  }

  @Mutation(() => Boolean)
  async deleteSkill(@Args('id') id: string) {
    return this.profileService.deleteSkill(id);
  }

  // --- Project Mutations ---
  @Mutation(() => Project)
  async addProject(
    @Args('profileId') profileId: string,
    @Args('input') input: CreateProjectInput,
  ) {
    return this.profileService.addProject(profileId, input);
  }

  @Mutation(() => Project)
  async updateProject(
    @Args('id') id: string,
    @Args('input') input: UpdateProjectInput,
  ) {
    return this.profileService.updateProject(id, input);
  }

  @Mutation(() => Boolean)
  async deleteProject(@Args('id') id: string) {
    return this.profileService.deleteProject(id);
  }

  // --- Experience Mutations ---
  @Mutation(() => Experience)
  async addExperience(
    @Args('profileId') profileId: string,
    @Args('input') input: CreateExperienceInput,
  ) {
    return this.profileService.addExperience(profileId, input);
  }

  @Mutation(() => Experience)
  async updateExperience(
    @Args('id') id: string,
    @Args('input') input: UpdateExperienceInput,
  ) {
    return this.profileService.updateExperience(id, input);
  }

  @Mutation(() => Boolean)
  async deleteExperience(@Args('id') id: string) {
    return this.profileService.deleteExperience(id);
  }
}