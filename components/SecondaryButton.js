/* Input values:
  title: string = title of the button
  onPress: function = function to be called when the button is pressed
*/

import { Pressable, StyleSheet, Text } from 'react-native';
import theme from '../theme';

export default function SecondaryButton({ title, onPress, style }) {
  return (
    <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            styles.btn,
            pressed && styles.pressed,
            style
          ]}
        >
          <Text style={theme.fonts.ctaSec}>{title}</Text>
        </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.darkBlue,
    paddingVertical: 12,
    borderRadius: 16,
    height: 48,
    alignSelf: 'stretch',
  },

  pressed: {
      backgroundColor: theme.colors.primaryPurple,
    },
});
