// MainScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const MainScreen = ({ navigation }) => {
  const [expenses, setExpenses] = useState([]);

  
  const fetchExpenses = async () => {
    try {
      // Retrieve expenses from AsyncStorage
      const storedExpenses = await AsyncStorage.getItem('expenses');
      if (storedExpenses) {
        setExpenses(JSON.parse(storedExpenses));
      }
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };


  useEffect(() => {
    // Fetch expenses from AsyncStorage when the component mounts
    fetchExpenses();
  }, []);


  useFocusEffect(
    React.useCallback(() => {
      fetchExpenses();
    },[])
  )


  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Expense Tracker</Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text>{item.description}</Text>
            <Text>${item.amount.toFixed(2)}</Text>
          </View>
        )}
      />

      <Button
        title="Add Expense"
        onPress={() => navigation.navigate('AddExpense')}
      />
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
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});

export default MainScreen;
