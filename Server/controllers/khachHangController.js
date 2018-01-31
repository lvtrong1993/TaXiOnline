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
var khachHangController = function(khachHangModel){  


    var checkExistCustomer = function(sdt){
       return khachHangModel.checkExistCustomer(sdt);
    }
    var addCustomer = function(objCustomer){
        console.log(objCustomer);
        var sdt= objCustomer.sdtKH;
        var tenKH= objCustomer.tenKH;
        return khachHangModel.addCustomer(sdt, tenKH);
    }
    return {
        checkExistCustomer:checkExistCustomer,
        addCustomer:addCustomer
    }



}
module.exports = khachHangController;


