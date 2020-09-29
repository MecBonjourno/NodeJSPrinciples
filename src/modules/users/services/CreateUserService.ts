import User from '../infra/typeorm/entities/User';
import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import { injectable, inject} from 'tsyringe'


import IUserRepo from '../repositories/IUserRepository'

interface Request{
    name:string;
    email:string;
    password?:string;
}

@injectable()
class CreateUserService{

    constructor(
        @inject('UsersRepo')
        private usersRepo: IUserRepo){}


 public async execute({name, email, password}: Request): Promise<User>{
    // const userRepository = getRepository(User);

    const checkUserExists = await this.usersRepo.findByEmail(email)

    if (checkUserExists){
        throw new Error("Ja foi ja");
    }

    const hashedPassword = await hash(password, 8)
    
    const user = this.usersRepo.create({
        name, email, password: hashedPassword
    })

    // await userRepository.save(user)

    return user;
 }
}

export default  CreateUserService;