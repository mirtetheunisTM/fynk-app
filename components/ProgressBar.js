/* Input values:
    progress: number = progress of the progress bar (0-1)
*/

import { StyleSheet, View } from 'react-native';
import theme from '../theme';

const ProgressBar = ({ progress }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 3,
    width: '100%',
    backgroundColor: '#E8ECED',
    borderRadius: 32,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.primaryPurple,
    borderRadius: 32,
  },
});

export default ProgressBar;
