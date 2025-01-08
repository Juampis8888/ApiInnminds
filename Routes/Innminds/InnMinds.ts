import { Router } from 'express';
import { insertInnMinds } from '../../Components/componentInnminds';

class InnMindsRoute {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private  routes(): void 
    {
        this.router.post('/Crear', insertInnMinds) //verificarToken
    }
}

const Gora= new InnMindsRoute();
export default Gora.router;