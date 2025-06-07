import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../theme';

export default function RegisterScreen() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <View style={styles.container}>
      {/* Section 1: Logo + Heading */}
      <View style={styles.section1}>
        <Image source={require('../assets/images/SecondaryLogo.png')} style={styles.logo} />
        <Text style={theme.fonts.h2}>Hello! Register to get started!</Text>
      </View>

      {/* Section 2: Input Fields */}
      <View style={styles.section2}>
        <FormInput placeholder="Email" value={email} onChangeText={setEmail}/>
        <FormInput placeholder="Name" value={name} onChangeText={setName}/>
        <FormInput placeholder="Password" value={password} onChangeText={setPassword} isPassword={true} />
        <FormInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} isPassword={true} />
      </View>

      {/* Section 3: Register Button */}
      <View style={styles.section3}>
        <PrimaryButton title="Register" />
      </View>

      {/* Section 4: Or Register With */}
      <View style={styles.section4}>
        {/* Section 5: Divider */}
        <View style={styles.section5}>
          <View style={styles.line} />
          <Text style={theme.fonts.body}>Or login with</Text>
          <View style={styles.line} />
        </View>

        {/* Section 6: Socials */}
        <View style={styles.section6}>
          <View style={styles.socialSquare}><Image source={require('../assets/images/facebook.png')} style={styles.socialIcon} /></View>
          <View style={styles.socialSquare}><Image source={require('../assets/images/google.png')} style={styles.socialIcon} /></View>
          <View style={styles.socialSquare}><Image source={require('../assets/images/apple.png')} style={styles.socialIcon} /></View>
        </View>
      </View>

      {/* Section 7: Login Text */}
      <View style={styles.section7}>
        <Text style={theme.fonts.body}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={[theme.fonts.ctaSec, { lineHeight: 1.25 }]}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  section1: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  logo: {
    width: 64,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  section2: {
    gap: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
  },
  section3: {
    marginBottom: 16,
    marginTop: 'auto',
  },
  section4: {
    marginVertical: 22,
  },
  section5: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 22,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.darkBlue,
  },
  section6: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  socialSquare: {
    width: 58,
    height: 56,
    backgroundColor: theme.colors.neutral,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  section7: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 'auto',
  },
});
