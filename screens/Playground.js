/* This screen is meant to be used to test out components, preferably on the web, as this is easier and faster.*/

import { StyleSheet, View } from 'react-native';

import ProgressBar from '../components/ProgressBar';

export default function PlaygroundScreen() {

  return (
    <View style={styles.container}>
      <ProgressBar progress={0.75} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
});
