import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { UserUtils } from './user.util';
import { AppService } from 'src/app.service';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'amilykadyl',
      password: '',
      database: 'RSSB',
      entities: [
        User,
      ],
      synchronize: true
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserUtils],
  exports: [UserService]
})
export class UserModule {}
