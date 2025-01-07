import {sqlConnection}  from '../Sqlconnection/sqlconection'
import {  Request, Response } from 'express';
import sql from 'mssql'

export async function InsertCategory(req: Request, res: Response): Promise<void> {
    let pool: sql.ConnectionPool | null = null;
    try {
        console.log(req.body);
        pool = await sqlConnection();
        const Create = await pool.request()
            .input('CATEGORY_NAME', sql.NVarChar(100), req.body.data.CATEGORY_NAME)
            .input('CATEGORY_ENABLE', sql.Bit, req.body.data.CATEGORY_ENABLE)
            .input('CATEGORY_USER', sql.NVarChar(100), req.body.data.CATEGORY_USER)
            .input('CATEGORY_LAST_USER', sql.NVarChar(100), req.body.data.CATEGORY_LAST_USER)
            .execute('INSERT_CATEGORY');
        
        pool.close();
        res.status(200).json({ result: Create, message: 'Creación exitosa' });
    } catch (error) {
        console.error('Error en la conexión:', error);
        res.status(500).json({ result: error, message: 'Error' });
    }
}

export async function SelectCategory(req:Request, res:Response):Promise<void>{
    let pool : sql.ConnectionPool | null = null
    try{
        console.log(req.query)
        pool = await sqlConnection()
        const Select = await pool.request()
        .input('CATEGORY_NAME',sql.NVarChar(100),req.query.CATEGORY_NAME)
        .execute('SELECT_CATEGORY')
        pool.close()
        console.log(Select)
        res.json({result:Select, mensage:'Seleccion'}).status(200)

    }catch(error){
        console.log('Error en la conexion.',error)
        res.json({result:error, mensage:'Errro'}).status(401)
    }
}

export async function UpdateCategory(req: Request, res: Response): Promise<void> {
    let pool: sql.ConnectionPool | null = null;
    try {
        console.log(req.body);
        pool = await sqlConnection();
        const Create = await pool.request()
            .input('CATEGORY_ID', sql.Int, req.body.data.CATEGORY_ID)
            .input('CATEGORY_NAME', sql.NVarChar(100), req.body.data.CATEGORY_NAME)
            .input('CATEGORY_ENABLE', sql.Bit, req.body.data.CATEGORY_ENABLE)
            .input('CATEGORY_USER', sql.NVarChar(100), req.body.data.CATEGORY_USER)
            .input('CATEGORY_LAST_USER', sql.NVarChar(100), req.body.data.CATEGORY_LAST_USER)
            .execute('UPDATE_CATEGORY');
        pool.close();
        res.json({ result: Create, message: 'Actualización exitosa' }).status(200);
    } catch (error) {
        console.log('Error en al conexion.', error);
        res.json({ result: error, message: 'Error' }).status(401);
    }
}


export async function DeleteCategory(req:Request, res:Response):Promise<void>{
    let pool : sql.ConnectionPool | null = null
    try{
        console.log(req.body)
        pool = await sqlConnection()
        const Update = await pool.request()
        .input('CATEGORY_ID',sql.Int,req.body.data.CATEGORY_ID)
        .execute('DELETE_CATEGORY')
        pool.close()
        console.log(Update)
        res.json({result:Update, mensage:'Delete'}).status(200)
    }catch(error){
        console.log('Error en la conexion.',error)
        res.json({result:error, mensage:'Error'}).status(401)
    }
}