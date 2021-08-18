import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { UserUtils } from './utils/user.util';

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
export class AppModule {}
