import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, View, } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../theme';

const { width } = Dimensions.get('window');

const focusModes = [
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
    image: require('../assets/images/mascottes/beastmode.png'), 
    title: 'Beast Mode',
    tags: ['Taskbased', 'Eat the frog'],
    description:
      'Do the hardest, most annoying task first. Stop crying about it. Rip the Band-Aid off and move on with your life.',
  },
  {
    id: '5',
    image: require('../assets/images/mascottes/workhardchillharder.png'), 
    title: 'Work Hard, Chill Harder',
    tags: ['Timer', 'Habit-forming'],
    description:
      'Work for 30 minutes, followed by a well-deserved 30-minute break. Done is better than perfect. At least you’re doing something.',
  },
  {
    id: '6',
    image: require('../assets/images/mascottes/figureitout.png'), 
    title: 'Figure It Out',
    tags: ['Timer', 'Custom'],
    description:
      'Pick your own focus time and breaks. Want a 5-minute work session with a 3-hour break? Go ahead. See where that gets you.',
  },
];

const getTagStyle = (tag, idx) => {
  if (tag.toLowerCase() === 'recommended') {
    return { backgroundColor: theme.colors.lila };
  }
  if (idx === 0) return { backgroundColor: theme.colors.pink };
  if (idx === 1) return { backgroundColor: theme.colors.primaryPurple };
  return { backgroundColor: theme.colors.lightPurple };
};

export default function ChooseSessionScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();

  const viewConfigRef = useRef({ itemVisiblePercentThreshold: 50 }).current;

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

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
      keyExtractor={(item) => item.id}
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

    <PrimaryButton title="Next step" onPress={() => {}} style={styles.button} />
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

