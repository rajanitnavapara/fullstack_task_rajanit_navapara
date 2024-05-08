import mongoose from 'mongoose';



const TaskDocSchema = new mongoose.Schema({
    taskList : {
        type: [String],
        required: true
    }
});

const TaskDoc = mongoose.model('assignment_rajanit', TaskDocSchema);

export { TaskDoc };