import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Patch,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User as UserModel } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  async signupUser(
    @Body(new ValidationPipe()) userData: CreateUserDto,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<Omit<UserModel, 'password'>> {
    return this.userService.user({ id: id });
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateUser(
    @Body(new ValidationPipe()) userData: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id },
      data: userData,
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.userService.deleteUser({ id });
  }
}
