import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateSkillInput {
  @Field()
  name: string;

  @Field(() => ID)
  profileId: string;
}

@InputType()
export class UpdateSkillInput extends PartialType(CreateSkillInput) {
  @Field(() => ID)
  id: string;
}