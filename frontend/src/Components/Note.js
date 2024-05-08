import React, {useState, useEffect} from 'react';
import Header from './Header';
import Tasks from './Tasks';
import AddTask from './AddTask';
import { io } from 'socket.io-client';

const client_socket = io('http://localhost:3001', { transports : ['websocket'] });
client_socket.on('connect', () => {
  console.log('Connected to the server');
});





client_socket.on('disconnect', () => { 
  console.log('Disconnected from the server');
});


export default function Note() {

    const [tasks, setTasks] = useState([]);


    useEffect(() => { 
      
      client_socket.emit("connected", (tasks) => {
        console.log("Connected to the server :", tasks);
        setTasks(tasks);
      
      })

      client_socket.on('add', (task) => {
        console.log('Task added from client: ' + task);
        setTasks(tasks);
        
      });
      
      client_socket.on('tasks', (tasks) =>{
        console.log("Got tasks", tasks)
        setTasks(tasks);
      })


    }, []);
   
    
    
  const addTask = (task) => {
    console.log("task :",task);
    client_socket.emit('add', task);
    console.log("tasks :",tasks)
  }

    // const onDelete = ()=>{

    // }

    // const addTask = (todo) =>{

    // }


    return (
        <>
        <div className='note-box'>
        <Header />
        <AddTask addTask={addTask} tasks={tasks}/>
        <Tasks tasks={tasks} />
        </div>
        </>
    )
}
