// friendshipStatus: 'pending', 'friends', 'none'

import { Feather, Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../theme';
import PrimaryButton from './PrimaryButton';
import ProgressBar from './ProgressBar';

export default function FriendProfileModal({ visible, onClose, user, friendshipStatus }) {
  if (!user) return null;
  const [friendStatus, setFriendStatus] = useState(friendshipStatus);

  console.log

  // Button config based on friendship status
  const getButtonProps = () => {
    switch (friendStatus) {
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

  const onSendRequest = () => {
    switch (friendStatus) {
      case 'pending':
        // Nothing should happen when request is already pending
        break;
      case 'none':
        // sendFriendRequest(); & setFriendStatus('pending');
        break;
      case 'friends':
        // Open Warning Modal and ask if they are sure they want to delete this friend, if yes: deleteFriend && setFriendStatus('none');
        break;
    }
  };


  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={24} color="#999" />
          </TouchableOpacity>

          {/* Avatar */}
          <Image source={user.profileImage} style={styles.avatar} />

          {/* Name */}
          <Text style={[theme.fonts.h3, { marginTop: 8 }]}>{user.name}</Text>

          {/* Followers */}
          <Text style={theme.fonts.caption}>
            🧠🧠🧠 buddies with <Text style={styles.bold}>David</Text> and{' '}
            <Text style={styles.bold}>2 others</Text>
          </Text>

          {/* XP Section */}
          <View style={styles.row}>
            <Text style={[theme.fonts.caption, { fontWeight: 'bold' }]}>{user.level}</Text>
            <ProgressBar progress={user.progress} style={{ width: 180 }}/>
            <View style={styles.xpContainer}>
              <Text style={[theme.fonts.caption, styles.xpText]}>
                {user.streak}
              </Text>
              <Ionicons name="flame" size={16} color={theme.colors.primaryPurple} style={{ marginLeft: -4 }}/>
            </View>
          </View>

          {/* Focus Mode */}
          <View style={[styles.row, { marginTop: 12 }]}>
            <Text style={[theme.fonts.caption, { fontWeight: 'bold' }]}>Best FocusMode :</Text>
            <View style={styles.focusModeContainer}>
              <Image source={require('../assets/images/mascottes/monkmode.png')} style={styles.focusModeAvatar} />
              <View style={styles.focusModeTag}>
                <Text style={[theme.fonts.caption, { fontWeight: 'bold' }]}>MonkMode</Text>
              </View>
            </View>
          </View>

          {/* Primary Button */}
          <PrimaryButton title={title} style={[styles.button, buttonStyle]} onPress={() => onSendRequest()} />
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
    backgroundColor: theme.colors.creme,
    paddingVertical: 24,
    paddingHorizontal: 16,
    width: '90%',
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
    marginTop: 12,
    width: '100%',
    justifyContent: 'space-between',
  },
  xpText: {
    minWidth: 28,
    textAlign: 'right',
    fontWeight: 'bold',
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
  focusModeAvatar: {
    width: 18,
    height: 18,
  },
  focusModeContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  xpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

