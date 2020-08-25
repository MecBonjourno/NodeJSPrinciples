import {Router, request, response} from 'express';
import appointmentsRouter from './appointments.routes'

const routes = Router();

routes.use('/appointments', appointmentsRouter)

// routes.post('/users', (request,response) => {
//     const { name, email, password } = request.body

//     const user = {
//         name,email,password
//     }

//     return response.json(user)
// });

export default routes;