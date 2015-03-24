var mongoose = require('mongoose'),
    _ = require('lodash'),
    CommentModel = rekuire('models/CommentModel'),
    OldDataModel = rekuire('models/OldDataModel');

var db = mongoose.connect('mongodb://jt:jt@kahana.mongohq.com:10016/pesek');

module.exports = new function Databse(){
    var that = this;

    that.importData = function () {
        CommentModel.remove({}, function(err) {
         console.log('collection removed')
         });
        OldDataModel.findById("551168966039fd401b2657c7", function (err, oldData) {
            if(err)
                return;
            oldData["nerazvrščen"].forEach(function (comment, index) {
                console.log(index + "/" + oldData["nerazvrščen"].length);
                var model = CommentModel({
                    text: comment,
                    type: 0
                });
                model.save();
            });
        });
    };

    that.update = function (id, comment, callback) {
        delete comment._id;
        CommentModel.findByIdAndUpdate(id, comment, callback);
    };

    that.list = function (type, callback) {
        var query = {};
        if(!_.isUndefined(type))
            query.type = type;
        CommentModel.find(query, callback);
    };

    that.get = function (id, callback) {
        CommentModel.findById(id, callback);
    };

    return that;
};
