import { useNavigation } from '@react-navigation/native';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';
import SecondaryButton from '../components/SecondaryButton';
import theme from '../theme';

export default function IntroScreen() {
  const navigation = useNavigation();

  return (
    <ImageBackground
        source={require('../assets/images/gradient.png')}
        resizeMode="cover"
        style={{ flex: 1 }}>
        <View style={styles.container}>
        {/* Section 1: Logo + H2 */}
        <View style={styles.section}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo} />
            <Text style={[theme.fonts.h2, { textAlign: 'center' }]}>Own your day. Simplified focus and productivity.</Text>
        </View>

        {/* Section 2: Buttons */}
        <View style={styles.section}>
            <View style={styles.buttonSpacing}>
            <PrimaryButton title="Continue with e-mail"
                onPress={() => navigation.navigate('RegisterScreen')} />
            </View>
            <SecondaryButton title="Register with Apple" />
        </View>

        {/* Section 3: Text Row */}
        <View style={[styles.section, styles.textRow]}>
            <Text style={theme.fonts.body}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={theme.fonts.ctaSec}>Log in</Text>
            </TouchableOpacity>
        </View>
        </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 204,
    justifyContent: 'space-between',
  },
  section: {
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    width: 100,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 32,
  },
  buttonSpacing: {
    marginBottom: 16,
    width: '100%',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 0, // Last section, no extra margin
  },
});
