import { TaskDoc} from '../models/task.model';
import mongoose from 'mongoose';
const MONGODB_URI =
  "mongodb+srv://assignment_user:HCgEj5zv8Hxwa4xO@testcluster.6f94f5o.mongodb.net/";

mongoose.connect(MONGODB_URI + "assignment", {});



const findAllTasks = async () => {
    const taskDocument = await TaskDoc.findOne();
    if (taskDocument) {
        return taskDocument.taskList;
    }
    return null;
}

const addTask = async (task: string) => {
    let taskDocument = await TaskDoc.findOne();
    if (taskDocument) {
        taskDocument.taskList.push(task);
        taskDocument = await taskDocument.save();
        return task;
    }
    return null;
}

const moveTaskToMongoDB = async (taskList: String[]) => {
    const taskDocument = new TaskDoc({
        taskList: taskList
    });
    await taskDocument.save();
    return taskDocument.taskList;
}

export { findAllTasks, addTask, moveTaskToMongoDB};