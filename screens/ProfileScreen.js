import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import EmptyState from '../components/EmptyState';
import PrimaryButton from '../components/PrimaryButton';
import ProgressBar from '../components/ProgressBar';
import SessionCard from '../components/SessionCard';
import ShopTabs from '../components/ShopTabs';
import theme from '../theme';

export default function AccountScreen() {
  const navigation = useNavigation();

  const [tab, setTab] = useState(0);

  const sessionData = [
    /*{
      image: require('../assets/images/mascottes/beastmode.png'),
      name: 'You',
      sessionDescription: 'Completed a Beast Mode Session',
      timeAgo: 'Just now',
      cheeredBy: 'Ella',
      othersCount: 15,
    },
    {
      image: require('../assets/images/mascottes/ticktock.png'),
      name: 'You',
      sessionDescription: 'Completed a Tick Tock Session',
      timeAgo: '02-05',
      cheeredBy: 'John',
      othersCount: 5,
    },*/
  ];

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
            <View style={{gap: 24}}>
              <EmptyState page="sessions" message="You have no sessions yet, start focussing and see your latest session!" />
              <PrimaryButton title="Start a Session" onPress={() => navigation.navigate('Home')} />
            </View>
          )}
            {sessionData.length > 0 && sessionData.map((session, index) => (
              <View key={index} style={styles.sessionBlock}>
                <SessionCard
                  profileImage={session.image}
                  friendName={session.name}
                  sessionDescription={session.sessionDescription}
                  timeAgo={session.timeAgo}
                />
                <Text style={[theme.fonts.caption, { marginLeft: 48 }]}>
                  Cheered by <Text style={styles.boldText}>{session.cheeredBy}</Text> and {session.othersCount} others
                </Text>
              </View>
            ))}
          </>
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
