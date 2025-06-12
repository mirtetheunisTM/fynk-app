import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import MainTabs from '../mainTabs';
import AddTaskScreen from '../screens/AddTaskScreen';
import HomeScreen from '../screens/HomeScreen';
import IntroScreen from '../screens/IntroScreen';
import LoginScreen from '../screens/LoginScreen';
import PlaygroundScreen from '../screens/Playground';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SessionCompletedScreen from '../screens/SessionCompletedScreen';

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
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen name="Playground" component={PlaygroundScreen} options={{ headerShown: false }} />
        <Stack.Screen name="IntroScreen" component={IntroScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SessionCompleted" component={SessionCompletedScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
  );
}
