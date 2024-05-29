import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import AddItemButton from '../components/AddItemButton';
import DeleteAllButton from '../components/DeleteAllButton';
import DownloadButton from '../components/DownloadButton';
import FileInputButton from '../components/FileInputButton';
import ItemList from '../components/ItemList';

export default function HomeScreen() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const addItem = (item) => {
    setItems([...items, item]);
    setTotal(total + parseFloat(item.amount));
  };

  const deleteAllItems = () => {
    setItems([]);
    setTotal(0);
  };

  const downloadData = () => {
    const data = JSON.stringify({ items, total }, null, 2);
    // Lógica para descargar el archivo JSON
  };

  const uploadData = (data) => {
    const parsedData = JSON.parse(data);
    setItems(parsedData.items);
    setTotal(parsedData.total);
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  totalText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
});
