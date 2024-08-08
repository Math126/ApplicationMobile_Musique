import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Image } from 'react-native-elements';
import Player from './Player';
import GetInfoMusic from './GetInfoMusic';

const MusicCard = (music,name) => {
  var Titre = name[music-11]
  var MusicTitle2 = Titre.split("/")[1].split(".mp4")[0]
  MusicTitle = MusicTitle2.replaceAll("_"," ")
  var ed = GetInfoMusic(MusicTitle2).then(function(result){
    try{
        rep = result[0][1]
        console.log(rep)
      }catch{
        console.log("no data")
      }
  }) 
  return (
    <Card containerStyle={styles.cardContainer} key={music}>
      <View style={styles.cardContent}>
        <Player width={20} height={20} music={music}></Player>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{MusicTitle}</Text>
          <Image
            source={require('../Image/Heart.png')}
            style={styles.logo}
          />
          {/* Additional text or other content can be added here */}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    margin: 0, // Removes default margin
    padding: 0, // Removes default padding
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 10, // Adjust the margin as needed
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    width: 20, 
    height: 20, 
    padding: 5
  },
});

export default MusicCard;
