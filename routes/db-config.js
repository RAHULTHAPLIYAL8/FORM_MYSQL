const sql=require("mysql");
const db=sql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:"",
        database:"coderbyte_task"
    }
)
module.exports=db;