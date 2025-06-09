import { Image, StyleSheet, Text, View } from 'react-native';
import theme from '../theme';

export default function SearchBar() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/search.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <Text style={[theme.fonts.body, styles.placeholder]}>Search</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.creme,
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignSelf: 'left',
    width: '100%',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  placeholder: {
    color: 'rgba(28, 33, 51, 0.6)',
    flex: 1,
  },
});
