const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    label:{
        type : String,
        required: true
    },
    status:{
        type: String,
        required : true
    },
    dueDate: {
        type: Date,
        required: true
    },
    createdBy: {
        type: ObjectId,
        ref: "User"
    },

});

module.exports = mongoose.model("Task", taskSchema);
