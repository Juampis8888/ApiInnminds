import mssql  from 'mssql'

const config: mssql.config = { 
    server: "localhost",
    database: "Gora",
    user: "ze",
    password: "392122840",
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}

export async function sqlConnection(): Promise<mssql.ConnectionPool> {
    try 
    {
        return await mssql.connect(config);
    } catch (error) {
        console.error('Error connecting to SQL Server:', error);
        throw error;
    }
}

export default sqlConnection