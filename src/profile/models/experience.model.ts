import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Profile } from './profile.model';

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

  @Field(() => ID)
  profileId: string;

  @Field(() => Profile, { nullable: true })
  profile?: Profile;
}