import React, { useState } from 'react';

const TaskItem = ({ task, onUpdateTask, onDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

  const handleSave = () => {
    if (!editText.trim()) return;
    if (editText.trim() !== task.title) {
      onUpdateTask(task._id, { title: editText.trim() });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(task.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="flex items-center justify-between p-3.5 mb-2.5 bg-gray-50 hover:bg-gray-100/80 rounded-xl transition-all border border-gray-100">
      {isEditing ? (
        <div className="flex items-center gap-2 flex-1 mr-1">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 px-3 py-1 text-sm rounded-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-gray-800"
          />
          <button
            onClick={handleSave}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition-colors shadow-sm"
          >
            Update
          </button>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
            <span className="truncate text-gray-800 font-medium">
              {task.title}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsEditing(true)}
              className="text-xs font-medium text-indigo-600 focus:outline-none"
            >
              Edit
            </button>
            <button
              onClick={() => onDeleteTask(task._id)}
              className="text-xs font-medium text-red-600 focus:outline-none"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TaskItem;
