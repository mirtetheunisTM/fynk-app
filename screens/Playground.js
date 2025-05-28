/* This screen is meant to be used to test out components, preferably on the web, as this is easier and faster.*/

import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FormInput from '../components/FormInput';

export default function PlaygroundScreen() {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <FormInput
        placeholder="Name"
        value={name}
        onChangeText={setName} />
      
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
