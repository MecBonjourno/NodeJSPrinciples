import Appointment from '../models/Appointment';
import AppointmentsRepo from '../repositories/AppointmentsRepo'
import {startOfHour} from 'date-fns'

interface RequestDTO {
    provider: string;
    date: Date;
}



class CreateAppointmentService {
        private appointmentsRepo: AppointmentsRepo;

    constructor(appointmentsRepo: AppointmentsRepo ) {
        this.appointmentsRepo = appointmentsRepo;
    }

    public execute({ date, provider}: RequestDTO): Appointment {
        const appointmentDate = startOfHour(date)

       const findEqualAppointment = this.appointmentsRepo.findByDate(appointmentDate);

        if (findEqualAppointment){
            throw Error('Invalid Time! Already Booked!')
        }

        const appointment =  this.appointmentsRepo.create({
            provider,
            date: appointmentDate,
        });

        return appointment
    }
}

export default CreateAppointmentService;