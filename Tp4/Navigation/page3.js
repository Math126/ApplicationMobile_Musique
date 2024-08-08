import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Button, FlatList, Text, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import DatabaseManager from '../Composant/DatabaseManager';
import { useNavigation } from '@react-navigation/native';
import Navigation from '../Composant/BarraNavigation';

const Page3 = () => {
    const navigation = useNavigation();

  const [nom, setNom] = useState('');
  const [artiste, setArtiste] = useState('');
  const [lienImage, setLienImage] = useState('');
  const [parole, setParole] = useState('');
  const [musiques, setMusiques] = useState([]);

  useEffect(() => {
    DatabaseManager.createTable();
    fetchMusiques();
  }, []);

  const fetchMusiques = () => {
    DatabaseManager.fetchAllItems((items) => {
      setMusiques(items);
    });
  };

  const handleAjouter = () => {
    DatabaseManager.insertItem(nom, artiste, lienImage, parole, () => {
      fetchMusiques();
      // Réinitialiser les champs du formulaire après l'ajout
      setNom('');
      setArtiste('');
      setLienImage('');
      setParole('');
    });
  };

  const handleSupprimer = (id) => {
    DatabaseManager.deleteItem(id, () => {
      fetchMusiques();
    });
  };

  const handleDetail = (screenName, itemId) => {
    navigation.navigate(screenName, {id: itemId });
  };

  const renderItem = ({ item }) => (
    <View style={[styles.item, { justifyContent: 'space-between' }]}>
      <Image source={{ uri: item.lienImage }} style={{ width: 60, height: 60, marginRight: 8 }} />
      <Text style={styles.itemText}>{item.nom}</Text>
      <View style={{ flexDirection: 'row' }}>
        <Button
          title="Detail"
          onPress={() => handleDetail('Page4', item.id)}
          style={{ paddingEnd: 0, marginStart: 8 }}
        />
        <Button
          title="Supprimer"
          onPress={() => handleSupprimer(item.id)}
          style={{ paddingEnd: 0 }}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setNom(text)}
        value={nom}
        placeholder="Nom de la musique"
        placeholderTextColor="#888"
      />
      <Text style={styles.label}>Artiste:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setArtiste(text)}
        value={artiste}
        placeholder="Nom de l'artiste"
        placeholderTextColor="#888"
      />
      <Text style={styles.label}>Lien Image:</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setLienImage(text)}
          value={lienImage}
          placeholder="URL de l'image"
          placeholderTextColor="#888"
        />
      </View>
      {lienImage ? <Image source={{ uri: lienImage }} style={{ width: 100, height: 100 }} /> : null}
      <Text style={styles.label}>Parole:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setParole(text)}
        value={parole}
        placeholder="Parole"
        placeholderTextColor="#888"
      />
      <Button title="Ajouter" onPress={handleAjouter} />
      <FlatList
        data={musiques}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#282828', // Spotify's background color
    color: '#fff', // Text color
  },
  label: {
    color: '#1DB954', // Spotify's green color
    fontSize: 16,
    marginBottom: 4,
  },
  input: {
    height: 40,
    borderColor: '#1DB954',
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    color: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#212121', // Spotify's dark background color
    padding: 10,
    borderRadius: 8,
  },
  itemText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Page3;