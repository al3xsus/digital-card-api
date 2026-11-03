import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './models/profile.model';
import { Skill } from './models/skill.model';
import { Project } from './models/project.model';
import { Experience } from './models/experience.model';
import { Social } from './models/social.model';
import { UpdateProfileInput } from './dto/update-profile.input';
import { CreateSkillInput, UpdateSkillInput } from './dto/skill.input';
import { CreateProjectInput, UpdateProjectInput } from './dto/project.input';
import { CreateExperienceInput, UpdateExperienceInput } from './dto/experience.input';
import { CreateSocialInput, UpdateSocialInput } from './dto/social.input';

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
    return this.profileService.updateProfile(input);
  }

  // --- Skill Mutations ---
  @Mutation(() => Skill)
  async addSkill(
    @Args('input') input: CreateSkillInput,
  ) {
    return this.profileService.addSkill(input);
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
    @Args('input') input: CreateProjectInput,
  ) {
    return this.profileService.addProject(input);
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
    @Args('input') input: CreateExperienceInput,
  ) {
    return this.profileService.addExperience(input);
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

  // --- Social Mutations ---
  @Mutation(() => Social)
  async addSocial(
    @Args('input') input: CreateSocialInput,
  ) {
    return this.profileService.addSocial(input);
  }

  @Mutation(() => Social)
  async updateSocial(
    @Args('id') id: string,
    @Args('input') input: UpdateSocialInput,
  ) {
    return this.profileService.updateSocial(id, input);
  }

  @Mutation(() => Boolean)
  async deleteSocial(@Args('id') id: string) {
    return this.profileService.deleteSocial(id);
  }
}