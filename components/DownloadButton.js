import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default function DownloadButton({ downloadData }) {
  return (
    <View style={styles.buttonContainer}>
      <Button title="Descargar" onPress={downloadData} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 10,
  },
});
