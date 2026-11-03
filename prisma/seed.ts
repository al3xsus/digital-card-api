import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.project.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.profile.deleteMany();

  await prisma.profile.create({
    data: {
      name: 'Alexandr Lavrentyev',
      description:
        'Senior Full Stack Developer and Solution Architect with 8+ years of experience in software development, specializing in high-performance client-server systems using Python, Node.js, and React.',
      socials: {
        create: [
          { url: 'https://github.com/al3xsus' },
          { url: 'https://linkedin.com/in/alexandr-lavrentyev' },
          { url: 'https://al3xsus.github.io' },
        ],
      },
      skills: {
        create: [
          // Backend
          { name: 'Python' },
          { name: 'Node.js' },
          { name: 'TypeScript' },
          { name: 'FastAPI' },
          { name: 'NestJS' },
          { name: 'Express' },
          { name: 'Prisma' },
          { name: 'GraphQL' },
          
          // Frontend
          { name: 'JavaScript' },
          { name: 'React' },
          { name: 'Redux' },
          { name: 'Web Audio API' },
          
          // Databases & Infrastructure
          { name: 'PostgreSQL' },
          { name: 'MongoDB' },
          { name: 'Redis' },
          { name: 'Docker' },
          { name: 'AWS' },
          { name: 'WebSockets' },
          { name: 'WebRTC' },
        ],
      },
      experience: {
        create: [
          {
            company: 'Independent Full Stack Developer / Freelance',
            position: 'Full Stack Developer',
            period: 'January 2025 - Present',
            achievements: [
              'Built and deployed open-source full-stack applications and interactive modules to benchmark ultra-lightweight frontend architectures (HTMX, Svelte).',
              'Formulated architectural designs for a conceptual resource hub aggregating zero-cost development stacks and evaluating free-tier cloud tooling efficiency.',
              'Upgraded legacy mockups into fully functional data simulation and strategy sandboxes using Vite, TypeScript, and modern state management.',
              'Provided freelance technical consulting, code audits, and architectural reviews for independent clients, optimizing performance bottlenecks.',
            ],
          },
          {
            company: 'VDeep (Israel / Remote)',
            position: 'Team Lead / Senior Full Stack Developer (Acting CTO)',
            period: 'March 2022 - July 2024',
            achievements: [
              'Took full ownership of product architecture, end-to-end development, and component integration following departure of sole backend developer.',
              'Designed and engineered a low-cost, real-time AI streaming pipeline for video conferences, enabling live STT transcription and TTS translation.',
              'Developed custom client-side audio interception module capturing WebRTC streams using Web Audio API and AudioWorklet in isolated web workers.',
              'Built an asynchronous WebSocket service to stream raw PCM audio data to a custom Python backend using dynamic RMS phrase-end detection.',
              'Customized third-party WebRTC infrastructure (VideoSDK), implementing session hardlimits, branded waiting rooms, and iframe integration.',
            ],
          },
          {
            company: 'ISS Art LLC (Omsk, Russia)',
            position: 'Full Stack Developer',
            period: 'May 2019 - September 2021',
            achievements: [
              'Engineered an intelligent remote HR proctoring and automated English proficiency assessment system for global call centers.',
              'Developed browser-level constraints to block grammar assistants and built an AWS-integrated media service for biometric anti-cheating verification.',
              'Designed and built a production-ready PoC automated financial statement parser and ETL system for a major international fast-food chain.',
              'Developed scalable APIs and responsive SPAs using React, Redux, Python (Flask, Asyncio, Aiohttp), PostgreSQL, and MongoDB.',
            ],
          },
          {
            company: 'Digital Ecosystems (Novosibirsk, Russia)',
            position: 'Full Stack Developer',
            period: 'January 2016 - October 2018',
            achievements: [
              'Transitioned monolithic web infrastructures into scalable microservice architectures using Python (Flask, Tornado, Asyncio) and React.',
              'Developed Game Control Center: a high-load backend system utilizing dynamic analytical data to scale mobile game difficulty in real time.',
              'Designed and delivered a standalone infrastructure Service Registry / Service Discovery tool from scratch using LoopBack/StrongLoop.',
              'Programmed robust, fault-tolerant web scrapers and crawlers to aggregate live commercial data and price feeds into structured databases.',
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
          {
            name: 'Personal Portfolio & Blog',
            url: 'https://al3xsus.github.io',
          },
          {
            name: 'Mockup for a better version of Microsoft Media Creation Tool',
            url: 'https://github.com/al3xsus/media-creaton-tool-mockup',
          },
          {
            name: 'Star Wars React SPA',
            url: 'https://github.com/al3xsus/Star-Wars-React-SPA',
          },
          {
            name: "Email Signature Generator",
            url: "https://github.com/al3xsus/email-signature-generator"
          },
          {
            name: "4-20 Lottery Simulation",
            url: "https://github.com/al3xsus/4-20-lottery-simulation"
          },
          {
            name: "Text-to-Palette Analyzer",
            url: "https://github.com/al3xsus/text-to-palette"
          },
          {
            name: "Emoji UI - Glassmorphism Design System",
            url: "https://github.com/al3xsus/emoji-ui"
          },
          {
            name: "Flask + HTMX Demo Application",
            url: "https://github.com/al3xsus/js-light-python-app"
          },
          {
            name: "Brain Train",
            url: "https://github.com/al3xsus/brain-train"
          },
          {
            name: "AI-powered-waste-sorting-station",
            url: "https://github.com/al3xsus/AI-powered-waste-sorting-station"
          },
          {
            name: "The Reclamation Cycle",
            url: "https://github.com/al3xsus/the-reclamation-cycle"
          },
          {
            name: "Photo Collage Maker",
            url: "https://github.com/al3xsus/photo-collage"
          }
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