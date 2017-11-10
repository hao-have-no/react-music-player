import Mysql from 'mysql';

var pool=Mysql.createPool({
   host:'localhost',
   port:'3307',
   user:'root',
   password:'123456',
   data:'music'
});

function  query(sql,callback) {
    pool.getConnection(function (err,connection) {
        connection.query(sql,function (err,rows) {
            callback(err,rows);
            connection.release();
        })
    })
}

exports.query=module;