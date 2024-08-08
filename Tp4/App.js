import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Page2 from "./Navigation/page2";
import Page3 from "./Navigation/page3";
import Page4 from "./Navigation/page4";
import Main from "./Navigation/main";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }}/>
        <Stack.Screen name="Page2" component={Page2} options={{ headerShown: false }}/>
        <Stack.Screen name="Page3" component={Page3} options={{ headerShown: false }}/>
        <Stack.Screen name="Page4" component={Page4} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
