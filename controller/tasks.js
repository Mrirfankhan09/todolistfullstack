const express = require('express');
const Task = require('../model/taskSchema');


// exports.getAlltasks = (req, res) => {
//     res.sendFile('public/index.html', { root: '.' });
// }


exports.getAlltaasks = async (req, res) => {
    // res.sendFile('public/index.html', { root: '.' });
    try {
        const data = await Task.find();
        //console.log(data);
        res.status(200).json(data);

    }
    catch (e) {
        res.status(500).json({ "message": "internal error" });
    }

}

exports.createTask = async (req, res) => {
    // //console.log("iam here")
    //console.log(req.body)
    const task = new Task({ ...req.body });
    try {
        const taskSaved = await task.save();
        //console.log(taskSaved);
        res.status(201).json(taskSaved);
    }
    catch (e) {
        res.status(400).json(e);
    }
}
exports.updateTask = async (req, res) => {
    const id = req.params.id;
    // //console.log(id);
    try {
        const modifieddata = await Task.findOneAndUpdate({ _id: id }, req.body, { new: true });
        //console.log(modifieddata);
        res.status(201).json(modifieddata);

    }
    catch (e) {
        res.status(400).json(e);
    }


}
exports.deleteTask = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedTask = await Task.findOneAndDelete({ _id: id });
        //console.log(deletedTask);
        res.status(201).json(deletedTask);

    }
    catch (e) {
        res.status(400).json(e);
    }

}

exports.createsubTask = async (req, res) => {
    const id = req.params.id;
    const subtask = req.body;

    try {
        const task = await Task.findById({ _id: id });
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
        }
        else {
            task.subtasks.push(subtask);
            // //console.log(task.subtasks)
            const savedtask = await task.save();
            const newsubtask = savedtask.subtasks[savedtask.subtasks.findIndex(p=>p.title===subtask.title)];
            
            //console.log(newsubtask);
            res.status(201).json(newsubtask);

        }
    }
    catch (error) {
        // Handle any errors that occur during the subtask creation process
        console.error('Error creating subtask:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}
exports.updateSubtask = async (req, res) => {
    const { taskid, subtaskid } = req.params;
    const subtaskupdatedata = req.body;
    //console.log(req.body);
    //console.log(taskid, subtaskid);
    try {
        const task = await Task.findById({ _id: taskid });
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
        }
        else {
            const subtaskindex = task.subtasks.findIndex(subtask => subtask._id == subtaskid);
            //console.log(subtaskindex);
            if (subtaskindex === -1) {
                return res.status(404).json({ message: 'Subtask not found' });
            }
            task.subtasks[subtaskindex].completed=req.body.completed;
            // //console.log(task.subtasks[subtaskindex]);
            
            // task.subtasks[subtaskindex] = { _id: subtaskid, completed:req.body.completed }
            const updatedsubtask = await task.save();
            // res.json('okay');
            res.status(201).json(updatedsubtask);

        }
    }
    catch (error) {
        // Handle any errors that occur during the subtask creation process
        console.error('Error creating subtask:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
exports.deleteSubtask = async (req, res) => {
    const { taskid, subtaskid } = req.params;
    // const subtaskupdatedata = req.body;
    //console.log(taskid, subtaskid);
    try {
        const task = await Task.findById({ _id: taskid });
        if (!task) {
            res.status(404).json({ message: 'Task not found' });
        }
        else {
            const subtaskindex = task.subtasks.findIndex(subtask => subtask._id == subtaskid);
            // //console.log(subtaskindex);
            if (subtaskindex === -1) {
                return res.status(404).json({ message: 'Subtask not found' });
            }
            task.subtasks.splice(subtaskindex, 1);
            const deletedsubtask = await task.save();
            res.status(201).json(deletedsubtask);

        }
    }
    catch (error) {
        // Handle any errors that occur during the subtask creation process
        console.error('Error creating subtask:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
