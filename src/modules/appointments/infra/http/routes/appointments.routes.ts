import {Router, request, response,} from 'express';
import {  parseISO,  } from 'date-fns' 
import {getCustomRepository} from 'typeorm';

import AppointmentsRepository from '@modules/appointments/repositories/AppointmentsRepo';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response)=>{
    const appointmentsRepo = getCustomRepository(AppointmentsRepository)

    const appointments = await appointmentsRepo.find();

    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
   try{
    const { provider_id, date } = request.body;

        const parsedDate = parseISO(date)
        

        const createAppointment = new CreateAppointmentService();

        const appointment = await createAppointment.execute({date: parsedDate, provider_id});

    return response.json(appointment)
    } catch (err) {
        return response.status(400).json({error: err.message}) 
    }
})

export default appointmentsRouter;