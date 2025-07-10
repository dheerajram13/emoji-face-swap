import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  Dimensions,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { tokens } from '../design/tokens';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.7;
const CARD_HEIGHT = CARD_WIDTH * 1.4;

const HomeScreen = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recentSwaps, setRecentSwaps] = useState([]);
  const [popularStyles, setPopularStyles] = useState([]);

  // Mock data load function
  const loadData = async () => {
    setRefreshing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockSwaps = [
        { id: '1', image: 'https://picsum.photos/300/400?random=1', time: 'Just now' },
        { id: '2', image: 'https://picsum.photos/300/400?random=2', time: '2 hours ago' },
        { id: '3', image: 'https://picsum.photos/300/400?random=3', time: 'Yesterday' },
      ];
      
      const mockStyles = [
        { id: '1', emoji: '😎', name: 'Cool Dude', image: 'https://picsum.photos/200/200?random=10' },
        { id: '2', emoji: '🤩', name: 'Star Struck', image: 'https://picsum.photos/200/200?random=11' },
        { id: '3', emoji: '😍', name: 'Loving It', image: 'https://picsum.photos/200/200?random=12' },
        { id: '4', emoji: '🤪', name: 'Silly Face', image: 'https://picsum.photos/200/200?random=13' },
      ];
      
      setRecentSwaps(mockSwaps);
      setPopularStyles(mockStyles);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    loadData();
  };

  const navigateToCamera = () => {
    navigation.navigate('Camera');
  };

  const navigateToStyles = () => {
    navigation.navigate('EmojiStyles');
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={[colors.primary]}
          tintColor={colors.primary}
        />
      }
    >
      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <Text style={[styles.heroTitle, { color: colors.text }]}>
          Transform Your Face
        </Text>
        <Text style={[styles.heroSubtitle, { color: colors.text }]}>
          Into your favorite emoji with AI magic!
        </Text>
        
        <Button 
          onPress={navigateToCamera}
          variant="primary"
          size="lg"
          style={styles.ctaButton}
          icon="camera"
        >
          Try It Now
        </Button>
      </View>

      {/* Recent Swaps */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Recent Swaps
          </Text>
          <TouchableOpacity>
            <Text style={[styles.seeAll, { color: colors.primary }]}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.swapsContainer}
        >
          {recentSwaps.length > 0 ? (
            recentSwaps.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.swapCard}
                onPress={() => navigation.navigate('Create', { image: item.image })}
              >
                <Image 
                  source={{ uri: item.image }} 
                  style={styles.swapImage} 
                  resizeMode="cover"
                />
                <View style={styles.timeBadge}>
                  <Text style={styles.timeText}>{item.time}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="images-outline" size={48} color={colors.grayLight} />
              <Text style={[styles.emptyText, { color: colors.gray }]}>
                No recent swaps yet
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      {/* Popular Styles */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Popular Styles
          </Text>
          <TouchableOpacity onPress={navigateToStyles}>
            <Text style={[styles.seeAll, { color: colors.primary }]}>
              See All
            </Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.stylesContainer}
        >
          {popularStyles.map((style) => (
            <TouchableOpacity 
              key={style.id} 
              style={styles.styleCard}
              onPress={() => navigation.navigate('Create', { style })}
            >
              <View style={[styles.emojiContainer, { backgroundColor: colors.card }]}>
                <Text style={styles.emojiText}>{style.emoji}</Text>
              </View>
              <Text style={[styles.styleName, { color: colors.text }]} numberOfLines={1}>
                {style.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* How It Works */}
      <View style={[styles.howItWorks, { backgroundColor: colors.card }]}>
        <Text style={[styles.howItWorksTitle, { color: colors.text }]}>
          How It Works
        </Text>
        
        <View style={styles.stepsContainer}>
          {[
            { icon: 'camera', text: 'Take a photo or choose from gallery' },
            { icon: 'happy', text: 'Select your favorite emoji style' },
            { icon: 'share-social', text: 'Share with friends and family' },
          ].map((step, index) => (
            <View key={index} style={styles.step}>
              <View style={[styles.stepIcon, { backgroundColor: colors.primaryLight }]}>
                <Ionicons 
                  name={step.icon} 
                  size={24} 
                  color={colors.primary} 
                />
              </View>
              <Text style={[styles.stepText, { color: colors.text }]}>
                {step.text}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Layout
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // Hero Section
  heroContainer: {
    padding: tokens.spacing.xl,
    paddingTop: tokens.spacing.xxl,
    paddingBottom: tokens.spacing.xxl,
    alignItems: 'center',
  },
  heroTitle: {
    ...tokens.fonts.displayLg,
    fontWeight: '700',
    marginBottom: tokens.spacing.sm,
    textAlign: 'center',
  },
  heroSubtitle: {
    ...tokens.fonts.bodyLg,
    marginBottom: tokens.spacing.xl,
    textAlign: 'center',
    opacity: 0.8,
  },
  ctaButton: {
    width: '100%',
    maxWidth: 280,
  },
  
  // Sections
  section: {
    marginBottom: tokens.spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: tokens.spacing.md,
    paddingHorizontal: tokens.spacing.lg,
  },
  sectionTitle: {
    ...tokens.fonts.heading,
    fontWeight: '700',
  },
  seeAll: {
    ...tokens.fonts.bodySm,
    fontWeight: '600',
  },
  
  // Recent Swaps
  swapsContainer: {
    paddingHorizontal: tokens.spacing.lg - 8,
  },
  swapCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: tokens.radius.lg,
    marginRight: tokens.spacing.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  swapImage: {
    width: '100%',
    height: '100%',
    borderRadius: tokens.radius.lg,
  },
  timeBadge: {
    position: 'absolute',
    bottom: tokens.spacing.md,
    left: tokens.spacing.md,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: tokens.spacing.sm,
    paddingVertical: 4,
    borderRadius: tokens.radius.full,
  },
  timeText: {
    ...tokens.fonts.caption,
    color: tokens.colors.white,
  },
  emptyState: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: tokens.colors.grayLightest,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.lg,
  },
  emptyText: {
    ...tokens.fonts.body,
    marginTop: tokens.spacing.md,
    textAlign: 'center',
  },
  
  // Popular Styles
  stylesContainer: {
    paddingHorizontal: tokens.spacing.lg - 8,
  },
  styleCard: {
    width: 100,
    marginRight: tokens.spacing.lg,
    alignItems: 'center',
  },
  emojiContainer: {
    width: 80,
    height: 80,
    borderRadius: tokens.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: tokens.spacing.sm,
  },
  emojiText: {
    fontSize: 32,
    lineHeight: 40,
  },
  styleName: {
    ...tokens.fonts.bodySm,
    textAlign: 'center',
  },
  
  // How It Works
  howItWorks: {
    marginTop: tokens.spacing.xl,
    padding: tokens.spacing.xl,
    borderTopLeftRadius: tokens.radius.xl,
    borderTopRightRadius: tokens.radius.xl,
  },
  howItWorksTitle: {
    ...tokens.fonts.heading,
    fontWeight: '700',
    marginBottom: tokens.spacing.xl,
    textAlign: 'center',
  },
  stepsContainer: {
    marginTop: tokens.spacing.lg,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: tokens.spacing.xl,
  },
  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: tokens.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: tokens.spacing.lg,
  },
  stepText: {
    ...tokens.fonts.body,
    flex: 1,
  },
});

export default HomeScreen;
