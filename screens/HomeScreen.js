import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import EmptyState from '../components/EmptyState';
import PrimaryButton from '../components/PrimaryButton';
import ProgressBar from '../components/ProgressBar';
import SecondaryButton from '../components/SecondaryButton';
import theme from '../theme';

const TASKS_API_URL = "https://fynk-backend.onrender.com/tasks/status/todo";
const SESSION_API_URL = "https://fynk-backend.onrender.com/sessions/last";

export default function HomeScreen() {
  const navigation = useNavigation();

  const userName = 'Alexia';
  const progress = 0.75;

  const [tasks, setTasks] = useState([]);
  const [lastSession, setLastSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
        const fetchData = async () => {
          setError('');
            try {
                const token = await AsyncStorage.getItem("authToken");

                if (!token) {
                    setError("Geen token gevonden. Log in opnieuw.");
                    setLoading(false);
                    return;
                }

                // Taken ophalen
                const tasksResponse = await fetch(TASKS_API_URL, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                const tasksData = await tasksResponse.json();

                if (tasksResponse.ok) {
                    const allTasks = tasksData.data || [];
                    console.log(allTasks);

                    // Taken sorteren op due date
                    allTasks.sort((a, b) => new Date(a.due) - new Date(b.due));

                    // Slechts de twee eerstvolgende taken selecteren
                    const filteredTasks = allTasks.slice(0, 2).map(task => ({
                        ...task,
                        due_date: formatDate(task.due_date),
                        color: getTaskColor(task.urgency_type),
                    }));

                    setTasks(filteredTasks);
                } else {
                    setError("Fout bij het ophalen van taken.");
                }

                // Last session ophalen
                const sessionResponse = await fetch(SESSION_API_URL, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                const sessionData = await sessionResponse.json();

                if (sessionResponse.ok) {
                    setLastSession({
                      ...sessionData.data,
                      date: formatDate(sessionData.data.start_time),
                   });
                   console.log(lastSession);
                } else {
                    setError("Fout bij het ophalen van de laatste sessie.");
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

          // **Haal data op bij eerste render**
          useEffect(() => {
            fetchData();
          }, []);
        
          // **Herlaad data wanneer gebruiker terugkeert naar het scherm**
          useFocusEffect(
            useCallback(() => {
              fetchData();
            }, [])
          );

    const getTaskColor = (urgency_type) => {
        switch (urgency_type) {
            case "Deadline Drama": return theme.colors.pink;
            case "Future Me Problem": return theme.colors.lightPurple;
            case "Quick Fix": return theme.colors.lila;
            case "Nice, not necessary": return theme.colors.neutral;
            default: return theme.colors.creme;
        }
    };

    const getFocusMode = (focus_mode_id) => {
        focus_mode_id = Number(focus_mode_id);
        switch (focus_mode_id) {
            case 1: return "Tick Tock";
            case 2: return "Monk Mode";
            case 3: return "To Do or Die";
            case 4: return "Work Hard, Chill Harder";
            case 5: return "Beast Mode";
            case 6: return "Figure It Out";
            default: return "No Focus Mode";
        }
    };

    const getFocusModeImage = (focus_mode_id) => {
        focus_mode_id = Number(focus_mode_id);
        switch (focus_mode_id) {
            case 1: return require('../assets/images/mascottes/ticktock.png');
            case 2: return require('../assets/images/mascottes/monkmode.png');
            case 3: return require('../assets/images/mascottes/todoordie.png');
            case 4: return require('../assets/images/mascottes/workhardchillharder.png');
            case 5: return require('../assets/images/mascottes/beastmode.png');
            case 6: return require('../assets/images/mascottes/figureitout.png');
            default: return require('../assets/images/mascottes/ticktock.png');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("nl-NL", { day: "2-digit", month: "2-digit" });
    };
    console.log(error);

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

      {tasks.length === 0 && !lastSession && (
        <EmptyState message="Start using the app to fill this screen!" page="home" />
      )}


      {/* Upcoming Tasks */}
      {lastSession && 
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={theme.fonts.h3}>Your upcoming tasks</Text>
          <TouchableOpacity onPress={() => {navigation.navigate('Braindump');}}>
            <Text style={[theme.fonts.caption, { color: theme.colors.primaryPurple, fontWeight: 'bold' }]}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        
        {tasks.length === 0 ? (
          <Text style={theme.fonts.body}>You have no upcoming todos.</Text>
        ) : (
        tasks.map((task) => (
          <View key={task.task_id} style={[styles.task, { backgroundColor: task.color }]}>
            <Text style={[theme.fonts.body, { fontWeight: 'bold' }]}>{task.title}</Text>
            <View style={styles.dueBadge}>
              <Text style={[theme.fonts.caption, { color: theme.colors.neutral }]}>Due {task.due_date}</Text>
            </View>
          </View>
        )))}
      </View>}

      {/* Last session */}
      {lastSession && (
        <View style={styles.card}>
          <Text style={[theme.fonts.h3, { marginBottom: 8 }]}>Last session</Text>
          <View style={styles.sessionRow}>
            <Image source={getFocusModeImage(lastSession.focus_mode_id)} style={styles.sessionImage} />
            <View style={styles.sessionColumn}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={[theme.fonts.body, { fontWeight: 'bold' }]}>{getFocusMode(lastSession.focus_mode_id)}</Text>
                <Text style={[theme.fonts.caption, { fontWeight: 'bold' }]}>{lastSession.date}</Text>
              </View>
              <Text style={theme.fonts.caption}>{lastSession.duration ? lastSession.duration + ' minutes' : 'No duration known'}</Text>
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
