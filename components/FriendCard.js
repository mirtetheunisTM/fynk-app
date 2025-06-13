import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';
import ProgressBar from './ProgressBar';

export default function FriendCard({ profileImage, friendName, level, streak, progress }) {
  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image source={profileImage} style={styles.avatar} />

      {/* Name + Level */}
      <View style={styles.textSection}>
        <Text style={[theme.fonts.body, styles.name]}>{friendName}</Text>
        <Text style={theme.fonts.caption}>{level}</Text>
        <ProgressBar progress={progress} style={{ height: 12 }}/>
      </View>

      {/* Time Ago + Like */}
      <View style={styles.sideSection}>
        <Text style={[theme.fonts.caption, { fontWeight: 'bold' }]}>{streak}</Text>
        <Ionicons name="flame" size={16} color={theme.colors.primaryPurple} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.colors.creme,
    borderRadius: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 30,
    marginRight: 12,
  },
  textSection: {
    flex: 1,
    gap: 8,
    justifyContent: 'center',
  },
  name: {
    fontWeight: 'bold',
  },
  sideSection: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});
