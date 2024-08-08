import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

export default function Player2({ soundUri }) {
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const loadSound = async () => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(soundUri);

        if (!fileInfo.exists) {
          console.error('File does not exist:', soundUri);
          return;
        }

        const { sound } = await Audio.Sound.createAsync({ uri: soundUri });
        setSound(sound);
      } catch (error) {
        console.error('Error loading sound:', error);
      }
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [soundUri]);

  const togglePlay = async () => {
    try {
      if (sound) {
        if (isPlaying) {
          await sound.pauseAsync();
        } else {
          await sound.playAsync();
        }

        setIsPlaying(!isPlaying);
      }
    } catch (error) {
      console.error('Error toggling play:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title={isPlaying ? 'Pause' : 'Play'} onPress={togglePlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
