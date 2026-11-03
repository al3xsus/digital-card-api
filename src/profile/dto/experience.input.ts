import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateExperienceInput {
  @Field()
  company: string;

  @Field()
  position: string;

  @Field()
  period: string;

  @Field(() => [String], { defaultValue: [] })
  achievements: string[];
}

@InputType()
export class UpdateExperienceInput extends PartialType(CreateExperienceInput) {}