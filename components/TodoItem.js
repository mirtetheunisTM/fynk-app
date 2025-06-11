import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';

export default function TodoItem({ text, category }) {
  const [completed, setCompleted] = useState(false);

  const backgroundColor = {
    "deadline drama": theme.colors.pink,
    "future me problem": theme.colors.lightPurple,
    "duick fix": theme.colors.lila,
    "nice, not necessary": theme.colors.creme,
  }[category] || theme.colors.neutral;

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Pressable onPress={() => setCompleted(!completed)}>
        <View style={[styles.circle, completed && styles.circleCompleted]}>
          {completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </Pressable>
      <View style={styles.textWrapper}>
        <Text style={[theme.fonts.body]}>
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: theme.colors.lila,
    backgroundColor: 'transparent',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleCompleted: {
    backgroundColor: theme.colors.lila,
  },
  checkmark: {
    color: theme.colors.darkBlue,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  textWrapper: {
    position: 'relative',
  },
});
