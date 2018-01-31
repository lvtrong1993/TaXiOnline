var mysql = require('mysql'),
q = require('q');

exports.load = (sql) => {

var d = q.defer();

var connection  = mysql.createConnection({  
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'AppDatXe'

}); 
connection.connect();

    connection.query(sql, function(error, results, fields) {  
        if (error) {
            //console.log(error);
            d.reject(error);
        } else {
            d.resolve(results);
        }
    
        connection.end();
    }); 


return d.promise;
};

exports.insert = (sql) => {
    
        var d = q.defer();
    
        var connection  = mysql.createConnection({  
            host: 'sql9.freemysqlhosting.net',
            user: 'sql9203456',
            password: 'IuIGiLViV4',
            database: 'sql9203456'
        
        }); 
        
        connection.connect();
        connection.query(sql, function(error, value) {  
            if (error)  {
                d.reject(error);
            } else {
                d.resolve(value.insertId);
            }
    
            connection.end();
        }); 
    
        return d.promise;
    };

    
exports.connection = () => {
        var connection  = mysql.createConnection({  
            host: 'sql9.freemysqlhosting.net',
            user: 'sql9203456',
            password: 'IuIGiLViV4',
            database: 'sql9203456'
        
        }); 
        connection.connect();
         return connection;
       // connection.end();
    };
