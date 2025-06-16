// components/OverlayLoader.js
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Animated, Easing, Modal, StyleSheet, View } from 'react-native';

export default function OverlayLoader({ visible = false }) {
  const scaleValue = new Animated.Value(1);

  React.useEffect(() => {
    if (visible) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue, {
            toValue: 1.1,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleValue, {
            toValue: 1,
            duration: 700,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scaleValue.setValue(1);
    }
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="fade">
        <View style={styles.overlayContainer}>
            <LinearGradient
            colors={['#F0B9FF', '#F0B9FF', '#C4CFFF', '#C4CFFF', '#9CB0FF']}
            locations={[0.02, 0.18, 0.41, 0.63, 0.83]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientOverlay}
            />
            <Animated.Image
            source={require('../assets/images/SecondaryLogo.png')}
            style={[styles.logo, { transform: [{ scale: scaleValue }] }]}
            resizeMode="contain"
            />
        </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlayContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.2,
    zIndex: 0,
  },
  logo: {
    width: 100,
    height: 100,
    zIndex: 1,
  },
});

