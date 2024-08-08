import React, { useEffect, useState } from 'react';
import { Text, Image, StyleSheet, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';
import DatabaseManager from '../Composant/DatabaseManager';

const Page4 = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const itemId = route.params?.id;
  const [musicInfo, setMusicInfo] = useState(null);

  useEffect(() => {
    DatabaseManager.fetchItemById(itemId, (item) => {
      setMusicInfo(item);
    });
  }, [itemId]);

  const handleTextUpdate = (field, value) => {
    setMusicInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));

    DatabaseManager.updateItem(itemId, field, value, (rowsAffected) => {
      if (rowsAffected > 0) {
        console.log(`Item updated successfully: ${field} - ${value}`);
      } else {
        console.error(`Failed to update item: ${field} - ${value}`);
      }
    });
  };

  const goBack = () => {
    navigation.goBack();
  };

  if (!musicInfo) {
    return (
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.container}
      >
        <Text style={styles.loadingText}>Chargement...</Text>
      </LinearGradient>
    );
  }

  const { nom, artiste, lienImage, parole } = musicInfo;

  return (
    <LinearGradient
      colors={['#1DB954', '#121212', '#121212', '#121212']}
      style={styles.container}
    >
      <View style={{display: 'flex'}}>
        <TouchableOpacity onPress={goBack}>
          <Image source={require('../Image/arrow.png')} style={styles.arrow}/>
        </TouchableOpacity>
        <Image source={{ uri: lienImage }} style={styles.image} />
      </View>
      <TextInput style={{alignSelf: 'center', color: '#fff', width: 300, fontSize: 12}} multiline={true} onChangeText={(text) => handleTextUpdate('lienImage', text)}>{lienImage}</TextInput>
      <TextInput style={styles.titre} onChangeText={(text) => handleTextUpdate('nom', text)}>{nom}</TextInput>
      <TextInput style={styles.artiste} onChangeText={(text) => handleTextUpdate('artiste', text)}>{artiste}</TextInput>
      <Text style={styles.titre}>Parole</Text>
      <ScrollView style={styles.scrollView}>
        <TextInput style={styles.parole} onChangeText={(text) => handleTextUpdate('parole', text)} multiline={true}>{parole}</TextInput>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
  image: {
    width: 225,
    height: 225,
    marginBottom: 20,
    marginTop: 20,
    alignSelf: 'center'
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
  artiste: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 10,
    marginStart: 20
  },
  titre: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10
  },
  parole: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    marginStart: 20,
    fontStyle: 'italic',
    letterSpacing: 1,
  },
  scrollView:{
    marginBottom: 20
  },
  arrow: {
    width: 30,
    height: 30,
    alignContent:'flex-start',
    margin: 10,
    marginTop: 20
  }
});

export default Page4;
