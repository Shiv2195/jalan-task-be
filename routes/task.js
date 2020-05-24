const express = require('express');

const {
  getTasks,
  createTask,
  updateTask,
  getArchiveTasks,
  userById,
} = require('../controllers/task');
const { requireSignin } = require('../controllers/auth');
const { createTaskValidator } = require('../validator');
const { createTaskUpdateValidator } = require('../validator');

const router = express.Router();

router.get('/api/tasks/:userId', getTasks);

router.post(
  '/api/task/new/:userId',
  requireSignin,
  createTask,
  createTaskValidator,
);

router.put(
  '/api/task/update/:taskId',
  requireSignin,
  updateTask,
  createTaskUpdateValidator,
);

router.get('/api/archive/:userId', getArchiveTasks);

router.param('userId', userById);

module.exports = router;
