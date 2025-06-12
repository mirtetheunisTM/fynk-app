import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, View, } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../theme';

const { width } = Dimensions.get('window');
const API_URL = "https://fynk-backend.onrender.com/sessions";
const MODES_API_URL = "https://fynk-backend.onrender.com/focusModes";

/*const focusModes = [
  {
    id: '1',
    image: require('../assets/images/mascottes/ticktock.png'), 
    title: 'Tick Tock',
    tags: ['Timer', 'Pomodoro', 'Recommended'],
    description:
      'Work for 25 minutes, break for 5. Rinse and repeat until you finally finish something. Perfect for people who can’t focus longer than a goldfish.',
  },
  {
    id: '2',
    image: require('../assets/images/mascottes/monkmode.png'), 
    title: 'Monk Mode',
    tags: ['Timer', 'Deepwork'],
    description:
      '90 minutes of work, 20 minutes break. Longer block to get into zen mode/flow state. Medium active break to reset.',
  },
  {
    id: '3',
    image: require('../assets/images/mascottes/todoordie.png'), 
    title: 'To Do or Die',
    tags: ['Taskbased', 'Deepwork'],
    description:
      'Pick one task. Just one. Then work on it until it’s done. No timers, no breaks, no escape. It’s you vs. the to-do. Winner takes all.',
  },
  {
    id: '4',
    image: require('../assets/images/mascottes/workhardchillharder.png'), 
    title: 'Work Hard, Chill Harder',
    tags: ['Timer', 'Habit-forming'],
    description:
      'Work for 30 minutes, followed by a well-deserved 30-minute break. Done is better than perfect. At least you’re doing something.',
  },
  {
    id: '5',
    image: require('../assets/images/mascottes/beastmode.png'), 
    title: 'Beast Mode',
    tags: ['Taskbased', 'Eat the frog'],
    description:
      'Do the hardest, most annoying task first. Stop crying about it. Rip the Band-Aid off and move on with your life.',
  },
  {
    id: '6',
    image: require('../assets/images/mascottes/figureitout.png'), 
    title: 'Figure It Out',
    tags: ['Timer', 'Custom'],
    description:
      'Pick your own focus time and breaks. Want a 5-minute work session with a 3-hour break? Go ahead. See where that gets you.',
  },
];*/

const getTagStyle = (tag, idx) => {
  if (tag.toLowerCase() === 'recommended') {
    return { backgroundColor: theme.colors.lila };
  }
  if (idx === 0) return { backgroundColor: theme.colors.pink };
  if (idx === 1) return { backgroundColor: theme.colors.primaryPurple };
  return { backgroundColor: theme.colors.lightPurple };
};

