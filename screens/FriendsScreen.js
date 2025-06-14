import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NotificationIcon from '../assets/icons/NotificationIcon';
import FriendAvatar from '../components/FriendAvatar';
import SearchBar from '../components/SearchBar';
import SessionCard from '../components/SessionCard';
import theme from "../theme";

const friends = [
    { id: '1', name: 'Robbe', image: require('../assets/images/Robbe.jpg'), active: true },
    { id: '2', name: 'Sam', image: require('../assets/images/Sam.jpg'), active: false },
    { id: '3', name: 'Ella', image: require('../assets/images/Ella.jpg'), active: true },
    { id: '4', name: 'Laura', image: require('../assets/images/Laura.jpg'), active: false },
    { id: '5', name: 'Elsa', image: require('../assets/images/Laura.jpg'), active: false },
];

// Sort friends: active ones first
const sortedFriends = [...friends].sort((a, b) => {
  return b.active - a.active; 
});

export default function FriendsScreen() {
    const navigation = useNavigation();

       return (
        <View style={styles.container}>
            {/* Background gradient */}
            <LinearGradient
                colors={['rgba(252,252,252,0)', '#FCFCFC', '#C4CFFF', '#9C80FF']}
                locations={[0, 0.6, 0.9, 1]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.gradientBackground}
            />
            {/* Header Section */}
            <View style={styles.headerSection}>
                <View style={styles.headerRow}>
                    <Text style={[theme.fonts.h1, { marginRight: 'auto'}]}>Studdybuddies</Text>
                    <TouchableOpacity onPress={() => {navigation.navigate('NotificationScreen')}}>
                        <NotificationIcon />
                    </TouchableOpacity>
                </View>
                <SearchBar />
            </View>

            {/* Now focussing */}
            <View style={styles.focusSection}>
                <View style={styles.headerRow}>
                    <Text style={[theme.fonts.h3, { marginRight: 'auto'}]}>Now focussing</Text>
                    <TouchableOpacity onPress={() => {navigation.navigate('AllFriendsScreen')}}>
                        <Text style={[theme.fonts.caption, { fontWeight: 'bold'}]}>More</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.friendsRow}>
                        {sortedFriends.map(friend => (
                        <FriendAvatar
                            key={friend.id}
                            image={friend.image}
                            name={friend.name}
                            active={friend.active}
                        />
                        ))}
                    </View>
                </ScrollView>
            </View>

            {/* Sessions */}
            <View style={styles.sessionsSection}>
                <SessionCard
                    profileImage={require('../assets/images/Ella.jpg')}
                    friendName="Ella"
                    sessionDescription="Completed a Beast Mode session"
                    timeAgo="Just now"
                />

                <SessionCard
                    profileImage={require('../assets/images/Robbe.jpg')}
                    friendName="Robbe"
                    sessionDescription="Completed a 90 minute Monkmode Session"
                    timeAgo="3h ago"
                />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    gradientBackground: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.2,
        zIndex: 0,
      },
    container: {
        flex: 1,
        backgroundColor: theme.colors.neutral,
        position: 'relative', 
        paddingTop: 60,
        paddingHorizontal: 16,
      },
      headerSection: {
        alignItems: 'center',
        marginBottom: 16,
      },
      headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        marginBottom: 16,
      },
      focusSection: {
        alignItems: 'left',
        marginBottom: 24,
      },
      friendsRow: {
        flexDirection: 'row',
        gap: 16,
      },
});