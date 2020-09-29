import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepo'

import {startOfHour} from 'date-fns'
import {injectable, inject} from 'tsyringe'
import { getCustomRepository } from 'typeorm'
import IAppointmentsRepo from '../repositories/IAppointmentsRepo';

interface RequestDTO {
    provider_id: string;
    date: Date;
}
@injectable()
class CreateAppointmentService {

    constructor(
        @inject('AppointmentsRepo')
        private appointmentsRepo: IAppointmentsRepo){}

    public async execute({ date, provider_id}: RequestDTO): Promise<Appointment> {
        const appointmentsRepo = getCustomRepository(AppointmentsRepository)

        const appointmentDate = startOfHour(date)

       const findEqualAppointment = await this.appointmentsRepo.findByDate(appointmentDate);

        if (findEqualAppointment){
            throw Error('Invalid Time! Already Booked!')
        }

        const appointment = await this.appointmentsRepo.create({
            provider_id,
            date: appointmentDate,
        });

        // await appointmentsRepo.save(appointment);

        return appointment
    }
}

export default CreateAppointmentService;