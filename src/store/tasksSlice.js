import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  selectedSubtasks: {},
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        title: action.payload.title,
        description: action.payload.description,
        subtasks: [],
      };
      state.tasks.push(newTask);
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== taskId);
    },
    addSubtask: (state, action) => {
      const { taskId, subtaskTitle } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      if (task) {
        if (!task.subtasks) {
          task.subtasks = [];
        }
        task.subtasks.push({
          id: Date.now(),
          title: subtaskTitle,
          completed: false,
        });
      }
    },
    toggleSubtaskSelection: (state, action) => {
      const { taskId, subtaskId } = action.payload;
      const selectedSubtasks = state.selectedSubtasks[taskId] || [];
      const index = selectedSubtasks.indexOf(subtaskId);
      if (index === -1) {
        // Subtask is not selected, add to selectedSubtasks
        state.selectedSubtasks[taskId] = [...selectedSubtasks, subtaskId];
      } else {
        // Subtask is selected, remove from selectedSubtasks
        state.selectedSubtasks[taskId] = selectedSubtasks.filter((id) => id !== subtaskId);
      }
    },
    deleteSubtask: (state, action) => {
      const { taskId, subtaskId } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      task.subtasks = task.subtasks.filter((subtask) => subtask.id !== subtaskId);
    },
    deleteSelectedSubtasks: (state, action) => {
      const { taskId, subtaskIds } = action.payload;
      const task = state.tasks.find((task) => task.id === taskId);
      task.subtasks = task.subtasks.filter((subtask) => !subtaskIds.includes(subtask.id));
      state.selectedSubtasks[taskId] = [];
    },
  },
});

export const {
  addTask,
  deleteTask,
  addSubtask,
  toggleSubtaskSelection,
  deleteSubtask,
  deleteSelectedSubtasks,
} = tasksSlice.actions;

export default tasksSlice.reducer;
