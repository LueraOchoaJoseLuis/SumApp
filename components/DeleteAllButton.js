import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default function DeleteAllButton({ deleteAllItems }) {
  return (
    <View style={styles.buttonContainer}>
      <Button title="Borrar Todo" onPress={deleteAllItems} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 10,
  },
});
