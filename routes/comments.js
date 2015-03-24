var express = require('express'),
    router = express.Router(),
    database = rekuire('database/database');


router
    .get('/', function(req, res) {
        database.list(req.query.type, function (err, comments) {
            if(err)
                res.status(404).send('Not found');
            else
                res.json(comments);
        });
    })
    .put('/:id', function (req, res) {
        database.update(req.params.id, req.body, function (err, comment) {
            if(err)
                res.status(404).send('Not found');
            else
                res.json(comment);
        });
    });

module.exports = router;