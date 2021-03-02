import { Request, Response } from 'express';
import createUser from './services/createUser';

export function helloWorld(request: Request, response: Response) {
    const user = createUser({ 
        email: 'josemauromani@gmail.com',
        password: '123456',
    });
   
    return response.json({ message: "Faaala Galera" });
}