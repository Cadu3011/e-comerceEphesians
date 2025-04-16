import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UserService {
  @Inject()
  private readonly Prisma: PrismaService

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password,10)
    const {...dataUser} = createUserDto
    return this.Prisma.user.create({data:{...dataUser,password:hash}})
  }

  findAll() {
    return this.Prisma.user.findMany()
  }

  findOne(id: number) {
    return this.Prisma.user.findUnique({where:{id}})
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.Prisma.user.update({where:{id},data:updateUserDto})
  }

}
