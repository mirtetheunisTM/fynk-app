import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import ProgressBar from '../components/ProgressBar';
import SecondaryButton from '../components/SecondaryButton';
import theme from '../theme';

export default function HomeScreen() {
  const userName = 'Alexia';
  const progress = 0.75;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../assets/images/mascottes/wave.png')} style={styles.mascot} />
        <View style={styles.headerText}>
          <Text style={theme.fonts.h2}>Hi {userName}, ready to focus?</Text>
          <View style={styles.levelRow}>
            <Text style={[theme.fonts.caption, { fontWeight: 'bold' }]}>Level 2</Text>
            <View style={styles.progressWrapper}>
              <ProgressBar progress={progress} />
            </View>
            <Text style={[theme.fonts.caption, { fontWeight: 'bold' }]}>{Math.round(progress * 100)}%</Text>
          </View>
        </View>
      </View>

      {/* Upcoming Tasks */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={theme.fonts.h3}>Your upcoming tasks</Text>
          <TouchableOpacity onPress={() => {}}>
          <Text style={[theme.fonts.caption, { color: theme.colors.primaryPurple }, { fontWeight: 'bold' }]}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.task, { backgroundColor: theme.colors.pink }]}>
          <Text style={[theme.fonts.body, { fontWeight: 'bold' }]}>Design 4 : Ideate</Text>
          <View style={styles.dueBadge}>
            <Text style={[theme.fonts.caption, { color: theme.colors.neutral }]}>Due 11.00 AM</Text>
          </View>
        </View>

        <View style={[styles.task, { backgroundColor: theme.colors.lila }]}>
          <Text style={[theme.fonts.body, { fontWeight: 'bold' }]}>Call Ella</Text>
          <View style={styles.dueBadge}>
            <Text style={[theme.fonts.caption, { color: theme.colors.neutral }]}>Due 11.00 AM</Text>
          </View>
        </View>
      </View>

      {/* Last session */}
      <View style={styles.card}>
        <Text style={[theme.fonts.h3, { marginBottom: 8 }]}>Last session</Text>
        <View style={styles.sessionRow}>
          <Image source={require('../assets/images/mascottes/bodybuilder.png')} style={styles.sessionImage} />
          <View style={styles.sessionColumn}>
            <Text style={[theme.fonts.body, { fontWeight: 'bold' }]}>Beast Mode Session</Text>
            <Text style={theme.fonts.caption}>45 minutes</Text>
          </View>
          <Text style={[theme.fonts.caption, { fontWeight: 'bold'}]}>08-05</Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <SecondaryButton title="Customized session" style={{ flex: 1 }}/>
        <PrimaryButton title="Start Session" style={{ flex: 1 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60,
    backgroundColor: theme.colors.neutral,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 36,
  },
  mascot: {
    width: 100,
    height: 96,
    resizeMode: 'contain',
    marginRight: 24,
  },
  headerText: {
    flex: 1,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  progressWrapper: {
    flex: 1,
    marginHorizontal: 8,
  },
  card: {
    backgroundColor: theme.colors.creme,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 32,
    marginBottom: 24,
    /*shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,*/
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  task: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dueBadge: {
    backgroundColor: theme.colors.darkBlue,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
  },
  sessionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 12,
  },
  sessionColumn: {
    flex: 1,
    flexDirection: 'column',
    gap: 24,
  },
  sessionImage: {
    width: 52,
    height: 52,
    resizeMode: 'contain',
    marginRight: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    gap: 12,
    paddingBottom: 40,
  },
});
