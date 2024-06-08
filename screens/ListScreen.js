import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Button, TextInput, AsyncStorage } from 'react-native';
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
      lists = lists.map(list => list.id === listId ? { id: listId, name: listName, items, total } : list);
    } else {
      const newList = { id: Date.now(), name: listName, items, total };
      lists.push(newList);
    }
    await AsyncStorage.setItem('lists', JSON.stringify(lists));
    navigation.goBack();
  };

  const addItem = (item) => {
    setItems([...items, item]);
    setTotal(total + parseFloat(item.amount));
  };

  const deleteAllItems = () => {
    setItems([]);
    setTotal(0);
  };

  const downloadData = () => {
    return { name: listName, items, total };
  };

  const uploadData = (data) => {
    const parsedData = JSON.parse(data);
    setItems(parsedData.items);
    setTotal(parsedData.total);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre de la lista"
        value={listName}
        onChangeText={setListName}
      />
      <Text style={styles.totalText}>Total: {total} €</Text>
      <FlatList
        data={items}
        renderItem={({ item }) => <ItemList item={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
      <AddItemButton addItem={addItem} />
      <DeleteAllButton deleteAllItems={deleteAllItems} />
      <DownloadButton downloadData={downloadData} />
      <FileInputButton uploadData={uploadData} />
      <Button title="Guardar Lista" onPress={saveList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  totalText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});

