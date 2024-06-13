import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

export default function DownloadButton({ items, listName, total, unit }) {

  const generateHTML = () => {
    const itemsHTML = items.map(item => `
      <tr>
        <td style="border: 1px solid #ccc; padding: 8px;">${item.name}</td>
        <td style="border: 1px solid #ccc; padding: 8px;">${item.amount}</td>
      </tr>
    `).join('');

    return `
      <html>
        <body>
          <h1>${listName}</h1>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="border: 1px solid #ccc; padding: 8px;">Nombre</th>
                <th style="border: 1px solid #ccc; padding: 8px;">Precio</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
            </tbody>
            <tfoot>
              <tr>
                <td style="border: 1px solid #ccc; padding: 8px; font-weight: bold;">Total</td>
                <td style="border: 1px solid #ccc; padding: 8px; font-weight: bold;">${total} ${unit}</td>
              </tr>
            </tfoot>
          </table>
        </body>
      </html>
    `;
  };

  const createPDF = async () => {
    const html = generateHTML();
    const { uri } = await Print.printToFileAsync({ html });
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  return (
    <TouchableOpacity style={styles.button} onPress={createPDF}>
      <Ionicons name="share-outline" size={24} color="blue" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
