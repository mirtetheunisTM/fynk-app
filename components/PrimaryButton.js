/* Input values:
  title: string = title of the button
  onPress: function = function to be called when the button is pressed
*/

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
    width: '100%',
    height: 48,
    alignSelf: 'stretch',
  },

  pressed: {
    backgroundColor: theme.colors.primaryPurple,
  },
});
