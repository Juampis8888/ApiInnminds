import { Router } from 'express';
import { createrToken  } from '../../Middleware/token'; //verificarToken
import CMS from '../CMS/CMS';


class GoraRoute {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

  private  routes(): void {
    
        this.router.get('/TokenGora', createrToken);
        this.router.use('/Crear' , CMS) //verificarToken
    }
}

const Gora= new GoraRoute();
export default Gora.router;