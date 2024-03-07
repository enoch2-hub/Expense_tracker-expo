// AddExpenseScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const AddTransaction = ({ navigation }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');

  const handleAddTransaction = async () => {
    // Validate input
    if (!description.trim() || isNaN(amount) || +amount <= 0) {
      alert('Please enter valid values for description and amount.');
      return;
    }

    try {
      // Retrieve existing transactions or initialize an empty array
      const storedTransactions = await AsyncStorage.getItem('transactions');
      const transactions = storedTransactions
        ? JSON.parse(storedTransactions)
        : [];

      // Add the new transaction
      const newTransaction = {
        id: Date.now(),
        description: description.trim(),
        amount: +amount,
        type,
      };
      transactions.push(newTransaction);

      // Save the updated transactions array to AsyncStorage
      await AsyncStorage.setItem('transactions', JSON.stringify(transactions));

      // Navigate back to the main screen
      navigation.goBack();
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <LinearGradient
    colors={['#dcffec', '#add1ff']}
    style={styles.container}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >

    <View style={styles.container}>
      <View style={styles.content}>
      <Text style={styles.heading}>Add Transaction</Text>

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

      <Text style={styles.label}>Type:</Text>
      <Picker
        selectedValue={type}
        onValueChange={(itemValue) => setType(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Expense" value="expense" />
        <Picker.Item label="Income" value="income" />
      </Picker>

      <Button title="Add Transaction" onPress={handleAddTransaction} />



      </View>


    </View>
    </LinearGradient>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#c4cfff9f',
    height: '60%',
    borderRadius: 10,
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
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    height: 40,
    marginBottom: 16,
  },
});

export default AddTransaction;
