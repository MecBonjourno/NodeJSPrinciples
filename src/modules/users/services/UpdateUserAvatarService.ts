import { getRepository } from 'typeorm'
import User from '../infra/typeorm/entities/User';
import path from 'path'
import fs from 'fs';
import IUserRepo from '../repositories/IUserRepository'
import { injectable, inject} from 'tsyringe'



import UploadConfig from '../../../config/upload'

interface Request{
    user_id: string;
    avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {

    constructor(
        @inject('UsersRepo')
        private userRepository: IUserRepo){}


    public async execute({ user_id, avatarFilename}: Request): Promise<User>{
        // const userRepository = getRepository(User);

        const user = await this.userRepository.findById(user_id);

        if(!user) {
            throw new Error("Only auth users!")
        }

        if(user.avatar){
            const userAvatarFilePath = path.join(UploadConfig.directory, user.avatar)
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if(userAvatarFileExists){
                await fs.promises.unlink(userAvatarFilePath)
            }
        }

        user.avatar = avatarFilename;

        await this.userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;