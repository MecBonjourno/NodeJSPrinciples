import User from '../infra/typeorm/entities/User';
import { getRepository } from 'typeorm'
import { sign, verify } from 'jsonwebtoken'
import { compare } from 'bcryptjs';
import authConfig from '../../../config/auth'
import AppError from '../../../shared/errors/AppError'
import IUserRepo from '../repositories/IUserRepository'
import { injectable, inject} from 'tsyringe'

// import { hash } from 'bcryptjs'


interface Request{
    email: string,
    password: string
}

interface Response{
    user: User,
    token: string;
}

@injectable()
class AuthenticateUserService{

    constructor(
        @inject('UsersRepo')
        private usersRepo: IUserRepo){}


    public async execute({email, password}: Request): Promise<Response> {
        // const userRepository = getRepository(User);

        const user = await this.usersRepo.findByEmail(email)

        if (!user) {
            throw new AppError('Incorrect email or password combination!', 401)
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('Incorrect email or password combination!')
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        })

        return {
            user,
            token,
         }
    }
}

export default AuthenticateUserService;