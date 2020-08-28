import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepo'
import {startOfHour} from 'date-fns'
import { getCustomRepository } from 'typeorm'

interface RequestDTO {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {

    public async execute({ date, provider_id}: RequestDTO): Promise<Appointment> {
        const appointmentsRepo = getCustomRepository(AppointmentsRepository)

        const appointmentDate = startOfHour(date)

       const findEqualAppointment = await appointmentsRepo.findByDate(appointmentDate);

        if (findEqualAppointment){
            throw Error('Invalid Time! Already Booked!')
        }

        const appointment = appointmentsRepo.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentsRepo.save(appointment);

        return appointment
    }
}

export default CreateAppointmentService;