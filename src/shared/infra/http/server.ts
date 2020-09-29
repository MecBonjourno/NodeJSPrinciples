import "reflect-metadata";

import express, { request, response } from 'express';
import routes from './routes';

import UploadConfig from '@config/upload'
import cors from 'cors'

import '@shared/infra/typeorm';
import '@shared/container'

const app = express();

app.use(cors())
app.use(express.json());
app.use('/files', express.static(UploadConfig.directory))
app.use(routes)

app.listen(3333, () =>{
    console.log('😎 Server on-line, ultra fast on porta 3333 😎')
})