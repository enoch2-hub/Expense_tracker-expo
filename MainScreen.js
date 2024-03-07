// MainScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Platform } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import { LinearGradient } from 'expo-linear-gradient';

import { AntDesign } from '@expo/vector-icons';

const MainScreen = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const storedTransactions = await AsyncStorage.getItem('transactions');
      if (storedTransactions) {
        setTransactions(JSON.parse(storedTransactions));
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    // Fetch transactions on component mount and when the screen is focused
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTransactions();
    });

    return unsubscribe;
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
        fetchTransactions();
    },[])
  )

  const calculateTotal = (type) => {
    const filteredTransactions = transactions.filter(
      (transaction) => transaction.type === type
    );

    return filteredTransactions.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );
  };

  const deleteTransaction = async (id) => {
    try {
      const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
      await AsyncStorage.setItem('transactions', JSON.stringify(updatedTransactions));
      setTransactions(updatedTransactions);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };


  return (
    <LinearGradient
    colors={['#99b9ff', '#ffddf9']}
    style={styles.container}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
  >
    <View style={styles.container}>
      <Text style={styles.heading}>Finance Tracker</Text>



      <View style={styles.tableContainer}>
        {/* Income column */}
        <View style={styles.column}>
          <Text style={styles.columnHeader}>Income</Text>
          <Text style={styles.totalIncome}>${calculateTotal('income').toFixed(2)}</Text>
        </View>

        {/* Expenses column */}
        <View style={styles.column}>
          <Text style={styles.columnHeader}>Expenses</Text>
          <Text style={styles.totalExpenses}>${calculateTotal('expense').toFixed(2)}</Text>
        </View>
      </View>
    
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <View style={styles.transactionItem}>
            <View>
              <Text style={{color: '#8aafff'}}>{item.description}</Text>
              <Text style={{color: item.type === 'income' ? '#7dffe3' : '#ff1d1d'}} >${item.amount.toFixed(2)}</Text>
              <Text style={{color: '#fff'}}>Type: {item.type}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteTransaction(item.id)}>
              <Text style={styles.deleteButton}>
                <AntDesign name="delete" size={24} color="black" />
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Button
        title="Add Transaction"
        style={styles.btn}
        onPress={() => navigation.navigate('AddExpense')}
      />
      {/* <Button
        title="Add Income"
        onPress={() => navigation.navigate('AddIncome')}
      /> */}
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    // backgroundColor: '#cee8ff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  btn:{
    backgroundColor: 'red',
    marginBottom: 20
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#00000073',
    // ...Platform.select({
    //   ios: {
    //     shadowColor: '#750052',
    //     shadowOffset: { width: 0, height: 2 },
    //     shadowOpacity: 0.1,
    //     shadowRadius: 4,
    //   },
    //   android: {
    //     shadowColor: '#750052',
    //     elevation: 1,
    //   },
    // }),
  },
  deleteButton: {
    color: 'white',
    fontSize: 12,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 4,
},






tableContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 16,
},
column: {
  flex: 1,
  alignItems: 'center',
  padding: 16,
  borderRadius: 8,
  backgroundColor: '#00000027',
  ...Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    android: {
      elevation: 5,
    },
  }),
},
columnHeader: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 8,
  color: '#fff',
},
totalIncome: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#00cc00', // Greenish color for income
  marginTop: 8,
},
totalExpenses: {
  fontSize: 18,
  fontWeight: 'bold',
  color: 'red', // Reddish color for expenses
  marginTop: 8,
},






});

export default MainScreen;
