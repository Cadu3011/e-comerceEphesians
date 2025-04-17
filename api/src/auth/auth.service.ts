import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from 'generated/prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  @Inject()
  private readonly prisma: PrismaService
  @Inject()
  private readonly jtwService: JwtService;
  
  async signin(Params: Prisma.UserCreateInput):Promise<{access_token:string}> {
    const user = await this.prisma.user.findFirst({where:{email:Params.email}})
    if(!user) throw new NotFoundException('usuario não encontrado')
      const passwordMatch = await bcrypt.compare(Params.password, user.password)
    if(!passwordMatch) throw new UnauthorizedException('credenciais invalidas')
      const payload = {sub: user.id, email: user.email,name:user.name ,roles: user.role}
    return {access_token: await this.jtwService.signAsync(payload)}
  }
}
