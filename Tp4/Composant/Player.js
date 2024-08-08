import * as React from 'react';
import { Text, View, StyleSheet, Button , Image} from 'react-native';
import { Audio } from 'expo-av';
import { Pressable } from 'react-native';
import { Asset } from 'expo-asset';
import { useAssets } from 'expo-asset';
import play from "../Image/play.png";
import stop from "../Image/pause.png"
export default function Player(props) {
  const [sound, setSound] = React.useState();
  const[playing,setPlaying] = React.useState('');
  const[img,setImg] = React.useState(play);
  const styles = StyleSheet.create({
    tinyLogo: {
      width: props.width,
      height: props.height,
    }
  });

  async function playSound() {
    if(playing == ''){
        const { sound } = await Audio.Sound.createAsync(props.music)
        
        setSound(sound);
        setPlaying(true);
        setImg(stop)
        await sound.playAsync();
    }
    else if(playing == true){
      setPlaying(false);
      setImg(play)
      await sound.pauseAsync();
    }
    else{
      setPlaying(true);
      setImg(stop)
      await sound.playAsync();
    }
  }
  return (<Pressable onPressIn={playSound}>
    <Image style={styles.tinyLogo} source={img}></Image>
  </Pressable>);
}