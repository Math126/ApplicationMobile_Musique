import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import Navigation from '../Composant/BarraNavigation';

const Page2 = () => {
  const [data, setData] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(false);

  const fetchData = () => {
    fetch('http://10.228.3.16:5000/artiste')
      .then((response) => response.json())
      .then((responseData) => {
        const stringData = Array.isArray(responseData) ? responseData.join(', ') : String(responseData);
        setData(stringData);
        setButtonPressed(true);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données : ', error);
      });
  };

  const renderCard = (item) => {
    const itemWithSpaces = item.replace(/_/g, ' '); // Replace underscores with spaces
    return (
      <TouchableOpacity style={styles.card} key={item}>
        <Text style={styles.Text}>{itemWithSpaces}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Artiste</Text>
      {!buttonPressed && <Button title="Récupérer des données" onPress={fetchData} />}
      {buttonPressed && data !== null && (
        <FlatList
          data={data.split(',')}
          renderItem={({ item }) => renderCard(item)}
          keyExtractor={(item) => item.toString()}
        />
      )}
      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  titre: {
    color: '#1DB954',
    fontWeight: 'bold',
    fontSize: 30,
  },

  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  Text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15,
  },

  ScrollContent: {
    marginBottom: 55
  }
});

export default Page2;
