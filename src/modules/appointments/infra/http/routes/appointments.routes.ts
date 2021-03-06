import {Router, request, response,} from 'express';

import AppointmentsController from '../controllers/AppointmentsController'

import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
appointmentsRouter.use(ensureAuthenticated);


appointmentsRouter.post('/', appointmentsController.create)

export default appointmentsRouter;