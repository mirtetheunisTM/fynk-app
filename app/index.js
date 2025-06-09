import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MainTabs from '../mainTabs';
import ChooseSessionScreen from '../screens/ChooseSessionScreen';
import ChooseTasksScreen from '../screens/ChooseTasksScreen';
import HomeScreen from '../screens/HomeScreen';
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
    <Stack.Navigator initialRouteName="IntroScreen">
      <Stack.Screen name="Playground" component={PlaygroundScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ChooseSession" component={ChooseSessionScreen} options={{ headerShown: false }} />
      <Stack.Screen name="IntroScreen" component={IntroScreen} options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ChooseTasks" component={ChooseTasksScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
