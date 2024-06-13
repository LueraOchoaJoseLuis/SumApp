import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DeleteAllButton({ deleteAllItems }) {
  return (
    <TouchableOpacity onPress={deleteAllItems} style={styles.button}>
      <Ionicons name="trash-outline" size={24} color="red" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
});
