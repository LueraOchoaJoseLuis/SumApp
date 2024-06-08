import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Button, AsyncStorage, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const loadLists = async () => {
      const savedLists = await AsyncStorage.getItem('lists');
      if (savedLists) {
        setLists(JSON.parse(savedLists));
      }
    };
    loadLists();
  }, []);

  const handleCreateList = () => {
    navigation.navigate('ListScreen', { listId: null });
  };

  const handleSelectList = (listId) => {
    navigation.navigate('ListScreen', { listId });
  };

  return (
    <View style={styles.container}>
      <Button title="Crear Nueva Lista" onPress={handleCreateList} />
      <FlatList
        data={lists}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectList(item.id)}>
            <Text style={styles.listItem}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listItem: {
    padding: 15,
    fontSize: 18,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

