import {sqlConnection}  from '../Sqlconnection/sqlconection'
import sql from 'mssql'
import { datosI } from '../Type/type';
import { datosS } from '../Type/type';

export async function insertLogs( params : datosI):Promise<{ result: any; status: number }>{
    let pool : sql.ConnectionPool | null = null
    try{
        pool = await sqlConnection()
        const create = await pool.request()
        .input('IDTRANSACTIONS',sql.Int, params.IDTRANSACTIONS)
        .input('USERID',sql.Int,params.USERID)
        .input('TOTALDEBT',sql.Float, params.TOTALDEBT)
        .input('IP',sql.Float, params.IP)
        .input('BANK',sql.NVarChar, params.BANK)
        .input('PAY',sql.Float,params.PAY)
        .input('DEBT',sql.Float,params.DEBT)
        .input('PAYMENTDATE',sql.DateTime, new Date())
        .execute('LOGSINSERT')
        pool.close()
        
        return {result:create, status: 200}
    }catch(error){
        console.error('Error en la conexion.',error)
        return { result: error, status:402}
    }
}

export async function selectLogs( params : datosS):Promise<{ result: any; status: number }>{
    let pool : sql.ConnectionPool | null = null
    try{
        pool = await sqlConnection()
        const create = await pool.request()
        .input('IDTRANSACTIONS',sql.Int, params.IDTRANSACTIONS)
        .execute('LOGSSELECT')
        pool.close()
        return {result:create, status: 200}
        

    }catch(error){
        console.error('Error en la conexion.',error)
        return { result: error, status:402}
    }
}
