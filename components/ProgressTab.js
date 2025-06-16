import { Image, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';
import ProgressBar from './ProgressBar';

const ProgressTab = () => {
    
  return (
    <View style={styles.container}>
      {/* Current Level Section */}
      <View style={styles.sectionContainer}>
        <Text style={theme.fonts.h3}>Current level</Text>
        <View style={styles.levelCard}>
          <Image
            source={require('../assets/images/mascottes/monkmode.png')}
            style={styles.levelImage}
          />
          <View style={styles.levelDetails}>
            <Text style={theme.fonts.h3}>Monkey Brain</Text>
            <Text style={theme.fonts.caption}>Brain jumping from thought to thought like vines.</Text>
          </View>
        </View>
        <ProgressBar progress={0.75} style={{ width: '90%' }} />
        <Text style={theme.fonts.caption}>Keep going to reach the next level!</Text>
      </View>

      {/* Next Level Section */}
      <View style={styles.sectionContainer}>
        <Text style={theme.fonts.h3}>Next level</Text>
        <View style={styles.levelCard}>
          <Image
            source={require('../assets/images/mascottes/babybrain.svg')}
            style={styles.levelImage}
          />
          <View style={styles.levelDetails}>
            <Text style={theme.fonts.h3}>Baby Brain</Text>
            <Text style={theme.fonts.caption}>Slightly evolved. Still very breakable.</Text>
          </View>
          <Text style={[theme.fonts.body, styles.unlockText]}>Unlocks at: 300 XP</Text>
        </View>
      </View>

      {/* Current Streak Section */}
      <View style={styles.sectionContainer}>
        <Text style={theme.fonts.h3}>Current streak</Text>
        <View style={styles.streakCard}>
          <Image
            source={require('../assets/images/mascottes/streak.svg')}
            style={styles.streakImage}
          />
          <View style={styles.streakDetails}>
            <Text style={theme.fonts.h3}>Current streak is 6!</Text>
            <Text style={theme.fonts.caption}>8 more days till you break your personal best</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.neutral,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  levelImage: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  levelDetails: {
    flex: 1,
  },
  unlockText: {
    fontWeight: 'bold',
    color: theme.colors.primaryPurple,
  },
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  streakImage: {
    width: 50,
    height: 50,
    marginRight: 16,
  },
  streakDetails: {
    flex: 1,
  },
});

export default ProgressTab;