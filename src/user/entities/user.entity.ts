import { User as PrismaUser } from '@prisma/client';

export class User implements PrismaUser {
  email: string;
  name: string;
  password: string;
  id: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}
