import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Navigation() {
  const navigation = useNavigation();

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigateToScreen('Main')}
        >
          <Text style={styles.text}>Accueil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigateToScreen('Page2')}
        >
          <Text style={styles.text}>Bibliothèque</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => navigateToScreen('Page3')}
        >
          <Text style={styles.text}>Vos Chansons</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingVertical: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14, 
  },
});
