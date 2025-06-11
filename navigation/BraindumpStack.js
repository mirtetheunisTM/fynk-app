import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddTaskScreen from '../screens/AddTaskScreen';
import BraindumpScreen from '../screens/BraindumpScreen';

const Stack = createNativeStackNavigator();

export default function BraindumpStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BraindumpMain" component={BraindumpScreen} />
      <Stack.Screen name="AddTask" component={AddTaskScreen} />
    </Stack.Navigator>
  );
}