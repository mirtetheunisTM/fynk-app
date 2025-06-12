import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTaskScreen from '../screens/AddTaskScreen';
import ChooseSessionScreen from '../screens/ChooseSessionScreen';
import ChooseTasksScreen from '../screens/ChooseTasksScreen';
import FocusSessionScreen from '../screens/FocusSessionScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="ChooseTasks" component={ChooseTasksScreen} />
      <Stack.Screen name="ChooseSession" component={ChooseSessionScreen} />
      <Stack.Screen name="AddTask" component={AddTaskScreen} />
      <Stack.Screen name="FocusSession" component={FocusSessionScreen} />
    </Stack.Navigator>
  );
}
