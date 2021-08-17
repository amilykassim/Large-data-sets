import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  addUsers(): string {
    return 'Added users';
  }
}
