import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import PlaygroundScreen from '../screens/Playground';

// Prevent auto hiding of splash until fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Cabin: require('../assets/fonts/Cabin-VariableFont.ttf'),
    Inter: require('../assets/fonts/Inter-VariableFont.ttf'),
  });

  if (!fontsLoaded) return null;

  SplashScreen.hideAsync();
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Playground">
      <Stack.Screen name="Playground" component={PlaygroundScreen} />
    </Stack.Navigator>
  );
}
