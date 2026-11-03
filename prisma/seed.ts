import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.profile.deleteMany();

  await prisma.profile.create({
    data: {
      name: 'Alex', 
      description: 'Full-stack software engineer working with Node.js, TypeScript, and Docker.',
      socials: {
        github: 'https://github.com/al3xsus',
      },
      skills: {
        create: [
          { name: 'TypeScript' },
          { name: 'Node.js' },
          { name: 'NestJS' },
          { name: 'Prisma' },
          { name: 'GraphQL' },
          { name: 'Docker' },
        ],
      },
      experience: {
        create: [
          {
            company: 'Tech Company',
            position: 'Full-stack Developer',
            period: '2023 - Present',
            achievements: [
              'Designed and implemented microservices architecture.',
              'Optimized database queries and API response times.',
            ],
          },
        ],
      },
      projects: {
        create: [
          {
            name: 'Digital Card API',
            url: 'https://github.com/al3xsus/digital-card',
          },
        ],
      },
    },
  });

  console.log('Database has been seeded successfully 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });