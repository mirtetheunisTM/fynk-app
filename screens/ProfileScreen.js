import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import EmptyState from '../components/EmptyState';
import OverlayLoader from '../components/OverlayLoader';
import PrimaryButton from '../components/PrimaryButton';
import ProgressBar from '../components/ProgressBar';
import SessionCard from '../components/SessionCard';
import ShopTabs from '../components/ShopTabs';
import StatisticsTab from '../components/StatisticsTab';
import theme from '../theme';

export default function AccountScreen() {
  const navigation = useNavigation();

  const [tab, setTab] = useState(0);
  const [sessionData, setSessionData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://fynk-backend.onrender.com/sessions";

  //

  // Fetch sessions
  const fetchSessions = async () => {
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        console.error("Geen token gevonden. Log in opnieuw.");
        return;
      }

      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setSessionData(data.data || []);
      } else {
        console.error("Fout bij ophalen van sessies:", data.message);
      }
    } catch (error) {
      console.error("Kan sessies niet ophalen:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // Get image and description
  const getSessionDetails = (focus_mode_id) => {
    switch (Number(focus_mode_id)) {
      case 1: return { image: require('../assets/images/mascottes/ticktock.png'), description: "Completed a Tick Tock Session" };
      case 2: return { image: require('../assets/images/mascottes/monkmode.png'), description: "Completed a Monk Mode Session" };
      case 3: return { image: require('../assets/images/mascottes/todoordie.png'), description: "Completed a Todo or Die Session" };
      case 4: return { image: require('../assets/images/mascottes/workhardchillharder.png'), description: "Completed a Work Hard Chill Harder Session" };
      case 5: return { image: require('../assets/images/mascottes/beastmode.png'), description: "Completed a Beast Mode Session" };
      default: return { image: require('../assets/images/mascottes/ticktock.png'), description: "Completed a Focus Session" };
    }
  };

  // Get timeAgo
  dayjs.extend(relativeTime);
  const getTimeAgo = (session) => {
    const sessionEndTime = session.end_time || session.start_time; // Gebruik start_time als end_time ontbreekt
    return dayjs(sessionEndTime).fromNow(); 
  }

  return (
    <View style={styles.container}>
        {/* Loader Overlay */}
        <OverlayLoader visible={loading} />

        {/* Background gradient */}
        <LinearGradient
          colors={['rgba(252,252,252,0)', '#FCFCFC', '#C4CFFF', '#9C80FF']}
          locations={[0, 0.6, 0.9, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradientBackground}
        />

        {/* Header */}
        <View style={styles.header}>
          <Text style={theme.fonts.h1}>Account</Text>
          <Ionicons name="settings" size={24} color={theme.colors.primaryPurple} />
        </View>

        <View style={styles.profileContainer}>
            {/* Profile Avatar */}
            <Image
            source={require('../assets/images/Laura.jpg')}
            style={styles.avatar}
            />

            {/* Stats Section */}
            <View style={styles.statsContainer}>
            <View style={styles.statItem}>
                <Text style={[theme.fonts.body, styles.boldText]}>4</Text>
                <Text style={theme.fonts.caption}>Sessions</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={[theme.fonts.body, styles.boldText]}>2</Text>
                <Text style={theme.fonts.caption}>Current level</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={[theme.fonts.body, styles.boldText]}>45</Text>
                <Text style={theme.fonts.caption}>StudyBuddies</Text>
            </View>
            </View>
        </View>

        {/* Username */}
        <Text style={[theme.fonts.h3, styles.username]}>@alexiagonzalez</Text>

        {/* Progress */}
        <View style={styles.progressRow}>
          <Text style={[theme.fonts.caption, { fontWeight: 'bold' }]}>Goldfish</Text>
          <ProgressBar progress={0.6} style={{width: '70%'}} />
          <Text style={[theme.fonts.body, { fontWeight: 'bold' }]}>6</Text>
          <Ionicons name="flame" size={16} color={theme.colors.primaryPurple} style={{ marginLeft: -8 }} />
        </View>

        {/* Tabs */}
        <View style={{ marginTop: 24, marginBottom: 16, marginHorizontal: 16 }}>
          <ShopTabs
            tabs={['Sessions', 'Progress', 'Statistics']}
            activeTab={tab}
            onTabPress={setTab}
          />
        </View>

        {/* Tab Content */}
        {tab === 0 ? (
          <>
          {/* Empty state */}
          {sessionData.length === 0 && (
            <ScrollView style={{flex: 1}}>
              <EmptyState page="sessions" message="You have no sessions yet, start focussing and see your latest session!" />
              <PrimaryButton title="Start a Session" onPress={() => navigation.navigate('Home')} style={{marginTop: 24}}/>
            </ScrollView>
          )}

          {/* Session Cards */}
            {sessionData.length > 0 && 
              <FlatList
                data={sessionData}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: 16 }}
                renderItem={({ item }) => (
                  <View style={styles.sessionBlock}>
                    <SessionCard
                      profileImage={getSessionDetails(item.focus_mode_id).image}
                      friendName="You"
                      sessionDescription={getSessionDetails(item.focus_mode_id).description}
                      timeAgo={getTimeAgo(item)}
                    />
                    <Text style={[theme.fonts.caption, { marginLeft: 48 }]}>
                      Cheered by <Text style={styles.boldText}>Ella</Text> and <Text style={styles.boldText}>15 others</Text>
                    </Text>
                  </View>
              )}
            />}
          </>
        ) : tab === 2 ? (
          <StatisticsTab />
        ) : (
          <Text style={[theme.fonts.caption, { textAlign: 'center' }]}>No content available</Text>
        )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileContainer: {
    flexDirection: 'row',
    gap: 24,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  avatar: {
    width: 67,
    height: 67,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: theme.colors.lila,
    alignSelf: 'center',
    marginRight: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  username: {
    textAlign: 'left',
    marginBottom: 16,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  sessionBlock: {
    marginBottom: 24,
  },
  boldText: {
    fontWeight: 'bold',
  },
});
