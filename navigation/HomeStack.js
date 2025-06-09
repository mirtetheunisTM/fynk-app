import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChooseSessionScreen from '../screens/ChooseSessionScreen';
import ChooseTasksScreen from '../screens/ChooseTasksScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="ChooseTasks" component={ChooseTasksScreen} />
      <Stack.Screen name="ChooseSession" component={ChooseSessionScreen} />
    </Stack.Navigator>
  );
}
