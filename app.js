'use strict';
const exp = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require('cors');
const jsyaml = require("js-yaml");
const app = exp(),
bodyParser = require("body-parser"),
fs = require('fs'),
http = require("http"),
port = '8000'
const swaggerTools = require("swagger-tools");
const { application, json } = require("express");
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://admin:admin@cluster0.zgw7u.mongodb.net/?retryWrites=true&w=majority')
.then(()=> {
    console.log("Database connected successfully")
})
.catch(()=>{
    console.log("err in connectiong to DB")
})

const options = {
    swaggerUi: path.join(__dirname, '/swagger.json'),
    controllers: path.join(__dirname, '/src/controllers'),
    useStubs: process.env.NODE_ENV === 'development' ? true : false
}
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type' , 'X-Requested-With');
    next();
})
const spec = fs.readFileSync(path.join(__dirname, 'api/swagger.yaml'), 'utf8')

const swaggerDoc = jsyaml.load(spec);

const uiOptions = {
    apiDocs: '/users/v1/swagger',
    swaggerUi: '/users/v1/docs',
}


swaggerTools.initializeMiddleware(swaggerDoc, function(middleware){
    app.use(middleware.swaggerMetadata());
    app.use(middleware.swaggerSecurity(options));
    app.use(middleware.swaggerRouter(options));
    app.use(middleware.swaggerUi(uiOptions));
    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type' , 'X-Requested-With');
        next();
    })
    app.use(function(err, req , res ,next){
        console.log("err" , err)
        console.log("req" , req.url)
        let reqUrl = '/users/v1/users';
        if(reqUrl.indexOf(req.url + req.method) == -1){
            const errorResponse = {
                status: 404,
                message: "method not allowed",
            }
            res.setHeader("content-Type" , "application/json");
            res.statusCode = errorResponse.status
            res.end(JSON.stringify(errorResponse))
        } else {
              res.setHeader("content-Type" , "application/json");
            res.statusCode = err.statusCode || err.status
            res.end(JSON.stringify(errorResponse))
        }
    })

    app.listen(port, () => {
        console.log(`server listining on the port :::::: http://localhost:${port}/users/v1/docs`);
    })
})