/* Input values:
    value: string = value of the input ({name}, {email}, {password})
    onChangeText: function = function to be called when the input is changed
    placeholder: string = placeholder text of the input
    isPassword: boolean = whether or not the input is a password
    keyboardType: string = keyboard type of the input
    autoCapitalize: string = auto capitalize of the input
*/

import { useEffect, useState } from 'react';
import { Animated, StyleSheet, TextInput, View } from 'react-native';
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
  const [animatedLabel] = useState(new Animated.Value(value ? 1 : 0));

  /* Make the effect that the label goes to the top of the input field when focused or when a value is entered. */

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused,value]);

  const labelStyle = {
    position: 'absolute',
    left: 16,
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [14, -7], 
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12], 
    }),
    color: isFocused ? theme.colors.darkBlue : '#727480',
    fontFamily: theme.fonts.body.fontFamily,
    backgroundColor: theme.colors.creme,
    paddingHorizontal: 4,
  };

  return (
    <View style={[styles.wrapper, isFocused && styles.focused]}>
      <Animated.Text style={labelStyle} pointerEvents="none">{placeholder}</Animated.Text>
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

