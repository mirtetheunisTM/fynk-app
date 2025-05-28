/* This screen is meant to be used to test out components, preferably on the web, as this is easier and faster.*/

import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FormInput from '../components/FormInput';
import Toggle from '../components/Toggle';

export default function PlaygroundScreen() {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <FormInput
        placeholder="Password"
        value={name}
        onChangeText={setName}
        isPassword={true} />

      <Toggle />
      
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
