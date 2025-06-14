import { Image, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';

export default function CheerNotification({ profileImage, friendName, sessionDescription, timeAgo }) {
  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image source={profileImage} style={styles.avatar} />

      {/* Name + Session Description */}
      <View style={styles.textSection}>
        <Text style={[theme.fonts.body, styles.name]}>{friendName}</Text>
        <Text style={[theme.fonts.caption, styles.description]}>{sessionDescription}</Text>
      </View>

      {/* Time Ago + Like */}
      <View style={styles.sideSection}>
        <Text style={[theme.fonts.caption, { fontWeight: 'bold' }]}>{timeAgo}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
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
  description: {
    flexWrap: 'wrap',
    marginRight: 8,
  },
  sideSection: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignSelf: 'center',
  },
});
