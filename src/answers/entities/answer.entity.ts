import { Answers } from '@prisma/client';
import { User } from '../../user/entities/user.entity';
import { Question } from '../../questions/entities/question.entity';

export class Answer implements Answers {
  id: number;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  questionId: number;
  user: User;
  question: Question;
}
