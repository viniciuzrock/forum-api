import { Inject, Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/database/prisma.service';
import { connect } from 'http2';

@Injectable()
export class AnswersService {
  @Inject()
  private readonly prisma: PrismaService;

  create(createAnswerDto: CreateAnswerDto, userId: any, questionId: number) {
    const newAnswer = {
      body: createAnswerDto.body,
      user: {
        connect: { id: userId.sub },
      },
      question: {
        connect: { id: questionId },
      },
    };

    return this.prisma.answers.create({
      data: newAnswer,
    });
    // return 'This action adds a new answer';
  }

  findAll() {
    return this.prisma.questions.findMany();
    // return `This action returns all answers`;
  }

  findOne(id: number) {
    return this.prisma.questions.findUnique({ where: { id } });
    // return `This action returns a #${id} answer`;
  }

  update(id: number, updateAnswerDto: UpdateAnswerDto) {
    return this.prisma.questions.update({
      where: { id },
      data: updateAnswerDto,
    });
    // return `This action updates a #${id} answer`;
  }

  remove(id: number) {
    return this.prisma.questions.delete({ where: { id } });
    // return `This action removes a #${id} answer`;
  }
}
