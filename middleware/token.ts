import  { Request, Response, NextFunction } from 'express';
import app from '../main';
import jwt  from 'jsonwebtoken'
import config from '../config/config'

export function createrToken(req: Request, res: Response ): void {
    try {
        if (app.get('credentials').publicKey === req.headers['x-api-key']) {
            const token = jwt.sign(
                { secret: app.get('credentials').privateKey },
                app.get('credentials').publicKey,
                { expiresIn: 2000, subject: 'Marrocar' }
            );
            res.json({
                mensaje: 'Success',
                token
            }).status(200);
        } else { 
            res.sendStatus(400);
        }
    } catch (err) {
        res.sendStatus(400);
    }
}

export function verificarToken(req: Request, res: Response, next: NextFunction): void{
    const bearerHeader = req.headers['authorization'];
    
    if (bearerHeader) {
        const token = bearerHeader.split(' ')[1];
        if (token) {
            jwt.verify(token,config.publicKey, (err: any, decoded: any) => {
                if (err || decoded?.secret !== config.privateKey) {
                    res.status(400).json({ message: 'Token inválido o no autorizado' });
                } else {
                     next();
                }
            });
        } else {
             res.status(400).json({ message: 'Token no proporcionado' });
        }
    } else {
         res.status(400).json({ message: 'Encabezado de autorización no proporcionado' });
    }
}