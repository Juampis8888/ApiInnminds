import express, { Request, Response, NextFunction } from 'express';
import Api from './Routes/Api';
import cors_API from './cors/cors_Api' 
import config from './config/config';

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
        this.app.use(express.json({limit: '50mb'}));
        this.app.use(function (_req: Request, res: Response, next: NextFunction) {
           res.header("Access-Control-Allow-Origin", "*");
             res.header("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE,PATCH");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin");
             next();
         });
    }

    private routes(): void {
        this.app.get('/', function (_req : Request, res : Response){
            res.json({message : "Bienvenido a la Api de innminds"}).status(200)
        });
        this.app.use('/Api', cors_API(this.app),Api);
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
