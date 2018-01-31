var cloudinary = require('cloudinary');
//     async = require('async');

cloudinary.config({
	cloud_name: 'dxnapa5zf',
	api_key: '219348637198157',
	api_secret: 'FJl9rCE5dTS_kgkX_rPvUyMTwZY'
});

var q = require('q');
var d = q.defer();
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=geometry">

//var p = new Promise();
var chuyenXeController = function(chuyenXeModel){  


    var getListDriverFree = function(loaiXe){
       return chuyenXeModel.getListDriverFree(loaiXe);
    }
   

     return {
        getListDriverFree: getListDriverFree
     }



}
module.exports = chuyenXeController;


