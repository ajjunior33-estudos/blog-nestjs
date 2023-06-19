import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async listUsers(): Promise<UserModel[]> {
    return this.userService.users({});
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id: Number(id) });
  }

  @Post()
  async createUser(
    @Body() userData: { email: string; name: string },
  ): Promise<UserModel> {
    const { email, name } = userData;
    return this.userService.createUser({ name, email });
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: { email: string; name: string },
  ): Promise<UserModel> {
    const { email, name } = userData;
    return this.userService.updateUser({
      where: {
        id: Number(id),
      },
      data: {
        email,
        name,
      },
    });
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({
      id: Number(id),
    });
  }
}
