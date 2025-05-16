import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ onFinish }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [bounceAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.95));

  useEffect(() => {
    // Loading progress animation
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          onFinish();
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    // Bounce animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Scale animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    return () => {
      clearInterval(timer);
    };
  }, []);

  const translateY = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  return (
    <LinearGradient
      colors={['#ffde59', '#ff7eb3', '#7ec8e3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Decorative Bubbles */}
      <View style={[styles.bubble, { left: '20%', top: '20%' }]}>
        <LinearGradient
          colors={['#fff79a', '#fff3e0']}
          style={styles.bubbleInner}
        />
      </View>
      <View style={[styles.bubble, { right: '20%', top: '40%' }]}>
        <LinearGradient
          colors={['#e1bee7', '#f3e5f5']}
          style={styles.bubbleInner}
        />
      </View>
      <View style={[styles.bubble, { bottom: '20%', left: '40%' }]}>
        <LinearGradient
          colors={['#fff3e0', '#e1bee7']}
          style={styles.bubbleInner}
        />
      </View>

      <View style={styles.content}>
        {/* Logo */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={styles.logoWrapper}>
            <LinearGradient
              colors={['#ffde59', '#ff7eb3', '#7ec8e3']}
              style={styles.logoGradient}
            >
              <View style={styles.logoInner}>
                <Image
                  source={{
                    uri: 'https://readdy.ai/api/search-image?query=A%20modern%20app%20logo%20design%20showing%20a%20smooth%20transition%20between%20a%20yellow%20smiley%20emoji%20face%20and%20a%20human%20face%20silhouette%2C%20digital%20art%20style%2C%20gradient%20background%2C%20centered%20composition%2C%20high%20quality%2C%20minimalist%20design%2C%20professional%20app%20icon&width=400&height=400&seq=emoji-face-1&orientation=squarish',
                  }}
                  style={styles.logo}
                  resizeMode="cover"
                />
              </View>
            </LinearGradient>
          </View>
        </Animated.View>

        {/* App Name */}
        <Animated.View
          style={[
            styles.titleContainer,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.title}>EmojiLife</Text>
          <Text style={styles.tagline}>Bringing emoji expressions to life</Text>
        </Animated.View>

        {/* Loading Indicator */}
        <View style={styles.loadingContainer}>
          <Animated.View
            style={[
              styles.loadingIndicator,
              {
                transform: [{ rotate: bounceAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg']
                }) }],
              },
            ]}
          >
            <LinearGradient
              colors={['#ff7eb3', '#7ec8e3', '#ffde59']}
              style={styles.loadingIndicatorInner}
            />
          </Animated.View>
          <Text style={styles.loadingText}>
            {loadingProgress}%
          </Text>
        </View>
      </View>

      {/* iPhone Home Indicator */}
      <View style={styles.homeIndicator} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  bubble: {
    position: 'absolute',
    borderRadius: 100,
    opacity: 0.6,
  },
  bubbleInner: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  logoContainer: {
    width: 192,
    height: 192,
    marginBottom: 32,
    backgroundColor: 'white',
    borderRadius: 96,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    width: 160,
    height: 160,
    borderRadius: 80,
    overflow: 'hidden',
  },
  logoGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 80,
  },
  logoInner: {
    width: '100%',
    height: '100%',
    borderRadius: 80,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  loadingContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 4,
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderTopColor: '#ff7eb3',
    borderLeftColor: '#7ec8e3',
    animation: 'spin 2s linear infinite',
  },
  loadingIndicator: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  homeIndicator: {
    width: 128,
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    marginBottom: 20,
  }
});

export default SplashScreen;