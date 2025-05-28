/* Input values:
    value: string = value of the input (keep empty)
    onChangeText: function = function to be called when the input is changed
    placeholder: string = placeholder text of the input
    isPassword: boolean = whether or not the input is a password
    keyboardType: string = keyboard type of the input
    autoCapitalize: string = auto capitalize of the input
*/

import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import theme from '../theme';

export default function FormInput({
  value,
  onChangeText,
  placeholder,
  isPassword = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.wrapper, isFocused && styles.focused]}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#727480"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isPassword}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        underlineColorAndroid="transparent"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: theme.colors.creme,
    borderRadius: 16,
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  focused: {
    borderColor: theme.colors.darkBlue,
  },
  input: {
    fontSize: theme.fonts.body.fontSize,
    fontFamily: theme.fonts.body.fontFamily,
    lineHeight: theme.fonts.body.lineHeight,
    color: theme.colors.darkBlue,
    borderWidth: 0,
    borderColor: 'transparent',
    outlineStyle: 'none',
  },
});
