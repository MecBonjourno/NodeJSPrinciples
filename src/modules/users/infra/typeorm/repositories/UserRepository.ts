import User from '../entities/User'
import { getRepository, Repository } from 'typeorm'

import IUserRepo from '@modules/users/repositories/IUserRepository'
import ICreateUserDTO from '@modules/users/DTOs/ICreateUserDTO'

//DTO = Data Transfer Object

class UsersRepo implements IUserRepo {
    private ormRepo: Repository<User>;

    constructor() {
        this.ormRepo = getRepository(User)
    }

    public async findById(id: string): Promise<User | undefined>{
        const user = await this.ormRepo.findOne(id)

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined>{
        const user = await this.ormRepo.findOne({
            where: { email },
        })

        return user;
    }


   public async create(userData: ICreateUserDTO): Promise<User> {
    const appointment = this.ormRepo.create(userData)

    await this.ormRepo.save(appointment);

    return appointment;
   }

   public async save(user: User): Promise<User> {
       return this.ormRepo.save(user);
   }
}

export default UsersRepo;