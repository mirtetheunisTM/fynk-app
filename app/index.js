import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import IntroScreen from '../screens/IntroScreen';
import LoginScreen from '../screens/LoginScreen';
import PlaygroundScreen from '../screens/Playground';
import RegisterScreen from '../screens/RegisterScreen';

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
      <Stack.Screen name="Playground" component={PlaygroundScreen} options={{ headerShown: false }} />
      <Stack.Screen name="IntroScreen" component={IntroScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
