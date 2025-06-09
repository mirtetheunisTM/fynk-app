import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import theme from '../theme';

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.touchArea}>
        <Feather name="chevron-left" size={24} color={theme.colors.darkBlue} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 10, // ensure it's on top
  },
  touchArea: {
    padding: 8, // increases touchable area
    alignItems: 'center',
    justifyContent: 'center',
  },
});
