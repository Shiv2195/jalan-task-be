const express = require("express");

const {
    getTasks,
    createTask,
    getArchiveTasks,
    userById
} = require("../controllers/task");
const { requireSignin } = require("../controllers/auth");
const { createTaskValidator } = require("../validator");

const router = express.Router();

router.get("/api/tasks/:userId", getTasks);



router.post(
    "/api/task/new/:userId",
    requireSignin,
    createTask,
    createTaskValidator
);


router.get("/api/archive/:userId", getArchiveTasks);

router.param("userId", userById);


module.exports = router;