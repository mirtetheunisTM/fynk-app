import { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';
import theme from '../theme';

export default function ToggleExample() {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: theme.colors.lila, true: theme.colors.lightPurple }}
        thumbColor={isEnabled ? theme.colors.primaryPurple: theme.colors.lightPurple}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});
