import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import BackButton from '../components/BackButton';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import TodoItem from '../components/TodoItem';
import theme from '../theme';

const TASKS_API_URL = "https://fynk-backend.onrender.com/tasks";

export default function ChooseTasksScreen() {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sessionTasks, setSessionTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (!token) {
          setError("Geen token gevonden. Log in opnieuw.");
          setLoading(false);
          return;
        }

        const response = await fetch(TASKS_API_URL, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        const data = await response.json();

        if (response.ok) {
          setTasks(data.data || []);
        } else {
          setError("Fout bij het ophalen van taken.");
        }
      } catch (error) {
        setError("Kan taken niet ophalen.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const toggleTask = (taskId) => {
    setSessionTasks((prevTasks) => 
      prevTasks.includes(taskId)
        ? prevTasks.filter((id) => id !== taskId)
        : [...prevTasks, taskId]
    );
  };

  useEffect(() => {
  console.log("sessionTasks na update:", sessionTasks);
}, [sessionTasks]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['rgba(252,252,252,0)', '#FCFCFC', '#C4CFFF', '#9C80FF']}
          locations={[0, 0.6, 0.9, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradientBackground} />

      {/* Header Section */}
      <View style={styles.headerSection}>
        <View style={styles.headerRow}>
          <BackButton />
          <Text style={[theme.fonts.h1, styles.title]}>Choose tasks</Text>
        </View>
        <Text style={[theme.fonts.body, styles.subtitle]}>
          Which tasks would you like to complete?
        </Text>
      </View>

      {/* Loading & Error Handling */}
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.lila} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View style={styles.todoSection}>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.task_id}
            renderItem={({ item }) => <TodoItem text={item.title} category={item.urgency_type.toLowerCase()} toggleTask={toggleTask} id={item.task_id}/>}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
            contentContainerStyle={{ paddingBottom: 120 }}
          />
        </View>
      )}

      {/* Buttons Section */}
      <View style={styles.buttonRow}>
        <SecondaryButton title="Add Task" onPress={() => {}} style={{ flex: 1 }} />
        <PrimaryButton title="Start Session" onPress={() => navigation.navigate('ChooseSession', { sessionTasks })} style={{ flex: 1 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 12,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
    zIndex: 0,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral,
    position: 'relative',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 32,
    backgroundColor: '#fff',
  },
  headerSection: {
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginLeft: -24, 
  },
  subtitle: {
    marginTop: 16,
    textAlign: 'center',
  },
  todoSection: {
    paddingHorizontal: 16,
    marginTop: 32,
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    gap: 12,
    paddingBottom: 40,
  },
});
