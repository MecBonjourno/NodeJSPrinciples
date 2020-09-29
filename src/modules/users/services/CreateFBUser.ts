import { PrismaClient } from '@prisma/client'


interface User {
    email: string;
    password: string;
    name: string;
}

const prisma = new PrismaClient()

    prisma.users.create({
                data: { 
                    email: 'teste',
                    password: 'user.password',
                    name: 'user.name',
                }
            }).then(()=>{console.log("cadastradissimo irmao")})