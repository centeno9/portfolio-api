import 'dotenv/config';

import { PrismaClient } from '../../generated/prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaPg } from '@prisma/adapter-pg';

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

async function bootstrap() {
  console.log('🌱 Starting seed...');

  try {
    const username = process.env.CONTENT_USER;
    const rawPassword = process.env.CONTENT_PASSWORD;

    if (!username || !rawPassword) {
      throw new Error('username or password env variable is not defined');
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      console.log('⚠️  User already exists. Skipping.');
      return;
    }

    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);

    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    console.log('✅ Admin user created successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}
bootstrap();
