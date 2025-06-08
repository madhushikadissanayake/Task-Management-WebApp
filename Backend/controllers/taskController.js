const Task = require('../models/Task');
const mongoose = require('mongoose');

const getAllTasks = async (req, res) => {
  try {
    const { search, status, sort = 'createdAt', order = 'desc' } = req.query;
    
    let query = {};
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { assignedTo: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (status && status !== 'all') {
      query.status = status;
    }
    
    const sortOrder = order === 'desc' ? -1 : 1;
    const sortObj = { [sort]: sortOrder };
    
    const tasks = await Task.find(query)
      .populate('createdBy', 'name email')
      .sort(sortObj);
    
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    
    const task = await Task.findById(id).populate('createdBy', 'name email');
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(task);
  } catch (error) {
    console.error('Get task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, deadline, assignedTo, status, priority } = req.body;
    
    if (!title || !description || !deadline || !assignedTo) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    const task = await Task.create({
      title,
      description,
      deadline: new Date(deadline),
      assignedTo,
      status: status || 'Pending',
      priority: priority || 'Medium',
      createdBy: req.user._id
    });
    
    const populatedTask = await Task.findById(task._id).populate('createdBy', 'name email');
    
    res.status(201).json(populatedTask);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, deadline, assignedTo, status, priority } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    
    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title: title || task.title,
        description: description || task.description,
        deadline: deadline ? new Date(deadline) : task.deadline,
        assignedTo: assignedTo || task.assignedTo,
        status: status || task.status,
        priority: priority || task.priority
      },
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email');
    
    res.json(updatedTask);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }
    
    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    await Task.findByIdAndDelete(id);
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getTaskStats = async (req, res) => {
  try {
    const stats = await Task.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const total = await Task.countDocuments();
    
    const formattedStats = {
      total,
      pending: stats.find(s => s._id === 'Pending')?.count || 0,
      inProgress: stats.find(s => s._id === 'In Progress')?.count || 0,
      completed: stats.find(s => s._id === 'Completed')?.count || 0
    };
    
    res.json(formattedStats);
  } catch (error) {
    console.error('Get task stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
};