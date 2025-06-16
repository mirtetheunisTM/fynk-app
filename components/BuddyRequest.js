import { Feather, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import theme from '../theme';
import PrimaryButton from './PrimaryButton';
import ProgressBar from './ProgressBar';
import WarningPopup from "./WarningPopup";

export default function BuddyRequest({user, requestId}) {
    const [warningVisible, setWarningVisible] = useState(false);

    const acceptRequest = async (requestId) => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (!token) {
          console.error("Geen token gevonden. Log in opnieuw.");
          return;
        }

        const response = await fetch(`https://fynk-backend.onrender.com/friends/request/${requestId}/accept`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          console.log(`Vriendschapsverzoek ${requestId} geaccepteerd.`);
        } else {
          console.error(`Fout bij accepteren van verzoek ${requestId}:`, await response.text());
        }
      } catch (error) {
        console.error("Kan vriendverzoek niet accepteren:", error);
      }
    };

    const rejectRequest = async (requestId) => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (!token) {
          console.error("Geen token gevonden. Log in opnieuw.");
          return;
        }

        const response = await fetch(`https://fynk-backend.onrender.com/friends/request/${requestId}/reject`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          console.log(`Vriendschapsverzoek ${requestId} afgewezen.`);
        } else {
          console.error(`Fout bij afwijzen van verzoek ${requestId}:`, await response.text());
        }
      } catch (error) {
        console.error("Kan vriendverzoek niet afwijzen:", error);
      }
    };

    const handleAccept = () => {
    acceptRequest(requestId);
    };

    const handleReject = () => {
      setWarningVisible(true);
    };

    const confirmReject = () => {
      rejectRequest(requestId);
      setWarningVisible(false);
    };

    return (
        <View style={styles.container}>
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={handleReject}>
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
          <PrimaryButton title="Accept request" onPress={() => {handleAccept()}} />

          {/* WarningPopup at reject */}
          <WarningPopup
            visible={warningVisible}
            onCancel={() => setWarningVisible(false)}
            onConfirm={confirmReject}
            message="Are you sure you want to reject this request?"
          />
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