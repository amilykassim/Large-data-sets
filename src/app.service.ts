import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDTO } from './dtos/user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async createUser(obj: UserDTO): Promise<User> {
    // Check if a user already exists
    const user = await this.findByUsername(obj.name);
    if (user) return user;

    // Otherwise, instantiate a user object
    const { nid, name, phone, gender, email } = obj;
    const userObject = { nid, name, phone, gender, email };

    // save user in the db
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
