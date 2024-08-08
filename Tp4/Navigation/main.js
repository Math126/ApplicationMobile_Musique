import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import DatabaseManager from '../Composant/DatabaseManager';
import AllMusic from '../Composant/allMusic';
import Navigation from '../Composant/BarraNavigation';

const Main = () => {
  DatabaseManager.createTable();
  return (
    <View style={styles.container}>
      <ScrollView style={styles.ScrollContent}>
        {/* Your main content goes here */}
        <AllMusic />
      </ScrollView>

      {/* Navigation bar at the bottom */}
      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    position: 'relative',
  },

  Text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  ScrollContent: {
    marginBottom: 55,
    marginTop: 20
  }
});

export default Main;
