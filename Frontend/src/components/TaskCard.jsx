import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FiEdit2, FiTrash2, FiEye, FiClock, FiUser } from 'react-icons/fi';

const TaskCard = ({ task, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const isOverdue = new Date(task.deadline) < new Date() && task.status !== 'Completed';

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-900 truncate">
          {task.title}
        </h3>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
            {task.status}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
            {task.priority}
          </span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
        {task.description}
      </p>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-1">
          <FiUser size={14} />
          <span>{task.assignedTo}</span>
        </div>
        <div className={`flex items-center space-x-1 ${isOverdue ? 'text-red-600' : ''}`}>
          <FiClock size={14} />
          <span>{format(new Date(task.deadline), 'MMM dd, yyyy')}</span>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">
          Created {format(new Date(task.createdAt), 'MMM dd, yyyy')}
        </span>
        <div className="flex space-x-2">
          <Link
            to={`/tasks/${task._id}`}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            title="View Details"
          >
            <FiEye size={16} />
          </Link>
          <Link
            to={`/edit-task/${task._id}`}
            className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
            title="Edit Task"
          >
            <FiEdit2 size={16} />
          </Link>
          <button
            onClick={() => onDelete(task._id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Delete Task"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
