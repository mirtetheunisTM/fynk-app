import { Ionicons } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';
import StatCard from './StatCard';

export default function StatisticsTab() {
  return (
    <ScrollView style={styles.container}>
      {/* Grote kaart */}
      <View style={styles.largeStatCard}>
        <View>
          <View style={styles.iconRow}>
            <Ionicons name="flame" size={28} color={theme.colors.primaryPurple} />
            <Text style={[theme.fonts.body, { fontWeight: 'bold' }]}>Longest Streak</Text>
          </View>
          <View style={styles.tag}>
            <Text style={[theme.fonts.caption, { fontWeight: 'bold' }]}>14 Days</Text>
          </View>
        </View>
        <Image source={require('../assets/images/mascottes/handsup.png')} style={styles.brainImage} />
      </View>

      {/* Statistiek rijen */}
      <View style={styles.row}>
        <StatCard title="Top FocusMethod" tag="MonkMode" tagColor={theme.colors.pink} image={require('../assets/images/mascottes/monkmode.png')} />
        <StatCard title="Your FocusBuddy" tag="Ella" tagColor={theme.colors.pink} image={require('../assets/images/Ella.jpg')} />
      </View>
      <View style={styles.row}>
        <StatCard title="Best Focus Time" tag="10 am" icon="time-outline" />
        <StatCard title="Best Focus Day" tag="Monday" icon="calendar-outline" />
      </View>
      <View style={styles.row}>
        <View style={styles.chartCard}>
          <Text style={[theme.fonts.caption, { marginBottom: 4, fontWeight: 'bold' }]}>Average Focus Session</Text>
          <View style={styles.infoRow}>
            <View style={styles.timeTag}>
                <Text style={[theme.fonts.caption, { fontWeight: 'bold' }]}>90 min</Text>
            </View>
            <View style={styles.chartPlaceholder}>
              <Text style={[theme.fonts.caption, { fontWeight: 'bold' }]}>|||</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <StatCard title="Cheers Given" tag="32" icon="heart" tagColor={theme.colors.neutral}/>
        <StatCard title="Cheers Received" tag="54" icon="heart" tagColor={theme.colors.neutral}/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
  },
  largeStatCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.creme,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tag: {
    marginTop: 16,
    backgroundColor: theme.colors.lightPurple,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: 'flex-start',
    width: '100%',
    alignItems: 'center',
  },
  timeTag: {
    marginTop: 16,
    backgroundColor: theme.colors.lightPurple,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: 'flex-start',
    width: '40%',
    alignItems: 'center',
  },
  brainImage: {
    width: 129,
    height: 100,
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  chartCard: {
    flex: 1,
    backgroundColor: theme.colors.creme,
    borderRadius: 12,
    padding: 16,
  },
  chartPlaceholder: {
    height: 40,
    marginTop: 8,
    backgroundColor: theme.colors.lightPurple,
    borderRadius: 8,
    opacity: 0.3,
    width: '55%',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});
