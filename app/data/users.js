var express =require('express');
var router = express.Router();

//var db=require('./db');

//查询数据
router.get('/',function (req,res,next) {
    //db.query('select * from MusicList',function (err,rows) {
    //    if(err){console.log('cuowu')}
    //    else{res.json(data);console.log(data)}
    //})
    let data=1;
    res.json(data);
    console.log(data);
})

module.exports = router;