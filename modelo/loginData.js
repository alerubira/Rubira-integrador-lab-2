import { pool } from "./conexxionBD.js";
import { Login } from './clasesEntidad.js';
let logins=[];
//console.log("login");
/*connection.connect(function(err) {
    if (err) {
        throw err;
    } else {
        connection.query("SELECT * FROM `login` where 1", function(err, result, fields) {
            if (err) {
                throw err;
            } else {
                //console.log(result);
                for(let log of result){
                    let logi=new Login(log.id_login,log.id_medico,log.usuario_login,log.clave_login);
                    logins.push(logi);
                }
               // console.log(logins);
            }
        });
    }
});*/
// Definición de una IIFE para obtener los logins utilizando el pool
(async function obtenerLogins() {
    let connection;
    try {
        // Obtener una conexión del pool
        connection = await pool.getConnection();

        // Ejecutar la consulta SQL
        const [result] = await connection.query("SELECT * FROM `login` WHERE 1");

        // Procesar los resultados
        let logins = [];
        for (let log of result) {
            let logi = new Login(log.id_login, log.id_medico, log.usuario_login, log.clave_login);
            logins.push(logi);
        }

        // Imprimir los logins o hacer otra operación con ellos
        console.log('Logins:', logins);
    } catch (error) {
        console.error('Error al obtener logins:', error);
        throw error;  // Propagar el error para manejo en niveles superiores
    } finally {
        if (connection) {
            connection.release();  // Asegurarse de liberar la conexión al pool
        }
    }
})().catch(error => {
    console.error('Error al ejecutar la función obtenerLogins:', error);
});
async function crearLogin(usuario,clave,nivel){
    
}
export{logins};