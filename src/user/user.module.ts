import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './user.controller';
import { User } from './entities/user.entity';
import { AppService } from './user.service';
import { UserUtils } from './user.util';


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
  controllers: [AppController],
  providers: [AppService, UserUtils],
})
export class UserModule {}
