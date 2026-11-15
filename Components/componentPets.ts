import {sqlConnection}  from '../Sqlconnection/sqlconection'
import {  Request, Response } from 'express';
import sql, { MAX } from 'mssql'

export async function insertPets( req: Request, res: Response):Promise<void>{
    let pool : sql.ConnectionPool | null = null
    try
    {   
        console.log(req.body)
        pool = await sqlConnection()
        const Create = await pool.request()
        .input('Description',sql.NVarChar(100), req.body.data.Description)
        .input('User',sql.NVarChar(50),req.body.data.User)
        .input('Enable',sql.Bit, req.body.data.Enable)
        .input('Name',sql.NVarChar(50), req.body.data.Name)
        .input('Type',sql.NVarChar(50), req.body.data.Type)
        .input('OldDate',sql.NVarChar(50), req.body.data.OldDate)
        .input('Image', sql.NVarChar(MAX),req.body.data.Images)
	    .input('Image2', sql.NVarChar(MAX),req.body.data.Images2)
	    //.input('Web', sql.NVarChar(50),req.body.data.ANIMALS_WEB)
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

export async function selectPets( req: Request, res: Response):Promise<void>{
    let pool : sql.ConnectionPool | null = null
    try
    {   
        console.log(req.query.Type)
        pool = await sqlConnection()
        const Select = await pool.request()
        .input('ANIMALS_ID',sql.UniqueIdentifier, req.query.ANIMALS_ID)
        .input('User',sql.NVarChar(50),req.query.ANIMALS_USER)
        .input('Enable',sql.Bit, req.query.Enable)
        .input('Type',sql.NVarChar(50), req.query.Type)
	    //.input('Web', sql.NVarChar(50),req.query.ANIMALS_WEB)
        .execute('SELECT_ANIMALS')
        pool.close()
        console.log(Select)
        res.json({result:Select, mesage:"Seleccion"}).status(200) 
    }catch(error){
        console.error('Error en la conexion.',error)
        res.json({result:error, mesage:"Error"}).status(401)
    }
}

export async function UpdatePets( req: Request, res: Response):Promise<void>{
    let pool : sql.ConnectionPool | null = null
    try{
        console.log(req)
        pool = await sqlConnection()
        const Update = await pool.request()
        .input('AnimalID',sql.UniqueIdentifier, req.body.data.AnimaldId)
        .input('Description',sql.NVarChar(100), req.body.data.Description)
        .input('User',sql.NVarChar(50),req.body.data.User)
        .input('Enable',sql.Bit, req.body.data.Enable)
        .input('Name',sql.NVarChar(50), req.body.data.Name)
        .input('Type',sql.NVarChar(50), req.body.data.Type)
        .input('OldDate',sql.NVarChar(50), req.body.data.OldDate)
        .input('Image', sql.NVarChar(MAX),req.body.data.Images)
	    .input('Image2', sql.NVarChar(MAX),req.body.data.Images2)
	//.input('Web', sql.NVarChar(50),req.body.data.Web)
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
        .input('AnimalID',sql.UniqueIdentifier, req.body.ANIMALS_ID)
        .input('Enable',sql.NVarChar(100), req.body.ANIMALS_DESCRIPTION)
        .execute('UPDATE_ANIMALS')
        pool.close()
        res.json({result:Update, mesage:"Update Correcto"}).status(200)
    }catch(error)
    {
        console.error('Error en la conexion.',error)
        res.json({result:error, mesage:"Error"}).status(401)
    }
}


