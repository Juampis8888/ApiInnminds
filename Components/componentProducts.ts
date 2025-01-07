import {sqlConnection}  from '../Sqlconnection/sqlconection'
import {  Request, Response } from 'express';
import sql from 'mssql'

export async function InserProducts(req: Request, res: Response): Promise<void> {
    let pool: sql.ConnectionPool | null = null;
    try {
        console.log(req.body);
        pool = await sqlConnection();
        const Create = await pool.request()
            .input('PRODUCTS_NAME', sql.NVarChar(100), req.body.data.PRODUCTS_NAME)
            .input('PRODUCTS_DESCRIPTION', sql.NVarChar(100), req.body.data.PRODUCTS_DESCRIPTION)
            .input('PRODUCTS_WORTH', sql.Float, req.body.data.PRODUCTS_WORTH) 
            .input('PRODUCTS_STOCK', sql.Int, req.body.data.PRODUCTS_STOCK)
            .input('PRODUCTS_ENABLE', sql.Bit, req.body.data.PRODUCTS_ENABLE)
            .input('CATEGORY_ID', sql.Int, req.body.data.CATEGORY_ID)
            .input('PRODUCTS_USER', sql.NVarChar(100), req.body.data.PRODUCTS_USER)
            .input('PRODUCTS_LAST_USER', sql.NVarChar(100), req.body.data.PRODUCTS_LAST_USER)
            .input('PRODUCTS_DATE', sql.DateTime, new Date())
            .input('PRODUCTS_LAST_DATE', sql.DateTime, new Date())
            .execute('INSERT_PRODUCTS');
        pool.close();
        res.status(200).json({ result: Create, message: 'Creación con éxito.' });
    } catch (error) {
        console.error('Error en la conexión.', error);
        res.status(500).json({ result: error, message: 'Error en la creación.' });
    }
}

export async function SelectProducts(req:Request, res:Response):Promise<void>{
    let pool : sql.ConnectionPool | null = null
    try{
        console.log(req.query)
        pool = await sqlConnection()
        const Select = await pool.request()
        .input('PRODUCTS_NAME',sql.NVarChar(100),req.query.PRODUCTS_NAME)
        .execute('SELECT_PRODUCTS')
        pool.close()
        console.log(Select)
        res.json({result:Select, mensage:'Seleccion'}).status(200)

    }catch(error){
        console.log('Error en la conexion',error)
        res.json({result:error, mensage:'Errror'}).status(401)
    }
}

export async function UpdateProducts(req: Request, res: Response): Promise<void> {
    let pool: sql.ConnectionPool | null = null;
    try {
        console.log(req.body);
        pool = await sqlConnection();
        const Update = await pool.request()
            .input('PRODUCTS_ID', sql.Int, req.body.data.PRODUCTS_ID) 
            .input('PRODUCTS_NAME', sql.NVarChar(100), req.body.data.PRODUCTS_NAME)
            .input('PRODUCTS_DESCRIPTION', sql.NVarChar(150), req.body.data.PRODUCTS_DESCRIPTION)
            .input('PRODUCTS_WORTH', sql.Float, req.body.data.PRODUCTS_WORTH)
            .input('PRODUCTS_STOCK', sql.Int, req.body.data.PRODUCTS_STOCK)
            .input('PRODUCTS_ENABLE', sql.Bit, req.body.data.PRODUCTS_ENABLE)
            .input('CATEGORY_ID', sql.Int, req.body.data.CATEGORY_ID)
            .input('PRODUCTS_USER', sql.NVarChar(100), req.body.data.PRODUCTS_USER)
            .input('PRODUCTS_LAST_USER', sql.NVarChar(100), req.body.data.PRODUCTS_LAST_USER)
            .execute('UPDATE_PRODUCTS'); 
        pool.close();
        res.status(200).json({ result: Update, message: 'Producto actualizado con éxito.' });
    } catch (error) {
        console.log('Error en la conexión.', error);
        res.status(401).json({ result: error, message: 'Error al actualizar el producto.' });
    }
}

export async function DeleteProducts(req:Request, res:Response):Promise<void>{
    let pool : sql.ConnectionPool | null = null
    try{
        console.log(req.body)
        pool = await sqlConnection()
        const Delete  = await pool.request()
        .input('PRODUCTS_ID',sql.Int,req.body.data.PRODUCTS_ID)
        .execute('DELETE_PRODUCTS')
        pool.close()
        res.json({result:Delete, mensage:'Delete'}).status(200)

    }catch(error){
        console.log('Error en la conexion.',error)
        res.json({result:error, mensage:'Error'}).status(401)
    }
}