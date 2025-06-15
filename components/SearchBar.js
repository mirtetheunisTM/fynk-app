import { useState } from 'react';
import { Image, StyleSheet, TextInput, View } from 'react-native';
import theme from '../theme';

export default function SearchBar({ onChangeText }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangeText = (text) => {
    setSearchQuery(text);
    if (onChangeText) {
      onChangeText(text);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/search.png')}
        style={styles.icon}
        resizeMode="contain"
      />
      <TextInput
        style={styles.input}
        placeholder="Search"
        placeholderTextColor="rgba(28, 33, 51, 0.6)"
        value={searchQuery}
        onChangeText={handleChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.creme,
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '100%',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.darkBlue,
  },
});
