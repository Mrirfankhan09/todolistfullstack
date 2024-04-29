const express = require('express');
const Router = express.Router();
const taskscontroller = require('../controller/tasks')


// Router.get('',taskscontroller.getAlltasks);
Router.get('/taskAr',taskscontroller.getAlltaasks);
Router.post('',taskscontroller.createTask);
Router.put('/:id',taskscontroller.updateTask);
Router.delete('/:id',taskscontroller.deleteTask);
Router.post('/:id/subtask',taskscontroller.createsubTask);
Router.put('/:taskid/subtask/:subtaskid',taskscontroller.updateSubtask)
Router.delete('/:taskid/subtask/:subtaskid',taskscontroller.deleteSubtask)

module.exports = Router;