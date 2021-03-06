import Appointment from '../infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '../DTOs/ICreateAppointmentDTO'

export default interface IAppointmentsRepo {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>
}