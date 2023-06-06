// importing necessary librabries...
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addSubtask, deleteSelectedSubtasks, toggleSubtaskSelection } from '../store/tasksSlice';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Keyboard } from 'react-native';

// All the necessary functionalities of TaskDetailsScreen...
const TaskDetailsScreen = ({ route }) => {
  const { taskId } = route.params;
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks.tasks.find((task) => task.id === taskId));
  const selectedSubtasks = useSelector((state) => state.tasks.selectedSubtasks[taskId] || []);

  if (!task) {
    return null; // Return null or display an appropriate loading/error message...
  }

  const [newSubTask, setNewSubTask] = useState({ title: '' });

  // adding sub task inside the main task...
  const handleAddSubTask = () => {
    Keyboard.dismiss();
    if (newSubTask.title.trim()) {
      dispatch(addSubtask({ taskId, subtaskTitle: newSubTask.title.trim() }));
      setNewSubTask({ title: '' });
    }
  };

  // toggling the sub task completion...
  const handleToggleSubtask = (subtaskId) => {
    dispatch(toggleSubtaskSelection({ taskId, subtaskId }));
  };

  // deleting the completed sub tasks...
  const handleDeleteSubtasks = () => {
    dispatch(deleteSelectedSubtasks({ taskId, subtaskIds: selectedSubtasks }));
  };

  // rendering the TaskDetailsScreen Page...
  const renderSubtaskItem = ({ item }) => (
    <TouchableOpacity
      style={styles.subtaskItem}
      onPress={() => handleToggleSubtask(item.id)}
    >
      <View
        style={[
          styles.checkboxContainer,
          selectedSubtasks.includes(item.id) && styles.checkboxContainerSelected,
        ]}
      >
        {selectedSubtasks.includes(item.id) && (
          <Ionicons name="checkmark" size={20} color="white" />
        )}
      </View>
      <Text
        style={[
          styles.subtaskTitle,
          item.completed && { textDecorationLine: 'line-through' },
          selectedSubtasks.includes(item.id) && styles.subtaskSelected,
        ]}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Task Details</Text>
      <Text style={styles.subHeading}>Task Title</Text>
      <Text style={styles.taskTitle}>{task.title}</Text>
      <Text style={styles.subHeading}>Descriptions</Text>
      <Text style={styles.taskDescription}>{task.description}</Text>
      <View style={styles.userProfileSection}>
        <Image
          source={require('../users/u1.png')}
          style={[styles.userProfile, styles.userProfile1]}
        />
        <Image
          source={require('../users/u2.png')}
          style={[styles.userProfile, styles.userProfile2]}
        />
        <Image
          source={require('../users/u3.png')}
          style={[styles.userProfile, styles.userProfile3]}
        />
        <Image
          source={require('../users/u4.png')}
          style={[styles.userProfile, styles.userProfile4]}
        />
      </View>
      <View style={styles.subHeadingContainer}>
        <Text style={styles.subtaskHeading}>Task List</Text>
        {selectedSubtasks.length > 0 && (
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteSubtasks}>
                <MaterialIcons name="delete-forever" size={28} color="red" />
            </TouchableOpacity>
        )}
      </View>

      {task.subtasks.length > 0 ? (
        <FlatList
          data={task.subtasks}
          renderItem={renderSubtaskItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.subtaskList}
        />
      ) : (
        <Text style={styles.noSubtasksText}>No subtasks added</Text>
      )}
      
      <View style={styles.addSubTaskContainer}>
        <TouchableOpacity style={styles.addSubTaskButton} onPress={handleAddSubTask}>
          <Text style={styles.addSubTaskButtonText}>+</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.addSubTaskInput}
          placeholder="Add Task"
          placeholderTextColor="lightgray"
          value={newSubTask.title}
          onChangeText={(text) => setNewSubTask({ ...newSubTask, title: text })}
        />
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
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 18,
    textAlign: 'left',
    color: 'darkgray',
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'black',
    marginTop: 15,
  },
  taskDescription: {
    fontSize: 18,
    textAlign: 'left',
    color: 'black',
    marginTop: 15,
  },
  subHeadingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },  
  subtaskHeading: {
    fontSize: 18,
    textAlign: 'left',
    color: 'darkgray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  subtaskList: {
    flexGrow: 1,
    gap: 15,
  },
  subtaskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9F7FA',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 25,
  },
  subtaskTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'left',
    color: 'black',
    marginLeft: 10,
  },
  noSubtasksText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'lightgray',
  },
  addSubTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  addSubTaskInput: {
    flex: 1,
    color: 'black',
    borderWidth: 1,
    borderColor: '#F9F7FA',
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 22,
    backgroundColor: '#F9F7FA',
    paddingLeft: 15,
    marginLeft: -10,
    fontSize: 16,
  },
  addSubTaskButton: {
    backgroundColor: '#F9F7FA',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    paddingVertical: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  addSubTaskButtonText: {
    fontSize: 40,
    color: 'lightgray',
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    paddingTop: 20,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    marginLeft: 8,
    backgroundColor: 'white',
  },
  checkboxContainerSelected: {
    backgroundColor: '#8F43EE',
    borderColor: '#8F43EE',
  },
  userProfileSection: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: -5,
  },
  userProfile: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: 'lightgray',
    marginLeft: 5,
    zIndex: 1,
  },
  userProfile1: {
    position: 'relative',
    left: -3,
    borderWidth: 4,
    borderColor: 'white'
  },
  userProfile2: {
    position: 'relative',
    left: -22.5,
    borderWidth: 4,
    borderColor: 'white'
  },
  userProfile3: {
    position: 'relative',
    left: -42.5,
    borderWidth: 4,
    borderColor: 'white'
  },
  userProfile4: {
    position: 'relative',
    left: -62.5,
    borderWidth: 4,
    borderColor: 'white'
  },
});

export default TaskDetailsScreen;
