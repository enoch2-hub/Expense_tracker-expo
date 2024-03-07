// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './MainScreen';
import AddExpenseScreen from './AddTransaction'; 

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
        {/* Add other screens here, e.g., AddExpenseScreen */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
