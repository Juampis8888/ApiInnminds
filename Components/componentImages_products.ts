import {sqlConnection}  from '../Sqlconnection/sqlconection'
import {  Request, Response } from 'express';
import sql,{ MAX} from 'mssql'

export async function CreateImages_products(req:Request, res:Response):Promise<void>{
    let pool : sql.ConnectionPool | null = null
    try{
        console.log(req.body)
        pool = await sqlConnection()
        const Create = await pool.request()
        .input('IMAGES_PRODUCT_NAME',sql.NVarChar(MAX),req.body.data.IMAGES_PRODUCT_NAME)
        .input('IMAGES_PRODUCT_DATA',sql.NVarChar(MAX),req.body.data.IMAGES_PRODUCT_DATA)
        .input('IMAGES_PRODUCT_ENABLE',sql.Bit,req.body.data.IMAGES_PRODUCT_ENABLE)
        .input('IMAGES_PRODUCT_DESCRIPTION',sql.NVarChar(150),req.body.data.IMAGES_PRODUCT_DESCRIPTION)
        .input('IMAGES_PRODUCT_USER',sql.NVarChar(100),req.body.data.IMAGES_PRODUCT_USER)
        .input('IMAGES_PRODUCT_LAST_USER',sql.NVarChar(100),req.body.data.IMAGES_PRODUCT_LAST_USER)
        .input('IMAGES_PRODUCT_DATE',sql.DateTime, new Date())
        .input('IMAGES_PRODUCT_LAST_DATE',sql.DateTime, new Date())
        .execute('INSERT_IMAGES_PRODUCT')
        pool.close()
        res.json({result:Create, mensage:'Creacion exitosa.'}).status(200)

    }catch(error){
        console.log('Error en la conexion.',error)
        res.json({result:error, mensage:'Errro'}).status(401)
    }
}

export  async function SelectImages_products(req:Request, res:Response):Promise<void>{
    let pool : sql.ConnectionPool | null = null
    try{
        console.log(req.query)
        pool = await sqlConnection()
        const Select = await pool.request()
        .input('IMAGES_PRODUCT_NAME',sql.Int,req.body.data.IMAGES_PRODUCT_NAME)
        .execute('SELECT_IMAGES_PRODUCTS')
        pool.close()

        res.json({result:Select, mensage:'Select'}).status(200)

    }catch(error){
        console.log('Error en la conexion.',error)
        res.json({result:error, mensage:'Error'}).status(401)
    }
}

export async function UpdateImages_products(req:Request, res:Response):Promise<void>{
    let pool : sql.ConnectionPool | null = null
    try{
        console.log(req.body)
        pool = await sqlConnection()
        const Delete = await pool.request()
        .input('IMAGES_PRODUCT_ID',sql.Int,req.body.data.IMAGES_PRODUCT_ID)
        .input('IMAGES_PRODUCT_NAME',sql.NVarChar(MAX),req.body.data.IMAGES_PRODUCT_NAME)
        .input('IMAGES_PRODUCT_DATA',sql.NVarChar(MAX),req.body.data.IMAGES_PRODUCT_DATA)
        .input('IMAGES_PRODUCT_ENABLE',sql.Bit,req.body.data.IMAGES_PRODUCT_ENABLE)
        .input('IMAGES_PRODUCT_DESCRIPTION',sql.NVarChar(150),req.body.data.IMAGES_PRODUCT_DESCRIPTION)
        .input('IMAGES_PRODUCT_USER',sql.NVarChar(100),req.body.data.IMAGES_PRODUCT_USER)
        .input('IMAGES_PRODUCT_LAST_USER',sql.NVarChar(100),req.body.data.IMAGES_PRODUCT_LAST_USER)
        .input('IMAGES_PRODUCT_DATE',sql.DateTime, new Date())
        .input('IMAGES_PRODUCT_LAST_DATE',sql.DateTime, new Date())
        .execute('UPDATE_IMAGES_PRODUCTS')
        pool.close()
        res.json({result:Delete, mensage:'Update exitoso.'}).status(200)

    }catch(error){
        console.log('Error en la conexion.',error)
        res.json({result:error, mensage:'Error'}).status(401)
    }
}

export async function DeleteImages_products(req:Request, res:Response):Promise<void>{
    let pool : sql.ConnectionPool | null = null
    try{
        console.log(req.body)
        pool = await sqlConnection()
        const Delete = await pool.request()
        .input('IMAGES_PRODUCT_ID',sql.Int,req.body.data.IMAGES_PRODUCT_ID)
        .execute('DELETE_IMAGES_PRODUCTS')
        pool.close()
        res.json({result:Delete, mensage:'Delete'}).status(200)

    }catch(error){
        console.log('Error en la conexion.',error)
        res.json({result:error, mensage:'Error'}).status(401)
    }
}

