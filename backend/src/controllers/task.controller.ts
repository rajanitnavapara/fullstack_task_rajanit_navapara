import { findAllTasks, addTask, moveTaskToMongoDB } from '../services/task.service';
import redisClient from '../cache';

const firstName = "RAJANIT";
const REDIS_KEY = `FULLSTACK_TASK_${firstName}`;
const CACHE_FLAG_KEY = "CACHE_FLAG";

export class TaskController {

  fetchAllTasks = async (req: any, res: any) => {
    try {
        let cacheFlag = await this.checkRedisFlag();
        
        if (cacheFlag === "0" || cacheFlag === null){
          res.send({taskList : []});
        }
        else if (cacheFlag === "1") {
          const tasks = await redisClient.get(REDIS_KEY);

          res.send({taskList : tasks !== null ? JSON.parse(tasks) : []});
          
        }
        else if (cacheFlag === "2") {
            const tasks = await findAllTasks();
            console.log(tasks);
            res.send({taskList : tasks})
        }
    
    } catch (error : any) {
      console.error(error);
      res.send({taskList : []});
    }
  }


  getAllTasks = async () => {
    try {
        let cacheFlag = await this.checkRedisFlag();
        
        if (cacheFlag === "0" || cacheFlag === null){
          return [];
        }
        else if (cacheFlag === "1") {
          const tasks = await redisClient.get(REDIS_KEY);

          return tasks !== null ? JSON.parse(tasks) : [];
        }
        else if (cacheFlag === "2") {
            const tasks = await findAllTasks();
            console.log(tasks);
            return tasks;
        }
    
    } catch (error : any) {
      console.error(error);
      return [];
    }
  }

  addTask= async (task : string) => {
    try {
        let cacheFlag = await this.checkRedisFlag();
        
        if (cacheFlag === "0" || cacheFlag === null){
            redisClient.set(REDIS_KEY, JSON.stringify([task]));
            redisClient.set(CACHE_FLAG_KEY, 1);
            return [task];
          }
        else if (cacheFlag === "1") {
            const tasks = await redisClient.get(REDIS_KEY);
            const taskList = tasks !== null ? JSON.parse(tasks) : [];
            if (tasks !== null) {
                taskList.push(task);
                redisClient.set(REDIS_KEY, JSON.stringify(taskList));
                if (taskList.length >= 50) {
                    redisClient.set(CACHE_FLAG_KEY, "2");
                    redisClient.del(REDIS_KEY);
                    moveTaskToMongoDB(taskList);
                    return taskList;
                }
                return task;
            }}
          else if (cacheFlag === "2") {
            const tasks = await addTask(task);
              return tasks;
          }

    } catch (error :any) {
      console.error(error);
    }
  }


  checkRedisFlag = async () => {
    if (!redisClient.isReady) {
        await redisClient.connect().catch(console.error);
      }
      let cacheFlag = await redisClient.get(CACHE_FLAG_KEY);
      return cacheFlag;

};

}

