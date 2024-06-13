import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FileInputButton({ uploadData }) {
  return (
    <TouchableOpacity onPress={uploadData} style={styles.button}>
      <Ionicons name="cloud-upload-outline" size={24} color="purple" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
});


