import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllFriendsScreen from '../screens/AllFriendsScreen';
import FriendsScreen from '../screens/FriendsScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Stack = createNativeStackNavigator();

export default function FriendsStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="FriendsMain" component={FriendsScreen} />
      <Stack.Screen name="AllFriendsScreen" component={AllFriendsScreen} />
      <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
    </Stack.Navigator>
  );
}
