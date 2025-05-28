import { Pressable, StyleSheet, Text } from 'react-native';
import theme from '../theme';

export default function PrimaryButton({ title, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.btn,
        pressed && styles.pressed,
      ]}
    >
      <Text style={theme.fonts.ctaPrim}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: theme.colors.darkBlue,
    paddingVertical: 14,
    borderRadius: 16,
    width: 350,
    height: 48,
  },

  pressed: {
    backgroundColor: theme.colors.primaryPurple,
  },
});
