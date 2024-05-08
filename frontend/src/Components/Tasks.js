import React from 'react'

export default function Tasks({tasks}) {


  return (
    <div>
      
      {/* Notes App Notes Boc Starts Here */}

            <div className="note-list-container mt-54 mx-20 px-20 pb-20">
      <div className="note-list-head">
        <h2 className="text-30 font-bold leading-36.31 text-left pb-9 border-b border-gray-300">Notes</h2>
      </div>
      <ul className="note-list h-400 max-h-400 flex flex-col justify-start items-center text-30 font-normal leading-36.31 text-left overflow-scroll">
                  {
                  tasks.length > 0 ? (
                    tasks.map((task) => {
                      return (<li className="note-item w-full py-22 h-72 flex justify-between items-center border-b border-gray-300">{task}</li>)
                    }))
                  : 
                  (<p className="mt-2 p-10 font-bold "> No Notes Here </p>)
                  
                  }
        {/* <li class="note-item w-full py-22 h-72 flex justify-between items-center border-b border-gray-300">Note 1</li>
        <li class="note-item w-full py-22 h-72 flex justify-between items-center border-b border-gray-300">Note 2</li>
        <li class="note-item w-full py-22 h-72 flex justify-between items-center border-b border-gray-300">Note 3</li> */}
        
      </ul>
    </div>

    </div>
  )
}
