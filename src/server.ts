import express, { request, response } from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes)

// app.get('/', (request, response)=>{
//     return response.json({message: 'Hello Infinite Universe'});
// })

app.listen(3333, () =>{
    console.log('😎 Server on-line, ultra fast on porta 3333 😎')
})