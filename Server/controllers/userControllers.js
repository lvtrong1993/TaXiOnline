var cloudinary = require('cloudinary');
//     async = require('async');

cloudinary.config({
	cloud_name: 'dxnapa5zf',
	api_key: '219348637198157',
	api_secret: 'FJl9rCE5dTS_kgkX_rPvUyMTwZY'
});

var q = require('q');
var d = q.defer();

//var p = new Promise();
var userController = function(userModel){  
  /*  var checkLogin = function(us, pwd){
        var checkKQ=false;
        var Promise = userModel.checkLogin(us, pwd)
         .then(function (result) {
             //return result;
             if(result.length<1){
                // res.json(result);
                 console.log("Không tồn tại user");
                 checkKQ= true;
             }else{
               // d.resolve(value.insertId);
               checkKQ= true;
                 console.log("Có tồn tại user - legth:"+result.length);
             }
             
         })
         .catch(function (error) {
             console.log(error);
             res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
             checkKQ= false;
             
         })
         q.all(promises).then(
            //return checkKQ;
        );
        
    }*/

    var checkLogin = function(us, pwd){
       return userModel.checkLogin(us, pwd);
    }
    var checkExitsUser = function(us, pwd, type){
        return userModel.checkExitsUser(us, pwd, type);
    }
    var getDriverIdByUs =function(username){
        return userModel.getDriverIdByUs(username);
    }
    var getDriverUsById =function(idtx){
        return userModel.getDriverUsById(idtx);
    }
    return {
        checkLogin:checkLogin,
        checkExitsUser: checkExitsUser,
        getDriverIdByUs: getDriverIdByUs,
        getDriverUsById: getDriverUsById
    }


    // var checkLogin = function(req, res){
    //     var us=req.ussername;
    //     var pwd= req.password;
       
       
    //     userModel.checkLogin(us, pwd)
    //     .then(function (result) {
    //         //return result;
    //         if(result.length<1){
    //             console.log("Không tồn tại user");
    //             res.send("false");
    //         }else{
    //             console.log("Có tồn tại user - legth:"+result.length);
    //             res.send("true");
    //         }
  
    //     })
    //     .catch(function (error) {
    //        // return true;
    //        res.send("false");
    //         console.log(error);
    //         res.status(404).json({errors: ['Có lỗi trong quá trình xử lý']});
            
    //     })
      
    // }
    return {
        checkLogin:checkLogin
    }
}
module.exports = userController;


