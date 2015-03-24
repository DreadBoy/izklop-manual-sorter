var mongoose = require('mongoose');

var oldDataSchema = new mongoose.Schema({
    "ime": String,
    "primeren": [String],
    "neprimeren": [String],
    "nerazvrščen": [String]
});

module.exports = mongoose.model('OldData', oldDataSchema, "neprimeren-govor-korpus");