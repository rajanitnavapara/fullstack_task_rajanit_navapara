import express from "express";
import cors from "cors"; // Enable CORS for development
import http from 'http';
import { Server as HTTPServer } from 'http';
import {Socket, Server} from 'socket.io';
import {TaskController} from './controllers/task.controller';

const PORT = process.env.PORT || 3001;
const firstName = "RAJANIT";
const key = `FULLSTACK_TASK_${firstName}`; //FULLSTACK_TASK_RAJANIT
const CACHE_FLAG_KEY = "CACHE_FLAG";
const MONGODB_URI =
  "mongodb+srv://rajanitnavapara9999:uVawV5G5f2uR5lmA@cluster0.veftxyg.mongodb.net/";


// Initialize Express app
const app = express();

// Apply middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// ------------------Socket Implementation Starts-------------------

const http_server : HTTPServer = http.createServer(app);
const io: Server = new Server(http_server,{
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});


const taskController = new TaskController();

io.on('connection', async (socket: Socket) => {
  console.log('Socket connected.');
  let tasks : string[] = [];

  await taskController.getAllTasks()
  .then((fetched_task : any) => {

    if (fetched_task && fetched_task.length != tasks.length){
      tasks = fetched_task;
      console.log('Tasks: ', tasks);
      socket.emit('tasks', tasks);
    }
  });

  socket.on('fetchAlltasks', async () => {
    console.log('Fetching tasks from server');
    
    await taskController.getAllTasks().then((fetched_task: any) => {
      let tasks : string[] = fetched_task;
      console.log('Tasks: ', tasks);
      socket.emit('tasks', tasks);
    }) ;
    
  });

  socket.on('add', async(task: string) => {
    console.log('Adding task from server: ' + task);

   await taskController.addTask(task);

    await taskController.getAllTasks().then((fetched_task: any) => {
      console.log('Fetched Task: ', fetched_task);
      let tasks : string[] = fetched_task;
      console.log('Tasks: ', tasks);
    socket.emit('tasks', tasks); 
    }) ;

    // Socket event for disconnect
  socket.on('disconnect', () => {
    console.log('Socket disconnected.');
  });

});
});


// ------------------Socket Implementation Ends-------------------  

app.get('fetchAllTasks', taskController.fetchAllTasks);

// Start the server 
http_server.listen(PORT, () => {
  console.log(`Server is running on : http://localhost:${PORT}`);
});