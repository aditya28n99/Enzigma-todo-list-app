import React, { useState, useEffect } from 'react';
import Button from './button'
import { createTask, updateTask, deleteTask } from '../Services/taskServices'

export default function TaskForm({ formType, toggleForm, initialTaskData, selectedTask }) {

    const [taskData, setTaskData] = useState({
        assignedTo: initialTaskData?.assignedTo || '',
        status: initialTaskData?.status || '',
        dueDate: initialTaskData?.dueDate || '',
        priority: initialTaskData?.priority || '',
        comments: initialTaskData?.comments || '',
      });
      
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (formType === 'Edit' && selectedTask) {
      setTaskData(selectedTask);
    }
  }, [formType, selectedTask]);

  const handleSubmit = async (e) => {
     e.preventDefault();
    if (formType === 'Create') {
        try {
            const newTask = await createTask(taskData);
            setTasks([...tasks, newTask]);
            toggleForm();
          } catch (error) {
            console.error('Error creating task:', error);
          }
    }  else if (formType === 'Edit' && initialTaskData) {
      try {
        const updatedTask = await updateTask(initialTaskData.id, {
          assignedTo: taskData.assignedTo,
          status: taskData.status,
          dueDate: taskData.dueDate,
          priority: taskData.priority,
          comments: taskData.comments,
        });
        console.log('Task updated successfully:', updatedTask);
       
        toggleForm(); 
      } catch (err) {
        console.error('Error during task update:', err);
      }
    }else if (formType === 'Delete' && initialTaskData) {
      try {
        await deleteTask(initialTaskData.id); 
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== initialTaskData.id)); // Remove the task from the state
        console.log('Task deleted successfully:', initialTaskData.id);
        toggleForm();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
    toggleForm();
  };

  const handleChange = (e) => {
    setTaskData({
      ...taskData,
      [e.target.name]: e.target.value,
    });
  };

  const formatDate = (dateString) => {
    const [month, day, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };
  return (
    <div className="bg-blue-100 w-3/4 border-2 z-50 p-6">
      <h2 className="text-xl mb-4 text-center border-2">
        {formType === 'Create' ? 'Create New Task' : formType === 'Edit' ? 'Edit Task' : 'Delete Task'}
      </h2>

      {formType !== 'Delete' && (
        <>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="assignedTo"
              placeholder="Assigned To"
              value={taskData.assignedTo || ''}
              onChange={handleChange}
              className="p-2 border"
            />
            <input
              type="text"
              name="status"
              placeholder="Status"
              value={taskData.status || ''}
              onChange={handleChange}
              className="p-2 border"
            />
            <input
              type="date"
              name="dueDate"
              placeholder="Due Date"
              value={formatDate(taskData.dueDate) || ''}
              onChange={handleChange}
              className="p-2 border"
            />
            <input
              type="text"
              name="priority"
              placeholder="Priority"
              value={taskData.priority || ''}
              onChange={handleChange}
              className="p-2 border"
            />
          </div>

          <textarea
            name="comments"
            placeholder="Comments"
            value={taskData.comments || ''}
            onChange={handleChange}
            className="w-full p-2 mb-4 border"
          />
        </>
      )}

      <div className="flex justify-end gap-4">
        <Button variant="ghost" onClick={toggleForm}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {formType === 'Create' ? 'Create Task' : formType === 'Edit' ? 'Save Changes' : 'Confirm Delete'}
        </Button>
      </div>
    </div>
  );
}
