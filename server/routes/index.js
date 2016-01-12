var express = require('express');
var path = require('path');
var router = express.Router();

var Assignment = require('../../models/assignments');

router.get('/findAssignments/:id', function(request, response){
    Assignment.find({_id: request.params.id}, function (err, assignments) {
        if (err) {
            console.log(err);
        } else {
            response.send(assignments);
        }
    });

});

router.get('/findAssignments', function(request, response){
    Assignment.find({}, function (err, assignments) {
        if (err) {
            console.log(err);
        } else {
            response.send(assignments);
        }
    });
});

router.post('/createAssignment', function(request, response){
    Assignment.create({
        assignment_number: request.body.assignment_number,
        student_name: request.body.student_name,
        score: request.body.score,
        date_completed: request.body.date_completed
    }, function(err){
        if (err) {
            console.log(err);
        } else {
            response.sendStatus(200);
        }
    });
});

router.put('/updateAssignment', function(request, response){
    Assignment.findById(request.body.id, function(err, assignment){
        if(err){
            console.log(err);
        }

        assignment.assignment_number = request.body.assignment_number;
        assignment.student_name = request.body.student_name;
        assignment.score = request.body.score;
        assignment.date_completed = request.body.date_completed;

        assignment.save(function(err){
            if (err) {
                console.log(err);
            } else {
                response.sendStatus(200);
            }
        });

    });
});

router.delete('/deleteAssignment/:id', function(request, response){
    Assignment.remove({_id: request.params.id}, function(err){
        if(err) {
            console.log(err);
        } else {
            console.log("deleted", request.params.id);
            response.sendStatus(200);
        }
    });
});

router.get('/', function(request, response){
    console.log("INDEX GOT HIT");
    response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;
