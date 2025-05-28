import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';

export default function TodoItem({ text }) {
    const [completed, setCompleted] = useState(false);

    return (
        <View style={styles.container}>
        <Pressable onPress={() => setCompleted(!completed)}>
            <View style={[styles.circle, completed && styles.circleCompleted]}>
            {completed && <Text style={styles.checkmark}>✓</Text>}
            </View>
        </Pressable>
        <Text style={[theme.fonts.body, completed && styles.textCompleted]}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.neutral,
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
  textCompleted: {
    color: '#1C2133B3',
    textDecorationLine: 'line-through',
  },
});
