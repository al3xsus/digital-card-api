import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Profile } from './profile.model';

@ObjectType()
export class Project {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  url: string;

  @Field(() => ID)
  profileId: string;

  @Field(() => Profile, { nullable: true })
  profile?: Profile;
}