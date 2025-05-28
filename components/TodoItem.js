import { StyleSheet, Text, View } from 'react-native';
import theme from '../theme';

export default function TodoItem({ text }) {
  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <Text style={theme.fonts.body}>{text}</Text>
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
  },
});
