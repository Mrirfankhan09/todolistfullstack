const mongoose = require('mongoose');
const {Schema} = mongoose;


const subtaskSchema = new Schema({
    title : {type:String,required:true},
    completed : {type:Boolean,default:false}
})

const taskSchema = new Schema({
    title:{type:String,required:true},
    completed : {type:Boolean,default:false},
    subtasks:[subtaskSchema]
})

const Task = mongoose.model('Task',taskSchema);
module.exports = Task;