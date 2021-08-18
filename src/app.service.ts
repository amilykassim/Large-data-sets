import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './dtos/user.dto';
import { User } from './entities/wallet';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  addUsers(): string {
    return '';
  }

  async createUser(obj: UserDTO): Promise<User> {
    // Check if a given user exist
    const user = await this.findByUsername(obj.name);
    if (user) return user;

    // Create user Object
    const { nid, name, phone, gender, email } = obj;
    const userObject = { nid, name, phone, gender, email };

    const entity = await this.usersRepository.create(userObject);
    return await this.usersRepository.save(entity);
  }

  async findByUsername(name: string) {
    return await this.usersRepository.findOne({
      where: { name },
    });
  }

  async findAll() {
    return await this.usersRepository.find();
  }
}
