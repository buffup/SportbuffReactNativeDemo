/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { NativeModules, Dimensions } from 'react-native';
 
import Video from 'react-native-video';



function App(): JSX.Element {
  
  const videoPlayer = useRef<Video>();
  const { width, height } = Dimensions.get('window');
  const [isResumed, setIsResumed] = useState(false);

  const handleVideoResume = () => {
    setIsResumed(true);
    setTimeout(() => {
      setIsResumed(false);
    }, 1000);
  };


  useEffect(() => {
    NativeModules.SportBuffWrapper.initializeSportBuff();
  }, []);
  
  return (
    <View style={styles.container}>
    <Video
  ref={() => videoPlayer}
  source={{ uri: 'https://buffup-public.s3.eu-west-2.amazonaws.com/video/FIFA+VOD.mp4' }}
  style={styles.video}
    resizeMode="cover"
    onTouchEnd={handleVideoResume}
  controls={true} />

{isResumed && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}> screen can receive events</Text>
        </View>
      )}
  
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.red,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    color: 'white',
  },
});

export default App;

