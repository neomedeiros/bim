var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')

var DiffService = require('../services/diffService');

var jsonParser = bodyParser.json();
var diffService = new DiffService();

router.post('/left', jsonParser, function (req, res) {    
    diffService.storeValue(req.body.code, 'left', req.body.value)
    .then((diffEntry)=>{
        res.status(200).send(diffEntry);
    })
    .catch((err) => {
        res.status(400).send('uh-oh, something wrong.');
    })
    ;            
});

router.post('/right', jsonParser, function (req, res) {
    diffService.storeValue(req.body.code, 'right', req.body.value)
    .then((diffEntry) => {
        res.status(200).send(diffEntry);
    })
    .catch((err) => {
        res.status(400).send('uh-oh, something wrong.');
    });    
});

router.get('/compare/:code', jsonParser, function (req, res) {
    
    diffService.compare(req.params.code)
    .then(
        (result) => {
            res.status(200).send(result);
        }
    )
    .catch((err) => {
        res.status(400).send('unable to compare de values.');
    });    
});

module.exports = router;