import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import api from './api';
import { AlertCircle } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get('/');
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to connect to backend server. Ensure Node.js backend & MongoDB are running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);


  const handleAddTask = async (title) => {
    try {
      const response = await api.post('/', { title });
      setTasks((prevTasks) => [response.data, ...prevTasks]);
    } catch (err) {
      console.error('Error adding task:', err);
      setError('Could not add task. Please try again.');
    }
  };

  const handleUpdateTask = async (id, updatedData) => {
    try {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === id ? { ...t, ...updatedData } : t))
      );

      const response = await api.put(`/${id}`, updatedData);

      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === id ? response.data : t))
      );
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Could not update task. Refreshing...');
      fetchTasks();
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== id));
      await api.delete(`/${id}`);
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Could not delete task. Refreshing...');
      fetchTasks();
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      {/* Centered White Card with Soft Shadow */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/70 p-6 sm:p-8 border border-slate-100">
        
        {/* Header */}
        <div className="mb-6 pb-4 border-b border-gray-100 text-center">
          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            Taskflow Manager
          </h1>
        </div>

     
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="flex-1">{error}</span>
            <button
              onClick={fetchTasks}
              className="underline font-semibold hover:text-red-700"
            >
              Retry
            </button>
          </div>
        )}

      
        <TaskForm onAddTask={handleAddTask} />

       
        <TaskList
          tasks={tasks}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          loading={loading}
        />
      </div>

   
      <div className="mt-6 text-center text-xs text-gray-400 font-medium">
      
      </div>
    </div>
  );
}

export default App;
