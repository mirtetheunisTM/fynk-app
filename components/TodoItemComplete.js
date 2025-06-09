/* Adds a checkmark when clicked and a animated line trough the text 
Input:
  text: string = text of the todo item*/

import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';

export default function TodoItemComplete({ text }) {
    // Adds a checkmark when clicked and a animated line trough the text

    const [completed, setCompleted] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animation, {
        toValue: completed ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
        }).start();
    }, [completed]);

    const scaleX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1], 
    });

    const translateX = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [24, 0], 
    });

    return (
        <View style={styles.container}>
        <Pressable onPress={() => setCompleted(!completed)}>
            <View style={[styles.circle, completed && styles.circleCompleted]}>
            {completed && <Text style={styles.checkmark}>✓</Text>}
            </View>
        </Pressable>
        <View style={styles.textWrapper}>
            <Text style={[theme.fonts.body, completed && styles.textCompleted]}>{text}</Text>
            <Animated.View
            style={[
                styles.strikeThrough,
                {
                transform: [{ scaleX }, { translateX }],
                opacity: animation,
                },
            ]}
            />
        </View>
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
  textWrapper: {
    position: 'relative',
  },
  textCompleted: {
    color: '#1C2133B3',
  },
  strikeThrough: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#1C2133B3',
    top: '50%',
    left: 0,
    right: 0,
  },
});
