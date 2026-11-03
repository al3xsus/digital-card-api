import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateProjectInput {
  @Field()
  name: string;

  @Field()
  url: string;
}

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {}