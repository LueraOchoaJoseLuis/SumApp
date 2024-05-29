import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

export default function FileInputButton({ uploadData }) {
  const handleFilePick = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      const fileContent = await fetch(result.uri).then((res) => res.text());
      uploadData(fileContent);
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <Button title="Seleccionar archivo" onPress={handleFilePick} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 10,
  },
});
