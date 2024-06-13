import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ItemList({ item, onUpdateItem, onDeleteItem, unit }) {
  const handleNameChange = (newName) => {
    onUpdateItem({ ...item, name: newName });
  };

  const handleAmountChange = (newAmount) => {
    onUpdateItem({ ...item, amount: newAmount });
  };

  const handleDelete = () => {
    onDeleteItem(item.id);
  };

  return (
    <View style={styles.itemContainer}>
      <TextInput
        style={styles.input}
        value={item.name}
        onChangeText={handleNameChange}
      />
      <TextInput
        style={styles.input}
        value={item.amount}
        onChangeText={handleAmountChange}
        keyboardType="numeric"
      />
      <Text>{unit}</Text>
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    flex: 1,
    padding: 10,
  },
  deleteButton: {
    padding: 10,
  },
});

 


