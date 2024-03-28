const express = require('express');
const app = express();
const fs = require('fs'); 

app.use(express.static("out"));

// 404
app.use(function (req, res, next) {
    fs.readFile('./out/404.html', function(err, data) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
})

app.listen(8080);