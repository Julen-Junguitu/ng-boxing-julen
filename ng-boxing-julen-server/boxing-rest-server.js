"use strict";
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Boxer = /** @class */ (function () {
    function Boxer(id, name, country, age, record, lastOponents, image) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.age = age;
        this.record = record;
        this.lastOponents = lastOponents;
        this.image = image;
    }
    return Boxer;
}());
var boxers = [
    new Boxer(0, "Gennady Golovkin", "Kazakhstan", 38, "41-1-1", ["Kamil Szeremeta", "Sergiy Derevyachenko", "Steve Rolls", "Canelo Alvarez"], "https://ca-times.brightspotcdn.com/dims4/default/0a4d9bf/2147483647/strip/true/crop/1813x2048+0+0/resize/840x949!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2Fb5%2F3c%2F1471f89401f7b06078e8b7392e3c%2Fla-esp-canelogolvokin-001"),
    new Boxer(1, "Vasyl Lomachenko", "Ukraine", 32, "14-2-0", ["Teofimo Lopez", "Luke Campbell", "Jose Pedraza", "Jorge Linares"], "https://as.com/masdeporte/imagenes/2018/05/12/polideportivo/1526158347_375701_1526179834_noticia_normal.jpg")
];
function getBoxers() {
    return boxers;
}
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.post('/boxers', bodyParser.json(), function (req, res) {
    var pNew = new Boxer(boxers.length + 1, req.body.name, req.body.country, req.body.age, req.body.record, req.body.lastOponents, req.body.image);
    boxers.push(pNew);
    res.status(200).send({
        id: pNew.id,
        name: pNew.name,
        country: pNew.country,
        age: pNew.age,
        record: pNew.record,
        lastOponents: pNew.lastOponents,
        image: pNew.image
    });
});
app.get('/', function (req, res) {
    res.send('The URL of boxers is http://localhost:8000/boxers');
});
app.get('/boxers', function (req, res) {
    res.json(getBoxers());
});
function getBoxersById(boxerId) {
    var p;
    p = boxers.find(function (p) { return p.id == boxerId; });
    return p;
}
app.get('/boxers/:id', function (req, res) {
    res.json(getBoxersById(parseInt(req.params.id)));
});
function updateBoxersById(req, boxerId) {
    var p;
    p = boxers.find(function (p) { return p.id == boxerId; });
    var index = boxers.indexOf(p);
    p.name = req.body.name,
        p.country = req.body.country,
        p.age = req.body.age,
        p.record = req.body.record,
        p.lastOponents = req.body.lastOponents,
        p.image = req.body.image;
    boxers[index] = p;
    return p;
}
app.put('/boxers/:id', function (req, res) {
    res.json(updateBoxersById(req, parseInt(req.params.id)));
    res.send('Got a UPDATE request at /user');
});
function deleteBoxersById(boxerId) {
    var p;
    p = boxers.find(function (p) { return p.id == boxerId; });
    var index = boxers.indexOf(p);
    delete boxers[index];
    return p;
}
app.delete('/boxers/:id', function (req, res) {
    res.json(deleteBoxersById(parseInt(req.params.id)));
    res.send('Got a DELETE request at /user');
});
var server = app.listen(8000, "localhost", function () {
    var _a = server.address(), address = _a.address, port = _a.port;
    console.log('Listening on %s %s', address, port);
});
