"use strict";
let express = require('express');
let app = express();
let path = require('path');

app.use(express.static('public'));

app.get('*', function(req, res){
    res.sendfile(path.resolve(__dirname, 'public', 'index.html'))
});

app.listen(3000, function(){
    console.log('listening on port 3000...')
});