export default function ChooseSessionScreen() {
  const [focusModes, setFocusModes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  const route = useRoute();
  const { sessionTasks } = route.params;
  console.log(sessionTasks);

  const viewConfigRef = useRef({ itemVisiblePercentThreshold: 50 }).current;

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  // Haal focus modes op + koppel images en tags
    useEffect(() => {
    const fetchFocusModes = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (!token) {
          setError("Geen token gevonden. Log in opnieuw.");
          setLoading(false);
          return;
        }

        const response = await fetch(MODES_API_URL, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        const data = await response.json();

        if (response.ok) {
          const sortedModes = data.data
            .map(mode => ({
              ...mode,
              image: getFocusModeImage(mode.focus_mode_id),
              tags: getFocusModeTags(mode.focus_mode_id)
            }))
            .sort((a, b) => a.focus_mode_id - b.focus_mode_id); // Sorteer op id

          setFocusModes(sortedModes);
        } else {
          setError("Fout bij het ophalen van focus modes.");
        }
      } catch (error) {
        setError("Kan focus modes niet ophalen.");
      } finally {
        setLoading(false);
      }
    };

    fetchFocusModes();
  }, []);

  const getFocusModeImage = (focus_mode_id) => {
    switch (Number(focus_mode_id)) {
      case 1: return require('../assets/images/mascottes/ticktock.png');
      case 2: return require('../assets/images/mascottes/monkmode.png');
      case 3: return require('../assets/images/mascottes/todoordie.png');
      case 4: return require('../assets/images/mascottes/workhardchillharder.png');
      case 5: return require('../assets/images/mascottes/beastmode.png');
      case 6: return require('../assets/images/mascottes/figureitout.png');
      default: return require('../assets/images/mascottes/ticktock.png');
    }
  };

  const getFocusModeTags = (focus_mode_id) => {
    switch (Number(focus_mode_id)) {
      case 1: return ['Timer', 'Pomodoro'];
      case 2: return ['Timer', 'Deepwork'];
      case 3: return ['Taskbased', 'Deepwork'];
      case 4: return ['Timer', 'Habit-forming'];
      case 5: return ['Taskbased', 'Eat the frog'];
      case 6: return ['Timer', 'Custom'];
      default: return ['Timer', 'Pomodoro'];
    }
  };

    const startSession = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        console.error("Geen token gevonden. Log in opnieuw.");
        return;
      }

      // Huidige tijd in ISO-formaat (UTC)
      const startTime = new Date().toISOString();

      // Sessie aanmaken
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          start_time: startTime,
          focus_mode_id: focusModes[currentIndex].id
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Sessie gestart:", data);
      } else {
        console.error("Fout bij het starten van sessie:", data.message);
      }

      const sessionId = data.data.session_id;

      // Taken linken aan sessie
      if (sessionTasks.length === 1) {
        await fetch(`${API_URL}/${sessionId}/task/${sessionTasks[0]}`, {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}` },
        });
      } else if (sessionTasks.length > 1) {
        await fetch(`${API_URL}/${sessionId}/tasks`, {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({ taskIds: sessionTasks }),
        });
      }

      console.log("Sessie gestart met taken:", sessionTasks);
    } catch (error) {
      console.error("Kan sessie niet starten:", error);
    }
  };

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

    <Text style={[theme.fonts.h1, styles.title]}>
      Choose your FocusMode
    </Text>

    {/* Carousel */}
    <FlatList
      data={focusModes}
      horizontal
      pagingEnabled
      snapToInterval={width}
      ref={flatListRef}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.focus_mode_id}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={viewConfigRef}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={item.image} style={styles.image} />
          <Text style={[theme.fonts.h2, styles.focusTitle]}>{item.title}</Text>
          <View style={styles.tags}>
            {item.tags.map((tag, idx) => (
              <Text
                key={idx}
                style={[
                  theme.fonts.caption,
                  styles.tag,
                  { fontWeight: 'bold' },
                  getTagStyle(tag, idx),
                ]}
              >
                {tag}
              </Text>
            ))}
          </View>
          <Text style={[theme.fonts.body, styles.description]}>
            {item.description}
          </Text>
        </View>
      )}
    />

    {/* Pagination */}
    <View style={styles.pagination}>
      {focusModes.map((_, idx) => (
        <View
          key={idx}
          style={[
            styles.dot,
            {
              backgroundColor:
                idx === currentIndex
                  ? theme.colors.darkBlue
                  : theme.colors.lila,
            },
          ]}
        />
      ))}
    </View>

    <PrimaryButton title="Start Session" onPress={startSession} style={styles.button} />
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
    paddingTop: 60,
    alignItems: 'center',
    position: 'relative', 
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  card: {
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  image: {
    width: 280,
    height: 280,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  focusTitle: {
    marginBottom: 24,
    alignSelf: 'left',
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
    flexWrap: 'wrap',
    alignSelf: 'left',
  },
  tag: {
    backgroundColor: '#EFE6FF',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 8,
    color: theme.colors.darkBlue,
  },
  description: {
    marginBottom: 24,
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
    marginTop: -24,
    marginBottom: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  button: {
    width: width - 32,
    alignSelf: 'center',
    marginBottom: 40,
  },
});

