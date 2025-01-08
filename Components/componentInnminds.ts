import {sqlConnection}  from '../Sqlconnection/sqlconection'
import {  Request, Response } from 'express';
import sql from 'mssql'

export async function insertInnMinds( req: Request, res: Response):Promise<void>{
    let pool : sql.ConnectionPool | null = null
    try
    {   
        console.log(req.body)
        pool = await sqlConnection()
        const Create = await pool.request()
        .input('MENSAJE',sql.NVarChar(1000), req.body.data.Mensaje)
        .input('NOMBRE',sql.NVarChar(50),req.body.data.Nombre)
        .input('TELEFONO',sql.NVarChar(20), req.body.data.Telefono)
        .input('CORREO',sql.NVarChar(50), req.body.data.Correo)
        .execute('INSERT_INNMINDS')
        
        pool.close()
        
        res.json({result:Create, mesage:"Creacion exitosa"}).status(200)
    }
    catch(error)
    {
        console.error('Error en la conexion.',error)
        res.json({result:error, mesage:"Error"}).status(401)
    }
}

export async function selectInnMinds( req: Request, res: Response):Promise<void>{
    let pool : sql.ConnectionPool | null = null
    try
    {   
        console.log(req.query)
        pool = await sqlConnection()
        const Select = await pool.request()
        .input('ID',sql.Int, req.query.Id)
        .execute('SELECT_INNMINDS')
        pool.close()
        console.log(Select)
        res.json({result:Select, mesage:"Seleccion"}).status(200) 
    }catch(error){
        console.error('Error en la conexion.',error)
        res.json({result:error, mesage:"Error"}).status(401)
    }
}


