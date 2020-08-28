import express, { request, response } from 'express';
import routes from './routes';
import 'reflect-metadata'
import UploadConfig from './config/upload'

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(UploadConfig.directory))
app.use(routes)

// app.get('/', (request, response)=>{
//     return response.json({message: 'Hello Infinite Universe'});
// })

app.listen(3333, () =>{
    console.log('😎 Server on-line, ultra fast on porta 3333 😎')
})