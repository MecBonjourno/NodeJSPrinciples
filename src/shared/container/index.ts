import {container} from 'tsyringe'

import IAppointmentsRepo from '@modules/appointments/repositories/IAppointmentsRepo'
import AppointmentsRepo from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepo'

import IUsersRepo from '@modules/users/repositories/IUserRepository'
import UsersRepo from '@modules/users/infra/typeorm/repositories/UserRepository'

container.registerSingleton<IAppointmentsRepo>('AppointmentsRepo', AppointmentsRepo); 

container.registerSingleton<IUsersRepo>('UsersRepo', UsersRepo); 
