import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask } from '../store/tasksSlice';
import { MaterialIcons } from '@expo/vector-icons';

// All the necessary functionalities of MainTasksScreen...
const MainTasksScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  // adding main tasks...
  const handleAddTask = () => {
    Keyboard.dismiss();
    if (newTask.title.trim()) {
      dispatch(addTask(newTask));
      setNewTask({ title: '', description: '' });
    }
  };

  // deleting the main tasks...
  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  // rendering the MainTasksScreen Page...
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.taskItem}
      onPress={() => navigation.navigate('TaskDetails', { taskId: item.id })}
    >
      <View style={styles.taskItemContent}>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <TouchableOpacity onPress={() => handleDeleteTask(item.id)}>
          <MaterialIcons name="delete-forever" size={28} color="red" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Main Tasks</Text>
      <View style={styles.taskListContainer}>
        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.taskList}
        />
        
        <TextInput
            style={styles.addTaskInput}
            placeholder="Add Title"
            placeholderTextColor="lightgray"
            value={newTask.title}
            onChangeText={(text) => setNewTask({ ...newTask, title: text })}
        />
        <TextInput
            style={styles.addTaskInput}
            placeholder="Add Description"
            placeholderTextColor="lightgray"
            value={newTask.description}
            onChangeText={(text) => setNewTask({ ...newTask, description: text })}
        />
        <TouchableOpacity style={styles.addTaskButton} onPress={handleAddTask}>
            <Text style={styles.addTaskButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styling Part...
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: '#383838',
    marginBottom: 20,
  },
  taskListContainer: {
    flex: 1,
  },
  taskList: {
    flexGrow: 1,
  },
  taskItem: {
    backgroundColor: '#F9F7FA',
    borderRadius: 15,
    paddingRight: 20,
    paddingLeft: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  taskItemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 16,
    textAlign: 'left',
    color: 'black',
    fontWeight: '500',
  },
  addTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  addTaskInput: {
    backgroundColor: '#F9F7FA',
    borderRadius: 15,
    paddingLeft: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  addTaskButton: {
    width: 60,
    backgroundColor: '#6BCB77',
    borderRadius: 15,
    paddingVertical: 3,
    paddingLeft: 18,
    paddingRight: 20,
    paddingTop: 2,
    paddingBottom: 4,
    marginBottom: 30,
    marginLeft: 'auto',
  },
  addTaskButtonText: {
    fontSize: 40,
    color: 'white',
  },
});

export default MainTasksScreen;
