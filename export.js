var express = require('express')
var router = express.Router()
/*
express.Router class -> create modular, mountable route handlers.
A Router instance is a complete middleware and routing system; 
for this reason, it is often referred to as a “mini-app”.
*/

// middleware that is specific to this router
router.use(function timeLog (req, res, next){
    console.log('Time: ', Date.now())
    next()
})

// define the exports home route.
router.get('/',function (req,res,next){
    console.log('export route activated');
    next()
}, function (req,res){
    res.download('./sample_files/IT.png','IT_building.jpg',function(err){
        if(err){
            res.send('sorry server error happen');
            console.log('klee download err');
        }else{
            console.log('klee download complete!');
        }
    })
})

// define the about route
router.get('/about', function(req,res){
    res.send('About tests');
})

module.exports = router