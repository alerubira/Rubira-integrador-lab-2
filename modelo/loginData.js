import { connection } from "./conexxionBD.js";
import { Login } from './clasesEntidad.js';
let logins=[];
//console.log("login");
connection.connect(function(err) {
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
});
async function crearLogin(usuario,clave,nivel){
    
}
export{logins};