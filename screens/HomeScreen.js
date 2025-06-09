import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import ProgressBar from '../components/ProgressBar';
import SecondaryButton from '../components/SecondaryButton';
import theme from '../theme';

export default function HomeScreen() {
  const navigation = useNavigation();

  const userName = 'Alexia';
  const progress = 0.75;

  const [tasks, setTasks] = useState([]);
  const [lastSession, setLastSession] = useState(null);

  useEffect(() => {
    // Dummy data now, replace with API call
    const fetchData = async () => {
      setTasks([
        { id: 1, title: 'Design 4 : Ideate', due: '11.00 AM', color: theme.colors.pink },
        { id: 2, title: 'Call Ella', due: '11.00 AM', color: theme.colors.lila },
      ]);

      setLastSession({
        title: 'Beast Mode Session',
        duration: '45 minutes',
        date: '08-05',
        image: require('../assets/images/mascottes/bodybuilder.png'),
      });
    };

    fetchData();
  }, []);

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
            <Text style={[theme.fonts.caption, { color: theme.colors.primaryPurple, fontWeight: 'bold' }]}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {tasks.map((task) => (
          <View key={task.id} style={[styles.task, { backgroundColor: task.color }]}>
            <Text style={[theme.fonts.body, { fontWeight: 'bold' }]}>{task.title}</Text>
            <View style={styles.dueBadge}>
              <Text style={[theme.fonts.caption, { color: theme.colors.neutral }]}>Due {task.due}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Last session */}
      {lastSession && (
        <View style={styles.card}>
          <Text style={[theme.fonts.h3, { marginBottom: 8 }]}>Last session</Text>
          <View style={styles.sessionRow}>
            <Image source={lastSession.image} style={styles.sessionImage} />
            <View style={styles.sessionColumn}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[theme.fonts.body, { fontWeight: 'bold' }]}>{lastSession.title}</Text>
                <Text style={[theme.fonts.caption, { fontWeight: 'bold' }]}>{lastSession.date}</Text>
              </View>
              <Text style={theme.fonts.caption}>{lastSession.duration}</Text>
            </View>
          </View>
        </View>
      )}

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <SecondaryButton title="Customized session" style={{ flex: 1 }} />
        <PrimaryButton title="Start Session" style={{ flex: 1 }} onPress={() => navigation.navigate('ChooseTasks')} />
      </View>
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
    paddingVertical: 8,
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
    gap: 16,
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
