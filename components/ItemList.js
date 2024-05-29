import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ItemList({ item }) {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemText}>{item.amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 18,
  },
});
