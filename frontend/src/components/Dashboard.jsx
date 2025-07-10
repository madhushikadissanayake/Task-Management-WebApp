import React, { useState } from 'react';
import { Bell, Grid3X3, Search, User, Plus, Check, Clock, Calendar, Users, Compass, Home } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design a new landing page",
      dueDate: "30th June",
      completed: true,
      completedCount: 5,
      totalCount: 15
    },
    {
      id: 2,
      title: "Fix the bug on checkout page",
      dueDate: "30th June",
      completed: true,
      completedCount: 5,
      totalCount: 15
    },
    {
      id: 3,
      title: "Write a tech blog post",
      dueDate: "30th June",
      completed: true,
      completedCount: 5,
      totalCount: 15
    },
    {
      id: 4,
      title: "Prepare for the product launch",
      dueDate: "30th June",
      completed: true,
      completedCount: 5,
      totalCount: 15
    },
    {
      id: 5,
      title: "Update the user guide documentation",
      dueDate: "30th June",
      completed: true,
      completedCount: 5,
      totalCount: 15
    }
  ]);

  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const stats = {
    total: 25,
    pending: 10,
    completed: 15
  };

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'teams', label: 'Teams', icon: Users },
    { id: 'create', label: 'Create', icon: Plus },
    { id: 'explore', label: 'Explore', icon: Compass }
  ];

  const handleNavigation = (tabId) => {
    setActiveTab(tabId);
  };

  const handleNewTask = () => {
    setShowNewTaskModal(true);
  };

  const handleCreateTask = () => {
    if (newTaskTitle.trim()) {
      const newTask = {
        id: tasks.length + 1,
        title: newTaskTitle,
        dueDate: "30th June",
        completed: false,
        completedCount: 0,
        totalCount: 15
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setShowNewTaskModal(false);
    }
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'home':
        return (
          <>
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Madhushika</h1>
              <p className="text-gray-600">Here's what's happening with your tasks</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Total tasks</h3>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Pending tasks</h3>
                <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Completed tasks</h3>
                <p className="text-3xl font-bold text-gray-900">{stats.completed}</p>
              </div>
            </div>

            {/* Create New Task Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Create a new task</h2>
                <button
                  onClick={handleNewTask}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  New task
                </button>
              </div>
            </div>

            {/* Your Tasks Section */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Your tasks</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {tasks.map((task) => (
                  <div key={task.id} className="p-6 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleTaskCompletion(task.id)}
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          task.completed 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {task.completed && <Check className="w-3 h-3 text-white" />}
                      </button>
                      
                      <div>
                        <h3 className={`text-sm font-medium ${
                          task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                        }`}>
                          {task.title}
                        </h3>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>Due on {task.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      {task.completedCount}/{task.totalCount} completed
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 border-t border-gray-200 text-center">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View all tasks
                </button>
              </div>
            </div>
          </>
        );
      
      case 'teams':
        return (
          <div className="text-center py-16">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Teams</h2>
            <p className="text-gray-600 mb-8">Collaborate with your team members on projects</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">D</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Design Team</h3>
                    <p className="text-sm text-gray-500">5 members</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Working on UI/UX projects and design systems</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">E</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Engineering</h3>
                    <p className="text-sm text-gray-500">8 members</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Building and maintaining our applications</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white font-semibold">M</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Marketing</h3>
                    <p className="text-sm text-gray-500">3 members</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Promoting our products and engaging users</p>
              </div>
            </div>
          </div>
        );
      
      case 'create':
        return (
          <div className="text-center py-16">
            <Plus className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Content</h2>
            <p className="text-gray-600 mb-8">Start a new project, task, or workspace</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <button 
                onClick={handleNewTask}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Check className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">New Task</h3>
                <p className="text-sm text-gray-600">Create a new task to track your work</p>
              </button>
              <button className="bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200 text-left">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">New Project</h3>
                <p className="text-sm text-gray-600">Start a new project with your team</p>
              </button>
            </div>
          </div>
        );
      
      case 'explore':
        return (
          <div className="text-center py-16">
            <Compass className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Explore</h2>
            <p className="text-gray-600 mb-8">Discover templates, workflows, and inspiration</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="w-full h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg mb-4"></div>
                <h3 className="font-medium text-gray-900 mb-2">Project Templates</h3>
                <p className="text-sm text-gray-600">Ready-to-use templates for common projects</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="w-full h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg mb-4"></div>
                <h3 className="font-medium text-gray-900 mb-2">Workflow Library</h3>
                <p className="text-sm text-gray-600">Automated workflows to boost productivity</p>
              </div>
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="w-full h-32 bg-gradient-to-br from-yellow-400 to-red-500 rounded-lg mb-4"></div>
                <h3 className="font-medium text-gray-900 mb-2">Community</h3>
                <p className="text-sm text-gray-600">Connect with other users and share ideas</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-black rounded-md flex items-center justify-center">
                  <Grid3X3 className="w-5 h-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-semibold text-gray-900">Taskly</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigation(item.id)}
                    className={`flex items-center px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      activeTab === item.id
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 mr-2" />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-gray-500 transition-colors duration-200">
                <Bell className="w-6 h-6" />
              </button>
              <button className="text-gray-400 hover:text-gray-500 transition-colors duration-200">
                <Grid3X3 className="w-6 h-6" />
              </button>
              <button className="text-gray-400 hover:text-gray-500 transition-colors duration-200">
                <Search className="w-6 h-6" />
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-b border-gray-200">
        <div className="flex overflow-x-auto px-4">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  activeTab === item.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500'
                }`}
              >
                <IconComponent className="w-4 h-4 mr-2" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

      {/* New Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Task</h3>
            
            <div className="mb-4">
              <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-700 mb-2">
                Task Title
              </label>
              <input
                type="text"
                id="taskTitle"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter task title..."
                autoFocus
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowNewTaskModal(false);
                  setNewTaskTitle('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors duration-200"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}