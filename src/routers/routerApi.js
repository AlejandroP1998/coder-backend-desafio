import { Router } from 'express';
import { postMessages } from '../controllers/postMessages.js';

export const routerApi = Router();
routerApi.post('/messages', postMessages);
