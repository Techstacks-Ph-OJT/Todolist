import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editTask, setEditTask] = useState('');
  const [editing, setEditing] = useState(false);

  const addTask = () => {
    const task = {
      id: tasks.length === 0 ? 1 : tasks[tasks.length-1].id+1, 
      name: newTask, 
      completed: false 
    }
    setTasks([...tasks, task]);
    setNewTask('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };
  
  const completeTask = (completedTask) => {
    setTasks(
      tasks.map((task) => {
        if(task.id === completedTask) {
          return {...task, completed: true}
        }
        else{
          return task;
        }
      })
    )
  }

  const incompleteTask = (completedTask) => {
    setTasks(
      tasks.map((task) => {
        if(task.id === completedTask) {
          return {...task, completed: false}
        }
        else{
          return task;
        }
      })
    )
  }


  const editTaskHandler = (taskToEdit) => {
    setEditing(true);
    setEditTask(taskToEdit);
    setNewTask(taskToEdit.name);
  };

  const saveTask = () => {
    setTasks(
      tasks.map((task) =>
        task === editTask ? { ...task, name: newTask } : task
      )
    );
    setEditing(false);
    setEditTask('');
    setNewTask('');
  };

  const cancelEdit = () => {
    setEditing(false);
    setEditTask('');
    setNewTask('');
  };

  return (
    <div className='todo-list-container'>
      <h1>Todo List</h1>
      <div className='todo-text'>
        <input
          type='text'
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      {tasks.map((task) => (
        <div key={task.name}>
          {editing && editTask === task ? (
            <div>
              <input
                type='text'
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button onClick={saveTask}>Save</button>
              <button onClick={cancelEdit}>Cancel</button>
            </div>
          ) : (
            <div className='task-container'>
              <span className='span-task' style={{textDecoration: task.completed ? 'line-through' : '' }}>{task.name}</span>
              {task.completed ? (
                <button onClick={() => incompleteTask(task.id)}>
                    Incomplete
                </button>
                ) : (
                <button onClick={() => completeTask(task.id)}>
                    Complete
                </button>
              )}
              <button onClick={() => editTaskHandler(task)}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default App;
