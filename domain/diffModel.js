var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DiffSchema = Schema({
  code: String,
  left: String,
  right: String  
});

var DiffModel = mongoose.model('Diff', DiffSchema);

module.exports = mongoose.model('Diff');;