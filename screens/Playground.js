import { StyleSheet, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';

export default function PlaygroundScreen() {
  return (
    <View style={styles.container}>
      <PrimaryButton title="Login" onPress={() => alert('Clicked!')} />
      <SecondaryButton title="Register with Apple" onPress={() => alert('Clicked!')} />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
});
