import React from "react";
import {TaskType} from "./App";
import ToDoListHeader from "./ToDoListHeader";
import Button from "./Button";
import TaskList from "./TaskList";

type ToDoListPropsType = {
    title: string;
    tasks: Array<TaskType>
    removeTasks: (id: number) => void
}
 function ToDoList(props:ToDoListPropsType ) {
    return(
        <div>
         <ToDoListHeader title = {props.title}/>
         <div>
          <input/>
          <button>+</button>
         </div>
            <TaskList  tasks = {props.tasks} removeTasks={props.removeTasks}/>

         <div>
             <Button  title={"All"}/>
             <Button  title={"Active"}/>
             <Button  title={"Completed"}/>

         </div>
        </div>
    )
 }
 export default ToDoList;