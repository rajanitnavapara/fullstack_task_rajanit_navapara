import React, { useState } from "react";



export default function AddTask(props) {

  const [task, setTask] = useState("");

  const onAdd = (e) => {
    e.preventDefault();
    console.log('Add Task')
    if(task === "") {
      alert("Task cannot be empty");
    }
    else{
      props.addTask(task);
      setTask("");
    }
  }

  return (
    <>

<div className="note-input-container">
<form className="w-full p-15 pt-14 flex justify-around items-center">
  <input type="text" value={task} onChange={(e) => {setTask(e.target.value)}} placeholder="New Note..." className="w-500 h-72 border-none p-18 pl-23 rounded-12 shadow-note-input font-inter text-30 font-normal leading-36.31 text-left" />
  <button onClick={onAdd} className="w-154 h-72 flex p-0 pl-22 justify-around items-center border-none rounded-12 font-inter text-28 bg-saddle-brown font-bold text-white leading-33.89 text-center hover:bg-brown-800 cursor-pointer">
    <span className="w-36 h-36">
    <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 33C26.2843 33 33 26.2843 33 18C33 9.71573 26.2843 3 18 3C9.71573 3 3 9.71573 3 18C3 26.2843 9.71573 33 18 33Z"
                fill="white"
              />
              <path
                d="M18 12V24"
                stroke="#92400E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 18H24"
                stroke="#92400E"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
    </span>
    <p className="w-79 h-34">Add</p>
  </button>
</form>
</div>
</>
  );
}
