import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }) => {
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);
  const floatAnim = new Animated.Value(0);

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Scale animation
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start();

    // Floating animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Navigate to main screen after 3 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const floatingEmojis = ['😊', '🎭', '✨', '🌟', '🎨'];

  return (
    <View style={styles.container}>
      {/* Background gradient */}
      <View style={styles.background} />

      {/* Floating emojis */}
      {floatingEmojis.map((emoji, index) => (
        <Animated.Text
          key={index}
          style={[
            styles.floatingEmoji,
            {
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: [
                {
                  translateY: floatAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -20],
                  }),
                },
              ],
              opacity: fadeAnim,
            },
          ]}
        >
          {emoji}
        </Animated.Text>
      ))}

      {/* Main content */}
      <Animated.View
        style={[
          styles.contentContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.emojiLogo}>😊</Text>
          <Text style={styles.arrow}>↔️</Text>
          <Text style={styles.faceLogo}>👤</Text>
        </View>
        <Text style={styles.title}>Emoji Face Swap</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#f0f0f0',
    opacity: 0.8,
  },
  contentContainer: {
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  emojiLogo: {
    fontSize: 60,
  },
  arrow: {
    fontSize: 40,
    marginHorizontal: 10,
  },
  faceLogo: {
    fontSize: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  floatingEmoji: {
    position: 'absolute',
    fontSize: 24,
    opacity: 0.6,
  },
});

export default SplashScreen; 