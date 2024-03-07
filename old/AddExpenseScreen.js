// AddExpenseScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddExpenseScreen = ({ navigation }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddExpense = async () => {
    // Validate input
    if (!description.trim() || isNaN(amount) || +amount <= 0) {
      alert('Please enter valid values for description and amount.');
      return;
    }

    try {
      // Retrieve existing expenses or initialize an empty array
      const storedExpenses = await AsyncStorage.getItem('expenses');
      const expenses = storedExpenses ? JSON.parse(storedExpenses) : [];

      // Add the new expense
      const newExpense = {
        id: Date.now(),
        description: description.trim(),
        amount: +amount,
      };
      expenses.push(newExpense);

      // Save the updated expenses array to AsyncStorage
      await AsyncStorage.setItem('expenses', JSON.stringify(expenses));

      // Navigate back to the main screen
      navigation.goBack();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Expense</Text>

      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={(text) => setDescription(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />

      <Button title="Add Expense" onPress={handleAddExpense} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});

export default AddExpenseScreen;
