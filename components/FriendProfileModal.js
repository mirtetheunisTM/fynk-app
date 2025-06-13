import { Feather } from '@expo/vector-icons';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../theme';
import PrimaryButton from './PrimaryButton';
import ProgressBar from './ProgressBar';

export default function FriendProfileModal({
  visible,
  onClose,
  user,
  onSendRequest,
  friendshipStatus, // 'none', 'pending', 'friends'
}) {
  if (!user) return null;

  // Button config based on friendship status
  const getButtonProps = () => {
    switch (friendshipStatus) {
      case 'pending':
        return {
          title: 'Request pending',
          style: { backgroundColor: theme.colors.lightPurple },
        };
      case 'friends':
        return {
          title: 'Delete buddy',
          style: { backgroundColor: theme.colors.primaryPurple },
        };
      default:
        return {
          title: 'Send friend request',
          style: { backgroundColor: theme.colors.darkBlue },
        };
    }
  };

  const { title, style: buttonStyle } = getButtonProps();

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={24} color="#999" />
          </TouchableOpacity>

          {/* Avatar */}
          <Image source={{ uri: user.avatar }} style={styles.avatar} />

          {/* Name */}
          <Text style={[theme.fonts.h2, { marginTop: 8 }]}>{user.name}</Text>

          {/* Followers */}
          <Text style={styles.followers}>
            🧠🧠🧠 followed by <Text style={styles.bold}>David</Text> and{' '}
            <Text style={styles.bold}>2 others</Text>
          </Text>

          {/* XP Section */}
          <View style={styles.row}>
            <Text style={theme.fonts.body}>Big Brain</Text> {/* user.level */}
            <ProgressBar progress={user.xp / 10} />
            <Text style={[theme.fonts.body, styles.xpText]}>
              {user.streak} 🔥
            </Text>
          </View>

          {/* Focus Mode */}
          <View style={[styles.row, { marginTop: 12 }]}>
            <Text style={theme.fonts.body}>Best FocusMode :</Text>
            <View style={styles.focusModeTag}>
              <Text style={{ fontSize: 16 }}>🧘</Text>
              <Text style={[theme.fonts.caption, { marginLeft: 4 }]}>MonkMode</Text>
            </View>
          </View>

          {/* Primary Button */}
          <PrimaryButton title={title} style={[styles.button, buttonStyle]} onPress={onSendRequest} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    padding: 24,
    width: 320,
    borderRadius: 24,
    alignItems: 'center',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
    marginTop: 12,
    width: '100%',
    justifyContent: 'space-between',
  },
  xpText: {
    minWidth: 28,
    textAlign: 'right',
  },
  focusModeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fddaff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  button: {
    marginTop: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 16,
  },
});

