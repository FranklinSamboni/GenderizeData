var request = require('request');
var query = require('../utils/utils');
var db = require('../utils/db');
var constants = require('../utils/constants');

let genderize = function(req, res){

    getCustomersNames(function (responseE,codeE){
        if(codeE != -1){    
            var listNames = getSegmentOfList(responseE);
            var totalResult = [];
            if(listNames.length > 20){
                listNames = listNames.slice(140, 160);
            }
            for(var index in listNames){
                /*var startDate = Math.floor(Date.now() / 500); // in seconds
                var endDate = startDate + 1; 
                while (startDate<=endDate){
                    startDate = Math.floor(Date.now() / 500);
                }*/
                //setTimeout(saveNames,1000,listNames[index]);
                
            }
            res.send(totalResult);  
        }else{
            res.send(responseE);
        }
    });

};

function saveNames(names){
    getNames(names, function(response, code){
        if(code != -1){
            var conn = db.connection;
            if(conn.state === 'disconnected'){
                conn.connect();
            }
            var sql = "";
            for(var resp of response){
                sql += "INSERT INTO genderize SET ? ;";
            }
            conn.query(sql,response,function (error, results, fields) {
                if (error) throw error;
                // `results` is an array with one element for every statement in the query:
                console.log(results); // [{1: 1}]
                //console.log(fields); // [{2: 2}]
                //callback(results);
              });
        }
        else{
            console.log(response);
            throw response; 
        }
    });
}

function getSegmentOfList(responseE){
    var tamano = 10;
    var cicles = parseInt(responseE.length / tamano) ;
    var mod =  responseE.length % tamano ;
    if(mod > 0){
        cicles += 1;
    }

    var names = [];
    for(var x = 0; x < cicles ; x++){
        var ini = x*tamano;
        var fin = (x+1)*tamano;
        if((x+1) === cicles){
            fin = ini + mod;
        }
        var segment = responseE.slice(ini, fin);
        names[x] = formatNames(segment);
    }
    return names;
}

function formatNames(segment){
    let names = "";
    for(var x in segment){
        names += "name["+x+"]="+segment[x];
        var len = parseInt(x)+1;
        if(len !== segment.length){
            names += "&";
        }    
    }
    return names;
}

function getCustomersNames(callback){
    var bodyrequest = query.queryElastic;
    var username = constants.user;
    var password = constants.pass;
    auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
    request({
        uri: constants.urlDb,
        headers: {
            'Content-Type':'application/json',
            "Authorization" : auth
        },
        method: 'POST',
        json:true,
        body: query.queryElastic
    }, function(error, response, body) {
        if (error){
            console.log(error);
            callback(error,-1);
        }else{
            console.log("statusCode: "+response.statusCode);
            if(response.statusCode != 200){
                console.log(response);
                callback(response,-1);
            }
            else{
                var hits = body.hits.hits;
                var names = [];
                for(var i in hits){
                    var name  =  hits[i]._source.name;
                    var arr = name.split(" ");
                    if(arr.length > 0){
                        names[i] = arr[0];
                    }
                    
                }
                callback(names,0);
            }
        }
    });
}

function getNames(names,callback){
    request({
        uri: 'https://api.genderize.io/?'+names,
        headers: {
            'Content-Type':'application/json'
        },
        method: 'GET',
        json:true
    }, function(error, response, body) {
        if (error){
            console.log(error);
            callback(error,-1);
        }else{
            console.log("statusCode: "+response.statusCode);
            if(response.statusCode != 200){
                console.log(response);
                callback(response,-1);
            }
            else{
                callback(body,0);
            }
        }
    });
}

module.exports = {
    genderize
}