import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Skill } from './skill.model';
import { Experience } from './experience.model';
import { Project } from './project.model';

@ObjectType()
export class Profile {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [Skill], { nullable: 'items' })
  skills?: Skill[];

  @Field(() => [Experience], { nullable: 'items' })
  experience?: Experience[];

  @Field(() => [Project], { nullable: 'items' })
  projects?: Project[];
}