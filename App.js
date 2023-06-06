import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './src/store/index';
import MainTasksScreen from './src/screens/MainTasksScreen';
import TaskDetailsScreen from './src/screens/TaskDetailsScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="MainTasks">
          <Stack.Screen name="MainTasks" component={MainTasksScreen} />
          <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
