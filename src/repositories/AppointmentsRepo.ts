import Appointment from '../models/Appointment'
import { EntityRepository, Repository } from 'typeorm'


//DTO = Data Transfer Object
@EntityRepository(Appointment)
class AppointmentsRepo extends Repository<Appointment> {
   public async findByDate(date: Date): Promise<Appointment | null> {

    const findEqualAppointment = await this.findOne({
        where: { date },
    })

    return findEqualAppointment || null;
   }
}

export default AppointmentsRepo;