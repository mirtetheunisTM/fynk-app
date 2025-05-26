import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import theme from '../theme';

export default function SecondaryButton({ title, onPress }) {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
      <Text style={theme.fonts.ctaSec}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: theme.colors.darkBlue,
    paddingVertical: 12,
    borderRadius: 16,
    width: 350,
    height: 48,
  },
});
