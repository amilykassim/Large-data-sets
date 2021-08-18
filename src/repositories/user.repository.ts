// import { UserDTO } from "src/dtos/user.dto";
// import { User } from "src/entities/wallet";
// import { EntityRepository, Repository } from "typeorm";

// // @EntityRepository(User)
// export class UserRepository extends Repository<User>{

//     async createUser(obj: UserDTO) {
//         // Check if a given user exist
//         const user = await this.findByUsername(obj.name);
//         if (user) return user;

//         // Create user Object
//         const { nid, name, phone, gender, email } = obj;
//         const userObject = { nid, name, phone, gender, email };

//         const entity = await this.create(userObject);
//         return await this.save(entity);
//     }

//     async findByUsername(id: string) {
//         return await this.findOne({
//             where: { name },
//         });
//     }
// }