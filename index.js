const express = require('express');
var app = require('./app');

var port = 3000;

app.listen(port, () => console.log(`NodeJS Backend sample for BIM - running on ${port}`));