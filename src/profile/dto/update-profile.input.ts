import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  // @Field(() => GraphQLJSON, { nullable: true })
  // socials?: Record<string, any>;
}