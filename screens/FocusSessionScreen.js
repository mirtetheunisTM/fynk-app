import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import {
    Animated,
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import TodoItemComplete from '../components/TodoItemComplete';
import theme from '../theme';

export default function FocusSessionScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { selectedFocusMode, sessionId } = route.params;

  const [tasks, setTasks] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    selectedFocusMode.focus_time?.minutes ? selectedFocusMode.focus_time?.minutes * 60 : 0
  );
  const [progress, setProgress] = useState(new Animated.Value(0));
  const intervalRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const isPausedRef = useRef(false);
  const [isModalVisible, setModalVisible] = useState(false);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
        const token = await AsyncStorage.getItem("authToken");

        if (!token) {
          setError("Geen token gevonden. Log in opnieuw.");
          setLoading(false);
          return;
        }

      const response = await fetch(`https://fynk-backend.onrender.com/sessions/${sessionId}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data.data || []);
        console.log(data.data);
      } else {
        console.log("Fout bij het ophalen van taken.");
      }
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Timer functions
  useEffect(() => {
    if (timeLeft === null) {
        finishSession(true);
    };

    intervalRef.current = setInterval(() => {
        if (!isPausedRef.current) {
            setTimeLeft(prev => {
            if (selectedFocusMode.focus_time?.minutes) {
                return prev <= 1 ? 0 : prev - 1; // Normale aftelling
            } else {
                return prev + 1; // Optellen als er geen focus tijd is
            }
            });
        }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (timeLeft !== null && selectedFocusMode.focus_time?.minutes) {
      const total = selectedFocusMode.focus_time?.minutes * 60;
      Animated.timing(progress, {
        toValue: 1 - timeLeft / total,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [timeLeft]);

  const formattedTime = timeLeft !== null
    ? `${Math.floor(timeLeft / 60)
        .toString()
        .padStart(2, '0')}:${(timeLeft % 60).toString().padStart(2, '0')}`
    : null;

  const breakTime = selectedFocusMode.break_time?.minutes;
  const breakText = breakTime
    ? `Next ${breakTime} min break → ${dayjs().add(breakTime, 'minutes').format('HH:mm')}`
    : 'Finish your task → done';

  const focusText = selectedFocusMode.focus_time?.minutes
    ? `${selectedFocusMode.focus_time?.minutes} min focus`
    : 'No breaks, just finish it';

    const getFocusModeImage = (focus_mode_id) => {
        switch (Number(focus_mode_id)) {
        case 1: return require('../assets/images/mascottes/ticktockfocus.png');
        case 2: return require('../assets/images/mascottes/monkmodefocus.png');
        case 3: return require('../assets/images/mascottes/todoordiefocus.png');
        case 4: return require('../assets/images/mascottes/workhardchillharderfocus.png');
        case 5: return require('../assets/images/mascottes/beastmodefocus.png');
        case 6: return require('../assets/images/mascottes/figureitoutfocus.png');
        default: return require('../assets/images/mascottes/ticktockfocus.png');
        }
    };

    // End session
    const finishSession = async (successful) => {
        try {
            const token = await AsyncStorage.getItem("authToken");

            if (!token) {
            console.error("Geen token gevonden. Log in opnieuw.");
            return;
            }

            const response = await fetch(`https://fynk-backend.onrender.com/sessions/${sessionId}/finish`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                end_time: new Date().toISOString(),
                successful,
                rating: successful ? 5 : 1,
            }),
            });

            const data = await response.json();

            if (response.ok) {
            console.log("Sessie succesvol beëindigd:", data);
            navigation.navigate("HomeMain");
            } else {
            console.error("Fout bij beëindigen van sessie:", data.message);
            }
        } catch (error) {
            console.error("Kan sessie niet beëindigen:", error);
        }
    };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topRow}>
        <Text style={[theme.fonts.h2, { flex: 1 }]}>{selectedFocusMode.name}</Text>
        <TouchableOpacity
          style={styles.dropdownToggle}
          onPress={() => setModalVisible(true)}
        >
          <Text style={[theme.fonts.caption, {fontWeight: 'bold'}]}>Tasks</Text>
          <Feather
            name={dropdownOpen ? 'chevron-up' : 'chevron-down'}
            size={16}
            color={theme.colors.darkBlue}
          />
        </TouchableOpacity>
      </View>

      {/* Task popup */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        >
        <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.task_id}
                renderItem={({ item }) => <TodoItemComplete text={item.title} />}
            />

            <PrimaryButton title="Close" onPress={() => setModalVisible(false)} />
            </View>
        </View>
       </Modal>


      {/* Focus Info */}
      <View>
        <Text style={[theme.fonts.h1, { textAlign: 'center', marginBottom: 8 }]}>{focusText}</Text>
        <Text style={[theme.fonts.body, { textAlign: 'center', marginBottom: 16 }]}>
            {breakText}
        </Text>
      </View>

      {/* Circular Timer */}
      <View>
      <View style={styles.circleWrapper}>
        <View style={styles.outerCircle}>
          <Animated.View
            style={[
              styles.innerFill,
              {
                height: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
          <Image
            source={getFocusModeImage(selectedFocusMode.focus_mode_id)}
            style={styles.centerImage}
          />
        </View>
      </View>

      {/* Timer */}
      <Text style={[theme.fonts.h1, styles.timer]}>
        {formattedTime ?? <Feather name="infinity" size={28} color={theme.colors.primaryPurple} />}
      </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <PrimaryButton
            title={isPaused ? "▶️" : "⏸"}
            style={{ paddingHorizontal: 24, paddingVertical: 12 }}
            onPress={() => {
                setIsPaused(prev => {
                    isPausedRef.current = !prev;
                    return !prev;
                });
                }}
        />
        <SecondaryButton title="⏹" style={{paddingHorizontal: 24, paddingVertical: 12}} onPress={() => finishSession(false)}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.creme,
    padding: 24,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dropdownToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: theme.colors.lightPurple,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dropdownList: {
    backgroundColor: theme.colors.lightPurple,
    padding: 8,
    borderRadius: 12,
    marginBottom: 16,
  },
  circleWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
  },
  outerCircle: {
    width: 270,
    height: 270,
    borderRadius: 200,
    backgroundColor: theme.colors.lightPurple,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerFill: {
    position: 'absolute',
    width: '100%',
    backgroundColor: theme.colors.primaryPurple,
    bottom: 0,
  },
  centerImage: {
    width: 225,
    height: 225,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  timer: {
    textAlign: 'center',
    fontSize: 40,
    color: theme.colors.primaryPurple,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
    gap: 12,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: 'rgba(196, 207, 255, 0.1)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: theme.colors.lightPurple,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'left',
  },
});
