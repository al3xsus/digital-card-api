import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateSkillInput {
  @Field()
  name: string;
}

@InputType()
export class UpdateSkillInput extends PartialType(CreateSkillInput) {}