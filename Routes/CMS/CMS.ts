import { Router } from 'express';
import { createrToken } from '../../middleware/token';
import { selectPets, deletePets, UpdatePets, insertPets } from '../../Components/componentPets';
import{InsertCategory,SelectCategory,UpdateCategory,DeleteCategory} from '../../Components/componentCategory'
import {InserProducts,SelectProducts,UpdateProducts,DeleteProducts} from '../../Components/componentProducts'
import {CreateImages_products,SelectImages_products,UpdateImages_products,DeleteImages_products} from '../../Components/componentImages_products'


class CMSRoute {
    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

  private  routes(): void {
        
        /*
        * Rutas de las mascotas
        */
        this.router.get('/Pets', selectPets);
        this.router.post('/Pets', insertPets);
        this.router.patch('/Pets', UpdatePets);
        this.router.delete('/Pets', deletePets);

        /*
        * Rutas de los usuarios
        */
        this.router.get('/Users', createrToken);
        this.router.post('/Users', createrToken);
        this.router.patch('/Users', createrToken);
        this.router.delete('/Users', createrToken);

        /*
        *Rutas de los categoria
        */
        this.router.get('/Category',SelectCategory)
        this.router.post('/Category',InsertCategory)
        this.router.patch('/Category',UpdateCategory)
        this.router.delete('/Category',DeleteCategory)

        
        /*
        *Rutas de los productos
        */
        this.router.get('/Produts',SelectProducts)
        this.router.post('/Produts',InserProducts)
        this.router.patch('/Produts',UpdateProducts)
        this.router.delete('/Produts',DeleteProducts)

                /*
        *Rutas de los imagenes
        */
        this.router.get('/Images',SelectImages_products)
        this.router.post('/Images',CreateImages_products)
        this.router.patch('/Images',UpdateImages_products)
        this.router.delete('/Images',DeleteImages_products)

    }
}

const CMS= new CMSRoute();
export default CMS.router;