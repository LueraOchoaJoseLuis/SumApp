import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function AddItemButton({ addItem }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleAdd = () => {
    addItem({ name, amount });
    setName('');
    setAmount('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Número"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Button title="Añadir ítem" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
  },
});
