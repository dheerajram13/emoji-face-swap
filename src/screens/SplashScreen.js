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
import { theme } from '../assets/styles/theme';

const { width, height } = Dimensions.get('window');

const FloatingEmoji = ({ emoji, top, left, delay, size }) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 4000 + Math.random() * 3000,
            delay: delay * 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 4000 + Math.random() * 3000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startAnimation();
  }, []);

  const translateY = animation.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: [0, -15, 0, 15, 0],
  });

  const rotate = animation.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ['0deg', '5deg', '0deg', '-5deg', '0deg'],
  });

  return (
    <Animated.View
      style={[
        styles.floatingEmoji,
        {
          top: `${top}`,
          left: `${left}`,
          transform: [{ translateY }, { rotate }],
        },
      ]}
    >
      <Text style={[styles.emojiText, { fontSize: size === 'text-2xl' ? 24 : 20 }]}>
        {emoji}
      </Text>
    </Animated.View>
  );
};

const SplashScreen = ({ onFinish }) => {
  const [bounceAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.95));

  useEffect(() => {
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

    // Auto navigate after 3.5 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  const translateY = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const floatingEmojis = [
    { id: 1, emoji: '😀', top: '10%', left: '15%', delay: 0, size: 'text-xl' },
    { id: 2, emoji: '😍', top: '25%', left: '80%', delay: 0.5, size: 'text-2xl' },
    { id: 3, emoji: '🤣', top: '70%', left: '20%', delay: 1, size: 'text-xl' },
    { id: 4, emoji: '😎', top: '85%', left: '75%', delay: 1.5, size: 'text-2xl' },
    { id: 5, emoji: '🥳', top: '40%', left: '10%', delay: 2, size: 'text-xl' },
    { id: 6, emoji: '😇', top: '55%', left: '85%', delay: 2.5, size: 'text-2xl' },
    { id: 7, emoji: '🤩', top: '15%', left: '60%', delay: 3, size: 'text-xl' },
    { id: 8, emoji: '😜', top: '65%', left: '40%', delay: 3.5, size: 'text-2xl' },
  ];

  return (
    <LinearGradient
      colors={['#ffde59', '#ff7eb3', '#7ec8e3']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {floatingEmojis.map((item) => (
        <FloatingEmoji key={item.id} {...item} />
      ))}

      <View style={styles.content}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <View style={styles.logoWrapper}>
            <Image
              source={{
                uri: 'https://readdy.ai/api/search-image?query=A%20modern%20app%20logo%20design%20showing%20a%20smooth%20transition%20between%20a%20yellow%20smiley%20emoji%20face%20and%20a%20human%20face%20silhouette%2C%20digital%20art%20style%2C%20gradient%20background%2C%20centered%20composition%2C%20high%20quality%2C%20minimalist%20design%2C%20professional%20app%20icon&width=400&height=400&seq=emoji-face-1&orientation=squarish',
              }}
              style={styles.logo}
              resizeMode="cover"
            />
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.titleContainer,
            {
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.title}>Emoji</Text>
          <Text style={styles.title}>Face Swap</Text>
        </Animated.View>
      </View>
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
  },
  floatingEmoji: {
    position: 'absolute',
  },
  emojiText: {
    fontSize: 24,
  },
  logoContainer: {
    width: 192,
    height: 192,
    backgroundColor: theme.colors.white,
    borderRadius: 96,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    width: 160,
    height: 160,
    borderRadius: 80,
    overflow: 'hidden',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: theme.colors.white,
    letterSpacing: 1,
  },
});

export default SplashScreen; 