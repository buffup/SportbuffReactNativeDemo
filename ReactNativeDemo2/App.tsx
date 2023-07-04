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
import { VIDEO_URL } from './config';
type Orientation = 'portrait' | 'landscape';
const ORIENTATION_PORTRAIT: Orientation = 'portrait';
const ORIENTATION_LANDSCAPE: Orientation = 'landscape';
const VIDEO_PORTRAIT_HEIGHT = 300;


function App(): JSX.Element {
  
  const videoPlayer = useRef<Video>();
  const { width, height } = Dimensions.get('window');
  const [isResumed, setIsResumed] = useState(false);
  const [videoWidth, setVideoWidth] = useState(Dimensions.get('window').width);
  const [videoHeight, setVideoHeight] = useState(Dimensions.get('window').height);
  const [orientation, setOrientation] = useState<Orientation>(
    height > width ?  ORIENTATION_PORTRAIT : ORIENTATION_LANDSCAPE
  );

  const handleVideoResume = () => {
    setIsResumed(true);
    setTimeout(() => {
      setIsResumed(false);
    }, 1000);
  };


  useEffect(() => {
    NativeModules.SportBuffWrapper.initializeSportBuff();
    const handleOrientationChange = () => {
      const { width, height } = Dimensions.get('window');
      const newOrientation: Orientation = height > width ? ORIENTATION_PORTRAIT : ORIENTATION_LANDSCAPE;

      setOrientation(newOrientation);
      setVideoWidth(width);
      setVideoHeight(newOrientation === ORIENTATION_PORTRAIT ? VIDEO_PORTRAIT_HEIGHT : height);
    };
    Dimensions.addEventListener('change', handleOrientationChange);
  }, []);
  
  return (
    <View style={styles.container}>
    <Video
  ref={videoPlayer}
  source={{ uri: VIDEO_URL }}
  style={[styles.video, { width: videoWidth, height: videoHeight }]}
    resizeMode={orientation === ORIENTATION_PORTRAIT  ? 'contain': 'cover'}
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
    position: 'absolute',
    top: 0,
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

