import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FormInput from '../components/FormInput';
import PrimaryButton from '../components/PrimaryButton';
import theme from '../theme';

const API_URL = "https://fynk-backend.onrender.com/auth/signup";

export default function RegisterScreen() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async () => {
    setErrorMessage('');

    if (!name || !email || !password || password !== confirmPassword) {
      setErrorMessage("Please fill in all the fields correctly.");
      return;
    }

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      console.log("Token uit backend:", data.data?.token); // <-- voeg deze regel toe

      if (response.ok && data.data?.token) {
        await AsyncStorage.setItem("authToken", data.data.token); // <-- juiste pad!
        navigation.replace("MainTabs"); // of "Onboarding"
      } else {
        setErrorMessage(data.message || "Registratie mislukt.");
      }
    } catch (error) {
      setErrorMessage("Er is iets misgegaan: " + error.message);
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
            Hello! Register to get started!
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
        <FormInput placeholder="Name" value={name} onChangeText={setName}/>
        <FormInput placeholder="Password" value={password} onChangeText={setPassword} isPassword={true} />
        <FormInput placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} isPassword={true} />
      </View>

      {/* Section 3: Register Button */}
      <View style={styles.section3}>
        <PrimaryButton title="Register" onPress={handleRegister}/>
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
          <Text style={theme.fonts.ctaSec}>Login</Text>
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
});
