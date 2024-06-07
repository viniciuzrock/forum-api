import { Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class QuestionsService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createQuestionDto: CreateQuestionDto, req: any) {
    return await this.prisma.questions.create({
      data: { ...createQuestionDto, userId: req.sub.sub },
    });
    // return 'This action adds a new question';
  }

  async findAll() {
    return await this.prisma.questions.findMany({
      include: {
        Answers: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    // return `This action returns all questions`;
  }

  async findOne(id: number) {
    return await this.prisma.questions.findUnique({
      where: { id },
      include: {
        Answers: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    // return `This action returns a #${id} question`;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return await this.prisma.questions.update({
      where: { id },
      data: updateQuestionDto,
    });
    // return `This action updates a #${id} question`;
  }

  async remove(id: number) {
    return await this.prisma.questions.delete({ where: { id } });
    // return `This action removes a #${id} question`;
  }
}
