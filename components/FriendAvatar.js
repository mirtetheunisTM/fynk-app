import { Image, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';

export default function FriendAvatar({ image, name, active }) {
  return (
    <View style={styles.container}>
      <View style={[styles.avatarWrapper, active && styles.activeOutline]}>
        <View style={styles.avatarInner}>
          <Image source={image} style={[styles.avatar, !active && styles.inactive]} />
        </View>
      </View>
      <Text style={[theme.fonts.caption, styles.name]}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  avatarWrapper: {
    width: 85,
    height: 85,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInner: {
    width: 72,
    height: 72,
    borderRadius: 60,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  inactive: {
    opacity: 0.5,
  },
  activeOutline: {
    borderWidth: 3,
    borderColor: theme.colors.primaryPurple,
  },
  name: {
    marginTop: 6,
    color: theme.colors.primaryPurple,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
