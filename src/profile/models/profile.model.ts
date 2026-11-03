import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Skill } from './skill.model';
import { Experience } from './experience.model';
import { Project } from './project.model';
import { Social } from './social.model';

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [Social], { nullable: 'itemsAndList' })
  socials?: Social[];

  @Field(() => [Skill], { nullable: 'itemsAndList' })
  skills?: Skill[];

  @Field(() => [Experience], { nullable: 'itemsAndList' })
  experience?: Experience[];

  @Field(() => [Project], { nullable: 'itemsAndList' })
  projects?: Project[];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}