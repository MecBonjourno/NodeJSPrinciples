import Appointment from '../entities/Appointment'
import { getRepository, Repository } from 'typeorm'

import IAppointmentsRepo from '@modules/appointments/repositories/IAppointmentsRepo'
import ICreateAppointmentDTO from '@modules/appointments/DTOs/ICreateAppointmentDTO'

//DTO = Data Transfer Object

class AppointmentsRepo implements IAppointmentsRepo {
    private ormRepo: Repository<Appointment>;

    constructor() {
        this.ormRepo = getRepository(Appointment)
    }

   public async findByDate(date: Date): Promise<Appointment | undefined> {

    const findEqualAppointment = await this.ormRepo.findOne({
        where: { date },
    })

    return findEqualAppointment;
   }

   public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepo.create({provider_id, date})

    await this.ormRepo.save(appointment);

    return appointment;
   }
}

export default AppointmentsRepo;