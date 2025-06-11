import { FontAwesome } from '@expo/vector-icons'; // for filled/unfilled stars
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import theme from '../theme';

export default function ImportanceRating({ value = 0, onChange }) {
  const [rating, setRating] = useState(value);

  const handlePress = (index) => {
    const newRating = index + 1;
    setRating(newRating);
    if (onChange) onChange(newRating);
  };

  return (
    <View style={styles.container}>
      {[0, 1, 2, 3].map((index) => {
        const filled = rating > index;
        return (
          <TouchableOpacity key={index} onPress={() => handlePress(index)}>
            <FontAwesome
              name={filled ? 'star' : 'star-o'}
              size={28}
              color={theme.colors.primaryPurple}
              style={styles.star}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  star: {
    padding: 2,
  },
});
