import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AuthGuard } from './auth.guard';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';



@Module({
  imports:[DatabaseModule, forwardRef(()=>UserModule), JwtModule.register({global:true,secret:process.env.SECRET_KEY||"" ,signOptions:{expiresIn:'3600s'}})],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthGuard ,AuthService]
})

export class AuthModule {}