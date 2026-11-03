import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateSocialInput {
  @Field()
  url: string;
}

@InputType()
export class UpdateSocialInput extends PartialType(CreateSocialInput) {}