const express=require("express")
const app=express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
const auth=require("./controllers/auth.js")
const db=require("./routes/db-config")
const cookie=require("cookie-parser");
app.use("/js",express.static(__dirname+"./public/js"))
app.use("/css",express.static(__dirname+"./public/css"))
app.set("view engine","ejs")
app.set("views","./views")
app.use("/",require("./routes/pages"))
app.use("/api",auth);
app.listen(8000,(err)=>
{
    if(err) throw err;
    console.log("Database Successfully connected!!!");
})
