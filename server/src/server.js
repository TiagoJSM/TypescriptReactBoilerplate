"use strict";
var express = require('express');
var path = require('path');
var test_1 = require('./test');
var t = new test_1.Test();
var app = express();
app.use('/client', express.static(path.join(__dirname, "../..", 'client/dist')));
app.use(express.static(path.join(__dirname, "public")));
app.get('/', function (req, res) {
    res.send('hello world' + t.doSomething());
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=server.js.map