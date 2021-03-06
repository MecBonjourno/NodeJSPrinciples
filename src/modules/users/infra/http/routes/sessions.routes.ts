import { Router } from 'express';
import { container } from 'tsyringe'
import AuthenticateUserService from '../../../services/AuthenticateUserService';

import SessionsController from '../controllers/SessionsController'



const sessionsRouter = Router();

const sessionsController = new SessionsController();

sessionsRouter.post('/', sessionsController.create)

export default sessionsRouter;