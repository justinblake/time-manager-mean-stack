var express = require('express');
var userRouter = express.Router();
var UserObject = require('../models/calendar');

// get all users and their tasks

userRouter.get('/', function (req, res) {
    UserObject.find(function (err, tasks) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(tasks);
        }
    })
});

// get a specific user by ID

userRouter.get('/:id', function (req, res) {
    UserObject.findById(req.params.id, function (err, user) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(user);
        }
    })
});

// get a specific user by username

userRouter.get('/username/:username', function(req, res) {
    UserObject.findOne({"username": req.params.username}, function( err, user) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(user);
        }
    })
});

// create a new user

userRouter.post('/', function (req, res) {
    var user = new UserObject(req.body);
    user.save(function (err, newUser) {
        if (err) {
            res.send("error");
        } else {
            res.send(newUser);
        }
    });
});

// create a new task on a specific user

userRouter.post('/:id/task/', function (req, res) {
    UserObject.findByIdAndUpdate(req.params.id, {$push: {tasks: req.body}}, {
        safe: true,
        new: true
    }, function (err, taskPost) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(taskPost)
        }
    });
});

// update a specific user

userRouter.put('/:id', function (req, res) {

    var test2 = JSON.stringify("req.body " + req.body);
    console.log("test2 " + test2);

    UserObject.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, updatedUser) {
        if (err) {
            res.status(500).send(err);
        } else {
            var test = JSON.stringify(updatedUser);
            console.log("test " + test);
            res.send(updatedUser)
        }
    });
});

// update a task on a specific user

userRouter.put('/:userId/task/:taskId', function(req, res) {
    UserObject.findById(req.params.userId, function( err, user) {
        var subDoc = user.tasks.id(req.params.taskId);
        subDoc.set(req.body);
        user.save().then(function(savedTask) {
            res.send(savedTask);
        }).catch(function(err) {
            res.status(500).send(err);
        })
    })
});

// delete a specific user

userRouter.delete('/:userId', function (req, res) {
    UserObject.findByIdAndRemove(req.params.userId, function (err, user) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(user);
        }
    });
});

// delete a specific task

userRouter.delete('/:userId/tasks/:taskId', function (req, res) {
    UserObject.findById(req.params.userId, function (err, user) {
        if (err) {
            res.status(500).send(err);
        } else {
            var doc = user.tasks.id(req.params.taskId).remove();
            user.save(function (err) {
                if (err) {
                    return res.status(500).send(err)
                }
                res.send(user);
            });
        }
    });
});


module.exports = userRouter;