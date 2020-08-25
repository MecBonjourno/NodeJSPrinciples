import {Router, request, response,} from 'express';
import {  parseISO,  } from 'date-fns' 

import AppointmentsRepo from '../repositories/AppointmentsRepo';
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentsRouter = Router();
const appointmentsRepo = new AppointmentsRepo();

appointmentsRouter.get('/', (request, response)=>{

    const appointments = appointmentsRepo.all();

    return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
   try{
    const { provider, date } = request.body;

        const parsedDate = parseISO(date)
        
        const createAppointment = new CreateAppointmentService(appointmentsRepo);

        const appointment = createAppointment.execute({date: parsedDate, provider});

    return response.json(appointment)
    } catch (err) {
        return response.status(400).json({error: err.message}) 
    }
})

export default appointmentsRouter;