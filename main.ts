import express, { Request, Response, NextFunction } from 'express';
import logs from './Routes/logs';
import banco from './Routes/Transaccionbancaria';
import cors_API from './Cors/losgCors' 
import cors_transaccion from './Cors/transaccionCors'; 
import config from './Config/config';
import  localizar from './Middleware/geolocalización'
import cors_Token from './Cors/crearTokenCors';
import { createrToken, verificarToken } from './Middleware/token'


class Server {
    

    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', 3005);
        this.app.set('credentials', config);
        this.app.use(express.json());
        this.app.use(function (_req: Request, res: Response, next: NextFunction) {
           res.header("Access-Control-Allow-Origin", "*");
             res.header("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE,PATCH");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin");
             next();
         });
    }

    private routes(): void {
        this.app.use('/rutalogs',localizar,verificarToken, cors_API(this.app),logs); 
        this.app.use('/parametrizacion',localizar,verificarToken, cors_transaccion(this.app),banco);
        this.app.post('/createToken',createrToken.bind(this),cors_Token(this.app)) 
    }
    


    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Daemon listening on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();

export default server.app;
