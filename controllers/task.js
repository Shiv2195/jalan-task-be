const Task = require("../models/task");
const _ = require("lodash");

exports.getTasks = async (req, res) => {
    await Task.find()
        .select("_id title text dueDate status label")
        .sort({ dueDate: -1 })
        .then(Tasks => {
            res.status(200).json(Tasks);
        })
        .catch(err => console.log(err));
};

exports.createTask = async (req, res, next) => {
    console.log(req.body);
    const task = await new Task(req.body);
    try {

        await task.save();
        res.status(200).json({ message: "Task Created Successfully! Check it out in Home Section" });
    }
    catch (err) {
        res.status(500).send(err);
    }
};





