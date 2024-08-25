import {sqlConnection}  from '../Sqlconnection/sqlconection'
import {  Request, Response } from 'express';
import sql from 'mssql'

export async function insertPets(req: Request, res: Response):Promise<void>{
    let pool : sql.ConnectionPool | null = null
    try
    {
        pool = await sqlConnection()
        const Create = await pool.request()
        .input('Description',sql.NVarChar(100), req.body.Description)
        .input('User',sql.NVarChar(50),req.body.User)
        .input('Enable',sql.Bit, req.body.Enable)
        .input('Name',sql.NVarChar(50), req.body.Name)
        .input('Type',sql.NVarChar(50), req.body.Type)
        .input('OldDate',sql.NVarChar(50), req.body.OldDate)
        .execute('INSERT_ANIMALS')
        pool.close()
        
        res.json({result:Create, mesage:"Creacion exitosa"}).status(200)
    }
    catch(error)
    {
        console.error('Error en la conexion.',error)
        res.json({result:error, mesage:"Error"}).status(401)
    }
}

export async function selectPets( req: Request, res: Response):Promise<void>
{
    let pool : sql.ConnectionPool | null = null

    try
    {
        pool = await sqlConnection()
        const Select = await pool.request()
        .input('ANIMALS_ID',sql.UniqueIdentifier, req.body.AnimaldId)
        .input('User',sql.NVarChar(50),req.body.User)
        .input('Enable',sql.Bit, req.body.Enable)
        .input('Type',sql.NVarChar(50), req.body.Type)
        .execute('SELECT_ANIMALS')
        pool.close()
        res.json({result:Select, mesage:"Seleccion"}).status(200)
    }
    catch(error)
    {
        console.error('Error en la conexion.',error)
        res.json({result:error, mesage:"Error"}).status(401)
    }
}

export async function UpdatePets( req: Request, res: Response):Promise<void>{
    let pool : sql.ConnectionPool | null = null
    try{
        pool = await sqlConnection()
        const Update = await pool.request()
        .input('AnimalID',sql.UniqueIdentifier, req.body.AnimaldId)
        .input('Description',sql.NVarChar(100), req.body.Description)
        .input('User',sql.NVarChar(50),req.body.User)
        .input('Enable',sql.Bit, req.body.Enable)
        .input('Name',sql.NVarChar(50), req.body.Name)
        .input('Type',sql.NVarChar(50), req.body.Type)
        .input('OldDate',sql.NVarChar(50), req.body.OldDate)
        .execute('UPDATE_ANIMALS')
        pool.close()
        res.json({result:Update, mesage:"Update Correcto"}).status(200)
        

    }catch(error){
        console.error('Error en la conexion.',error)
        res.json({result:error, mesage:"Error"}).status(401)
    }
}

export async function deletePets( req: Request, res: Response):Promise<void>{
    let pool : sql.ConnectionPool | null = null
    try
    {
        pool = await sqlConnection()
        const Update = await pool.request()
        .input('AnimalID',sql.UniqueIdentifier, req.body.AnimaldId)
        .input('Enable',sql.NVarChar(100), req.body.Description)
        .execute('UPDATE_ANIMALS')
        pool.close()
        res.json({result:Update, mesage:"Update Correcto"}).status(200)
    }catch(error)
    {
        console.error('Error en la conexion.',error)
        res.json({result:error, mesage:"Error"}).status(401)
    }
}