// MainTabs.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import theme from './theme';

import HomeStackNavigator from './navigation/HomeStack';
import BraindumpScreen from './screens/BraindumpScreen';
import FriendsScreen from './screens/FriendsScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShopScreen from './screens/ShopScreen';

// Import your custom SVG icons
import BraindumpIcon from './assets/icons/BraindumpIcon';
import FriendsIcon from './assets/icons/FriendsIcon';
import HomeIcon from './assets/icons/HomeIcon';
import ProfileIcon from './assets/icons/ProfileIcon';
import ShopIcon from './assets/icons/ShopIcon';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const color = focused ? theme.colors.darkBlue : theme.colors.lightPurple;

          switch (route.name) {
            case 'Home':
              return <HomeIcon color={color} />;
            case 'Braindump':
              return <BraindumpIcon color={color} />;
            case 'Friends':
              return <FriendsIcon color={color} />;
            case 'Shop':
              return <ShopIcon color={color} />;
            case 'Profile':
              return <ProfileIcon color={color} />;
            default:
              return <View />;
          }
        },
        tabBarActiveTintColor: theme.colors.darkBlue,
        tabBarInactiveTintColor: theme.colors.lightPurple,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: theme.colors.neutral, paddingHorizontal: 20, paddingTop: 8 },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Braindump" component={BraindumpScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
