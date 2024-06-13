import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Alert, ScrollView, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AddItemButton from '../components/AddItemButton';
import DeleteAllButton from '../components/DeleteAllButton';
import DownloadButton from '../components/DownloadButton';
import FileInputButton from '../components/FileInputButton';
import ItemList from '../components/ItemList';

export default function ListScreen({ route, navigation }) {
  const { listId } = route.params;
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [listName, setListName] = useState('');
  const [unit, setUnit] = useState('€');

  useEffect(() => {
    if (listId) {
      const loadList = async () => {
        const savedLists = await AsyncStorage.getItem('lists');
        if (savedLists) {
          const lists = JSON.parse(savedLists);
          const list = lists.find(l => l.id === listId);
          if (list) {
            setItems(list.items);
            setTotal(list.total);
            setListName(list.name);
            setUnit(list.unit || '€');
          }
        }
      };
      loadList();
    }
  }, [listId]);

  const saveList = async () => {
    const savedLists = await AsyncStorage.getItem('lists');
    let lists = savedLists ? JSON.parse(savedLists) : [];
    if (listId) {
      lists = lists.map(list => list.id === listId ? { id: listId, name: listName, items, total, unit } : list);
    } else {
      const newList = { id: Date.now(), name: listName, items, total, unit };
      lists.push(newList);
    }
    await AsyncStorage.setItem('lists', JSON.stringify(lists));
    Alert.alert('Lista guardada');
    navigation.goBack();
  };

  const addItem = (item) => {
    const newItem = { ...item, id: Date.now().toString() };
    setItems([...items, newItem]);
    setTotal(total + parseFloat(item.amount));
  };

  const updateItem = (updatedItem) => {
    const newItems = items.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(newItems);
    calculateTotal(newItems);
  };

  const deleteItem = (itemId) => {
    const newItems = items.filter(item => item.id !== itemId);
    setItems(newItems);
    calculateTotal(newItems);
  };

  const calculateTotal = (items) => {
    const newTotal = items.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0);
    setTotal(newTotal);
  };

  const deleteAllItems = () => {
    setItems([]);
    setTotal(0);
  };

  const downloadData = () => {
    Alert.alert('Función no disponible en Snack');
  };

  const uploadData = () => {
    Alert.alert('Función no disponible en Snack');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          placeholder="Nombre de la lista"
          value={listName}
          onChangeText={setListName}
        />
        <Button title="Guardar Lista" onPress={saveList} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalAmount}>{total}</Text>
          <TextInput
            style={styles.unitInput}
            placeholder="Unidad"
            value={unit}
            onChangeText={setUnit}
            maxLength={5}
          />
        </View>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <ItemList 
              item={item}
              onUpdateItem={updateItem}
              onDeleteItem={deleteItem}
              unit={unit}
            />
          )}
          keyExtractor={(item) => item.id}
        />
        <AddItemButton addItem={addItem} />
      </ScrollView>
      <View style={styles.buttonRow}>
        <DeleteAllButton deleteAllItems={deleteAllItems} />
        <DownloadButton items={items} listName={listName} total={total} unit={unit} />
        <FileInputButton uploadData={uploadData} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100, // To ensure the content is above the fixed button row
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  unitInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: 80,
    textAlign: 'center',
  },
  totalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  totalText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f8f8f8',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
});




