import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ListScreen from './screens/ListScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Mis Listas' }} />
        <Stack.Screen name="ListScreen" component={ListScreen} options={{ title: 'Lista' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

