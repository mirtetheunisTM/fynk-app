import { useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../theme';

export default function Like() {
  const [liked, setLiked] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    if (liked === false) {
        Animated.sequence([
        Animated.timing(scale, {
            toValue: 1.3,
            duration: 500,
            useNativeDriver: true,
        }),
        Animated.timing(scale, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }),
        ]).start();
    }

    setLiked(!liked);
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Animated.View style={[styles.iconWrapper, { transform: [{ scale }] }]}>
        <Icon
          name="heart"
          size={28}
          color={liked ? theme.colors.primaryPurple : theme.colors.lightPurple}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    alignSelf: 'center',    
    justifyContent: 'center', 
    alignItems: 'center',
  },
});
