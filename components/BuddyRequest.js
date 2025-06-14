import { Feather, Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../theme';
import PrimaryButton from './PrimaryButton';
import ProgressBar from './ProgressBar';

export default function BuddyRequest({user}) {
    const onClose = () => {
      console.log('Close button pressed'); // With backend: deny friend request
    };

    return (
        <View style={styles.container}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={24} color="#999" />
          </TouchableOpacity>

          {/* Avatar */}
          <Image source={user.profileImage} style={styles.avatar} />

          {/* Name */}
          <Text style={[theme.fonts.h3, { marginTop: 8 }]}>{user.friendName}</Text>

          {/* Followers */}
          <Text style={theme.fonts.caption}>
            🧠🧠🧠 buddies with <Text style={styles.bold}>David</Text> and{' '}
            <Text style={styles.bold}>2 others</Text>
          </Text>

          {/* XP Section */}
          <View style={styles.row}>
            <Text style={[theme.fonts.caption, { fontWeight: 'bold' }]}>{user.level}</Text>
            <ProgressBar progress={user.progress} style={{ width: 200 }}/>
            <View style={styles.xpContainer}>
              <Text style={[theme.fonts.caption, styles.xpText]}>
                {user.streak}
              </Text>
              <Ionicons name="flame" size={16} color={theme.colors.primaryPurple} style={{ marginLeft: -4 }}/>
            </View>
          </View>

          {/* Primary Button */}
          <PrimaryButton title="Accept request" onPress={() => {}} />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: theme.colors.creme,
      paddingVertical: 24,
      paddingHorizontal: 16,
      borderRadius: 16,
      alignItems: 'center',
      position: 'relative',
    },
    closeButton: {
      position: 'absolute',
      top: 16,
      right: 16,
    },
    avatar: {
      width: 70,
      height: 70,
      borderRadius: 40,
      borderWidth: 3,
      borderColor: theme.colors.lila,
    },
    followers: {
      marginTop: 4,
      fontSize: 14,
      color: '#444',
      textAlign: 'center',
    },
    bold: {
      fontWeight: 'bold',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 24,
      marginBottom: 24,
      width: '100%',
      justifyContent: 'space-between',
    },
    xpText: {
      minWidth: 28,
      textAlign: 'right',
      fontWeight: 'bold',
    },
    xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});