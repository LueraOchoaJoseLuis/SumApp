import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';

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

  const handleDeleteList = async (listId) => {
    const filteredLists = lists.filter(list => list.id !== listId);
    setLists(filteredLists);
    await AsyncStorage.setItem('lists', JSON.stringify(filteredLists));
    Alert.alert('Lista eliminada');
  };

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={handleCreateList} style={styles.createButton}>
        Crear Nueva Lista
      </Button>
      <FlatList
        data={lists}
        renderItem={({ item }) => (
          <View style={styles.listItemContainer}>
            <TouchableOpacity onPress={() => handleSelectList(item.id)} style={styles.listItem}>
              <Text style={styles.listItemText}>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteList(item.id)} style={styles.deleteButton}>
              <Ionicons name="trash-bin" size={24} color="red" />
            </TouchableOpacity>
          </View>
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
  createButton: {
    marginBottom: 20,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  listItem: {
    flex: 1,
  },
  listItemText: {
    fontSize: 18,
  },
  deleteButton: {
    marginLeft: 10,
  },
});


