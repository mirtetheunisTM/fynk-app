import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../theme';

const API_URL = "https://fynk-backend.onrender.com/auth/login";

export default function LoginScreen() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        setErrorMessage(''); // Clear previous errors

        if (!email || !password) {
            setErrorMessage("Please enter both email and password.");
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.token) {
                await AsyncStorage.setItem("authToken", data.token);
                navigation.replace("MainTabs");
            } else {
                setErrorMessage("Invalid email or password.");
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <LinearGradient
          colors={['rgba(252,252,252,0)', '#FCFCFC', '#C4CFFF', '#9C80FF']}
          locations={[0, 0.6, 0.9, 1]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradientBackground}
        />

      {/* Section 1: Logo + Heading */}
      <View style={styles.section1}>
        <Image source={require('../assets/images/SecondaryLogo.png')} style={styles.logo} />
        <View style={{ flex: 1 }}>
          <Text style={[theme.fonts.h2, { flexWrap: 'wrap' }]}>
            Welcome back! Glad to see you again!
          </Text>
        </View>
      </View>

      {/* Error Message */}
      {errorMessage ? 
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View> : null}

      {/* Section 2: Input Fields */}
      <View style={styles.section2}>
        <FormInput placeholder="Email" value={email} onChangeText={setEmail}/>
        <FormInput placeholder="Password" value={password} onChangeText={setPassword} isPassword={true} />
      </View>

      {/* Section 3: Forgot Password */}
      <View style={styles.section3}>
        <TouchableOpacity>
          <Text style={[theme.fonts.ctaSec, { textAlign: 'right' }]}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      {/* Section 4: Login Button */}
      <View style={styles.section4}>
        <PrimaryButton title="Login" onPress={handleLogin}/>
      </View>

      {/* Section 5: Or Login With */}
      <View style={styles.section5}>
        {/* Section 6: Divider */}
        <View style={styles.section6}>
          <View style={styles.line} />
          <Text style={theme.fonts.body}>Or login with</Text>
          <View style={styles.line} />
        </View>

        {/* Section 7: Socials */}
        <View style={styles.section7}>
          <View style={styles.socialSquare}><Image source={require('../assets/images/facebook.png')} style={styles.socialIcon} /></View>
          <View style={styles.socialSquare}><Image source={require('../assets/images/google.png')} style={styles.socialIcon} /></View>
          <View style={styles.socialSquare}><Image source={require('../assets/images/apple.png')} style={styles.socialIcon} /></View>
        </View>
      </View>

      {/* Section 8: Register Text */}
      <View style={styles.section8}>
        <Text style={theme.fonts.body}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={theme.fonts.ctaSec}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
    zIndex: 0,
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral,
    position: 'relative',
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  errorContainer: {
    marginBottom: 20,
    padding: 8,
    backgroundColor: theme.colors.red,
    borderRadius: 8,
  },
  errorText: {
    color: theme.colors.darkBlue,
    textAlign: 'left',
    maringLeft: 8, 
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
    marginVertical: 16,
  },
  section4: {
    marginBottom: 16,
    marginTop: 'auto',
  },
  section5: {
    marginVertical: 22,
  },
  section6: {
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
  section7: {
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
  section8: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 'auto',
  },
});
