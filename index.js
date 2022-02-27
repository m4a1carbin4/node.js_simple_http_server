const express = require('express');
const app = express();
const tests = require('./export');
const port = 8000; /* port setting => 
Occasionally, permission denied problems may occur 
depending on the setting of the user network, 
and can be modified when a problem occurs.*/

// To serve static files such as images, CSS files, and JavaScript files, use the express.static built-in middleware function in Express.
app.use(express.static('sample_files'))
app.use(express.static('example_html'))

// HTTP GET method route
app.get('/get_test',(req, res) => {
    res.send('hello Express (get)')
});

// HTTP POST method route
app.post('/post_test',(req, res) => {
    res.send('hello Express (post)')
});

/* 
Special route method (all) => 
Used to load middleware functions from one path for all request methods.
*/
app.all('/secret',(req,res,next)=>{
    console.log('Accessing the secret section ...');
    next();
}, function(req,res){
    console.log("secret request!");
    res.send("secret key : gachon.ac.kr");
});

// chainable route handlers for a route path by using app.route(). 
// Because the path is specified at a single location,
// creating modular routes is helpful, as is reducing redundancy and typos.  
app.route('/route')
    .get(function(req,res){
        res.send('/route - > get')
    })
    .post(function(req,res){
        res.send('/route - > post')
    })
    .put(function(req,res){
        res.send('/route - > put')
    });

/*Transfers the file at path as an “attachment”. Typically, browsers will prompt the user for download. By default, 
the Content-Disposition header “filename=” parameter is path (this typically appears in the browser dialog). 
verride this default with the filename parameter. */

app.route('/test_download.jpg')
    .get(function(req,res){
        res.download('./sample_files/gachon_logo.png')
    })
    .post(function(req,res){
        res.download('./sample_files/gachon_logo.png')
    })

app.route('/test_download2.jpg')
    .get(function(req,res){
        res.download('./sample_files/gachon_logo.png','changed_name.jpg',function(err){
            if(err){
                console.log('error happen');
                res.send('error happen sorry.');
            }else{
                console.log('transport complete');
            }
        })
    })
    .post(function(req,res){
        res.download('./sample_files/gachon_logo.png','changed_name.jpg',function(err){
            if(err){
                console.log('error happen');
                res.send('error happen sorry.');
            }else{
                console.log('transport complete');
            }
        })
    })

app.route('/test_download_err.jpg')
    .get(function(req,res){
        res.download('/sample_files/gachon_logo.png',function(err){
            if(err){
                console.log('error happen');
                res.send('error happen sorry.');
            }else{
                console.log('transport complete');
            }
        })
    })
    .post(function(req,res){
        res.download('/sample_files/gachon_logo.png',function(err){
            if(err){
                console.log('error happen');
                res.send('error happen sorry.');
            }else{
                console.log('transport complete');
            }
        })
    })

// bind ~/testing_boom at tests (export.js)
app.use('/testing_boom',tests)

// html data send.
app.route('/test_home')
    .get(function(req,res){
        res.sendFile(__dirname + "/example_html/index.html")
    })
    .post(function(req,res){
        res.sendFile(__dirname + "/example_html/index.html")
    })


// bind and listen the connections on the specified host and port (port: 8000)
app.listen(port, ()=>{
    console.log('express server listen...')
});