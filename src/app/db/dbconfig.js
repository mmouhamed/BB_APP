import sql from "mssql"

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    port: 1433,
    options: {
        
        trustedconnection: true,
        trustServerCertificate: true
    },
}


export default async function ExecuteQuery(query, params) {
    let pool;
    try {
        pool = await sql.connect(config);
        const request = pool.request();

        // Check if parameters are provided and add them to the request
        if (params) {
            Object.keys(params).forEach(key => {
                request.input(key, sql.VarChar, params[key]); // Adjust type as necessary
            });
        }

        let result = await request.query(query);
        return result.recordset;
    } catch (error) {
        console.error("Database query error:", error.message); // Log the error message
        throw new Error("Database query failed: " + error.message);
    } finally {
        if (pool) {
            await pool.close(); // Ensure connection closure
        }
    }
}

//     try {
//         let pool = await sql.connect(config);
//         const result = await pool.request().query(query);
//         console.log(result.recordset); // Log the results
//     } catch (error) {
//         console.error("Error connecting to the database:", error.message);
//     } finally {
//         await sql.close(); // Close the connection
//     }
// }




// const sql = require('mssql');

// const dbConfig = {
//     user: 'sa',
//     password: 'Mawlana7007',
//     server: 'localhost',
//     database: 'devsql1902',
//     port: 1433,
//     options: {
//         instancename: 'localhost',
//         trustedconnection: true,
//         trustServerCertificate: true
//     },
// }

// async function connectDB(query, options) {
//     try{
//         let pool = await sql.connect(dbConfig);
//         console.log("connected to SQL Server")
//         let products = await pool.request().query(query);
//         return products.recordsets;
//     }catch (error){
//         console.error('Error connecting to SQL Server', error);
//     }
// }

// module.exports = {sql, connectDB,};