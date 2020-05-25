const Task = require("../models/task");
const _ = require("lodash");
const User = require("../models/user");
// exports.getTasks = async (req, res) => {
//     await Task.find()
//         .select("_id title text dueDate status label")
//         .sort({ dueDate: -1 })
//         .then(Tasks => {
//             res.status(200).json(Tasks);
//         })
//         .catch(err => console.log(err));
// };


exports.getTasks = (req, res) => {
    Task.find({ createdBy: req.profile._id })
    .select("_id title text dueDate status label")
        .sort({ dueDate: -1 })
        .exec((err, tasks) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(tasks);
        });
};

exports.getArchiveTasks = async (req, res) => {
    Task.find({ createdBy: req.profile._id })
        .select("_id title text dueDate status label")
        .find({status : 'Completed'})
        .sort({ dueDate: -1 })
        .then(Tasks => {
            res.status(200).json(Tasks);
        })
        .catch(err => console.log(err));
};

exports.createTask = async (req, res, next) => {
    console.log(req.body);
    const task = await new Task(req.body);
    task.createdBy = req.profile;
    try {
        await task.save();
        res.status(200).json({ message: "Task Created Successfully!" });
    }
    catch (err) {
        res.status(500).send(err);
    }
};

exports.updateTask = async (req, res, next) => {
    const task = await new Task(req.body);
    const title = req.title;
    try {
        await task.findOneAndUpdate({ createdBy: {req.profile._id}, title: {title}}, {status : 'Completed'}, {
            returnOriginal: false
        });
        res.status(200).json({ message: "Task Updated Successfully!" });
    }
    catch (err) {
        res.status(500).send(err);
    }
};

exports.readTask = async (req, res, next) => {
    const task = await new Task(req.body);
    const title = req.title;
    try {
        await task.findOne({ createdBy: {req.profile._id}, title: {title}}, {
            returnOriginal: false
        });
        res.status(200).json({ message: "Task Found !" });
    }
    catch (err) {
        res.status(500).send(err);
    }
};





exports.userById = (req, res, next, id) => {
    User.findById(id)
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "User not found"
                });
            }
            req.profile = user; // adds profile object in req with user info
            next();
        });
};