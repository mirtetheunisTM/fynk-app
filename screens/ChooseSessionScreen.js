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
    tags: ['Recommended', 'Timer', 'Pomodoro'],
    description:
      'Work for 25 minutes, break for 5. Rinse and repeat until you finally finish something. Perfect for people who can’t focus longer than a goldfish.',
  },
  {
    id: '2',
    image: require('../assets/images/mascottes/monkmode.png'), 
    title: 'Monk Mode',
    tags: ['Timer', 'Deepwork'],
    description:
      '90 minutes of work, 20 minutes break.Longer block to get into zen mode/flow state. Medium active break to reset.',
  },
];

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
      <Text style={[theme.fonts.h1, styles.title]}>
        Choose your FocusMode
      </Text>

      <FlatList
        data={focusModes}
        horizontal
        pagingEnabled
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

      {/* Pagination Dots */}
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
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral,
    paddingTop: 60,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    marginBottom: 32,
    textAlign: 'center',
  },
  card: {
    width: width - 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  focusTitle: {
    marginBottom: 12,
    textAlign: 'center',
  },
  tags: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tag: {
    backgroundColor: '#EFE6FF',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 12,
    color: theme.colors.darkBlue,
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  button: {
    alignSelf: 'stretch',
    marginBottom: 40,
  },
});

