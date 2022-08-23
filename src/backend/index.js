//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));


//=======[ Main module code ]==================================================
app.get('/devices/', function(req, res) {
    let consultaSQL="SELECT * FROM Devices";
    utils.query(consultaSQL,function(err,respuesta){
        if(err){
            res.send(err).status(400);
            return;
        }
        res.send(respuesta);
    });
    
});

app.post('/devices/', function(req, res) {

    utils.query("Update Devices set description=? where id=?",[req.body.description, req.body.id],function(err,respuesta){
        if(err){
            res.send(err).status(400);
            return;
        }
        res.send(respuesta);
    });
    
});

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
