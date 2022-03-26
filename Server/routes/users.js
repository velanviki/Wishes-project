import express from 'express';

import {signin,signup} from '../controls/users.js'

const userRoutes = express.Router();


userRoutes.post('/signin' ,signin);
userRoutes.post('/signup' ,signup);





export default userRoutes;