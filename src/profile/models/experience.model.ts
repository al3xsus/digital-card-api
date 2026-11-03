import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Experience {
  @Field(() => ID)
  id: string;

  @Field()
  company: string;

  @Field()
  position: string;

  @Field()
  period: string;

  @Field(() => [String])
  achievements: string[];
}