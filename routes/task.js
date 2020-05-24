const express = require("express");
const {
    getTasks,
    createTask,
} = require("../controllers/task");
const { requireSignin } = require("../controllers/auth");
const { createTaskValidator } = require("../validator");

const router = express.Router();

router.get("/api/tasks", getTasks);

router.post(
    "/api/task/new/",
    requireSignin,
    createTask,
    createTaskValidator
);




module.exports = router;