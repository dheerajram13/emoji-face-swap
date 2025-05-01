import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../assets/styles/theme';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('For You');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const storyItems = [
    { id: 1, name: 'New', image: 'https://readdy.ai/api/search-image?query=3D%20cartoon%20avatar%20of%20a%20young%20woman%20with%20short%20blue%20hair%20smiling%20at%20camera%2C%20digital%20art%20style%2C%20vibrant%20colors%2C%20clean%20background%2C%20high%20quality%20render%2C%20centered%20composition%2C%20professional%20lighting%2C%20character%20design&width=100&height=100&seq=story1&orientation=squarish' },
    { id: 2, name: 'Celebrities', image: 'https://readdy.ai/api/search-image?query=3D%20cartoon%20avatar%20of%20a%20male%20celebrity%20with%20stylish%20haircut%20and%20sunglasses%2C%20digital%20art%20style%2C%20vibrant%20colors%2C%20clean%20background%2C%20high%20quality%20render%2C%20centered%20composition%2C%20professional%20lighting%2C%20character%20design&width=100&height=100&seq=story2&orientation=squarish' },
    { id: 3, name: 'Anime', image: 'https://readdy.ai/api/search-image?query=3D%20cartoon%20avatar%20in%20anime%20style%20with%20big%20eyes%20and%20colorful%20hair%2C%20digital%20art%20style%2C%20vibrant%20colors%2C%20clean%20background%2C%20high%20quality%20render%2C%20centered%20composition%2C%20professional%20lighting%2C%20character%20design&width=100&height=100&seq=story3&orientation=squarish' },
    { id: 4, name: 'Fantasy', image: 'https://readdy.ai/api/search-image?query=3D%20cartoon%20avatar%20of%20a%20fantasy%20character%20with%20elf%20ears%20and%20glowing%20eyes%2C%20digital%20art%20style%2C%20vibrant%20colors%2C%20clean%20background%2C%20high%20quality%20render%2C%20centered%20composition%2C%20professional%20lighting%2C%20character%20design&width=100&height=100&seq=story4&orientation=squarish' },
    { id: 5, name: 'Vintage', image: 'https://readdy.ai/api/search-image?query=3D%20cartoon%20avatar%20in%20vintage%20style%20with%20sepia%20tones%20and%20classic%20hairstyle%2C%20digital%20art%20style%2C%20warm%20colors%2C%20clean%20background%2C%20high%20quality%20render%2C%20centered%20composition%2C%20professional%20lighting%2C%20character%20design&width=100&height=100&seq=story5&orientation=squarish' },
    { id: 6, name: 'Superhero', image: 'https://readdy.ai/api/search-image?query=3D%20cartoon%20avatar%20of%20a%20superhero%20character%20with%20mask%20and%20cape%2C%20digital%20art%20style%2C%20vibrant%20colors%2C%20clean%20background%2C%20high%20quality%20render%2C%20centered%20composition%2C%20professional%20lighting%2C%20character%20design&width=100&height=100&seq=story6&orientation=squarish' },
  ];

  const featuredSwap = {
    id: 1,
    image: 'https://readdy.ai/api/search-image?query=Photorealistic%20face%20swap%20of%20a%20woman%20transformed%20into%20a%20fantasy%20character%20with%20glowing%20eyes%20and%20elf%20ears%2C%20high%20quality%20digital%20manipulation%2C%20professional%20retouching%2C%20seamless%20integration%2C%20studio%20lighting%2C%20high%20resolution%20image%2C%20centered%20composition&width=400&height=300&seq=featured1&orientation=landscape',
    creator: 'Emma Wilson',
    likes: 3452,
    comments: 128,
    avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20woman%20with%20blonde%20hair%20and%20blue%20eyes%20smiling%20at%20camera%2C%20neutral%20background%2C%20high%20quality%20portrait%20photography%2C%20soft%20lighting%2C%20centered%20composition&width=50&height=50&seq=avatar1&orientation=squarish',
  };

  const feedPosts = [
    {
      id: 1,
      image: 'https://readdy.ai/api/search-image?query=Face%20swap%20of%20a%20young%20man%20transformed%20into%20a%20cartoon%20character%20with%20exaggerated%20features%2C%20digital%20art%20style%2C%20vibrant%20colors%2C%20clean%20background%2C%20high%20quality%20digital%20manipulation%2C%20centered%20composition&width=180&height=180&seq=post1&orientation=squarish',
      creator: 'James Parker',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20headshot%20of%20a%20young%20man%20with%20dark%20hair%20and%20brown%20eyes%20smiling%20at%20camera%2C%20neutral%20background%2C%20high%20quality%20portrait%20photography%2C%20soft%20lighting%2C%20centered%20composition&width=40&height=40&seq=avatar2&orientation=squarish',
      likes: 1245,
      comments: 87,
      template: 'Cartoon',
    },
    // ... Add more feed posts here
  ];

  const recommendedTemplates = [
    {
      id: 1,
      image: 'https://readdy.ai/api/search-image?query=3D%20cartoon%20template%20for%20face%20swap%20with%20superhero%20features%2C%20digital%20art%20style%2C%20vibrant%20colors%2C%20clean%20background%2C%20high%20quality%20render%2C%20centered%20composition%2C%20professional%20lighting%2C%20character%20design&width=150&height=200&seq=template1&orientation=portrait',
      name: 'Superhero',
      uses: '12.5K',
    },
    // ... Add more templates here
  ];

  const renderStoryItem = ({ item }) => (
    <View style={styles.storyItem}>
      <View style={styles.storyImageContainer}>
        <Image source={{ uri: item.image }} style={styles.storyImage} />
      </View>
      <Text style={styles.storyName} numberOfLines={1}>{item.name}</Text>
    </View>
  );

  const renderFeedPost = ({ item }) => (
    <TouchableOpacity style={styles.feedPost}>
      <View style={styles.feedPostImageContainer}>
        <Image source={{ uri: item.image }} style={styles.feedPostImage} />
        <View style={styles.templateBadge}>
          <Text style={styles.templateBadgeText}>{item.template}</Text>
        </View>
      </View>
      <View style={styles.feedPostContent}>
        <View style={styles.feedPostHeader}>
          <Image source={{ uri: item.avatar }} style={styles.feedPostAvatar} />
          <Text style={styles.feedPostCreator} numberOfLines={1}>{item.creator}</Text>
        </View>
        <View style={styles.feedPostStats}>
          <View style={styles.feedPostStat}>
            <Ionicons name="heart" size={12} color={theme.colors.textSecondary} />
            <Text style={styles.feedPostStatText}>{item.likes.toLocaleString()}</Text>
          </View>
          <View style={styles.feedPostStat}>
            <Ionicons name="chatbubble" size={12} color={theme.colors.textSecondary} />
            <Text style={styles.feedPostStatText}>{item.comments.toLocaleString()}</Text>
          </View>
          <TouchableOpacity style={styles.feedPostMore}>
            <Ionicons name="ellipsis-horizontal" size={16} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTemplateItem = ({ item }) => (
    <TouchableOpacity style={styles.templateItem}>
      <View style={styles.templateImageContainer}>
        <Image source={{ uri: item.image }} style={styles.templateImage} />
      </View>
      <View style={styles.templateInfo}>
        <Text style={styles.templateName}>{item.name}</Text>
        <Text style={styles.templateUses}>{item.uses} uses</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSkeletonLoader = () => (
    <>
      <View style={styles.skeletonStories}>
        {[1, 2, 3, 4, 5].map((item) => (
          <View key={item} style={styles.skeletonStoryItem}>
            <View style={styles.skeletonCircle} />
            <View style={styles.skeletonText} />
          </View>
        ))}
      </View>

      <View style={styles.skeletonFeatured}>
        <View style={styles.skeletonImage} />
        <View style={styles.skeletonTitle} />
        <View style={styles.skeletonSubtitle} />
      </View>

      <View style={styles.skeletonGrid}>
        {[1, 2, 3, 4].map((item) => (
          <View key={item} style={styles.skeletonGridItem}>
            <View style={styles.skeletonImage} />
            <View style={styles.skeletonTitle} />
            <View style={styles.skeletonSubtitle} />
          </View>
        ))}
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleBlue}>FaceSwap</Text>
          <Text style={styles.headerTitlePurple}>AI</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="search" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="notifications" size={24} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {isLoading ? (
          renderSkeletonLoader()
        ) : (
          <>
            {/* Stories */}
            <FlatList
              data={storyItems}
              renderItem={renderStoryItem}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.storiesContainer}
            />

            {/* Featured Swap */}
            <View style={styles.featuredSection}>
              <Text style={styles.sectionTitle}>Featured Swap</Text>
              <View style={styles.featuredCard}>
                <Image source={{ uri: featuredSwap.image }} style={styles.featuredImage} />
                <View style={styles.featuredOverlay}>
                  <View style={styles.featuredInfo}>
                    <Image source={{ uri: featuredSwap.avatar }} style={styles.featuredAvatar} />
                    <View style={styles.featuredCreator}>
                      <Text style={styles.featuredCreatorName}>{featuredSwap.creator}</Text>
                      <View style={styles.featuredStats}>
                        <View style={styles.featuredStat}>
                          <Ionicons name="heart" size={12} color={theme.colors.white} />
                          <Text style={styles.featuredStatText}>{featuredSwap.likes.toLocaleString()}</Text>
                        </View>
                        <View style={styles.featuredStat}>
                          <Ionicons name="chatbubble" size={12} color={theme.colors.white} />
                          <Text style={styles.featuredStatText}>{featuredSwap.comments.toLocaleString()}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* Feed Tabs */}
            <View style={styles.tabsContainer}>
              {['For You', 'Trending', 'Following'].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tab, activeTab === tab && styles.activeTab]}
                  onPress={() => setActiveTab(tab)}
                >
                  <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Feed Grid */}
            <View style={styles.feedGrid}>
              {feedPosts.map((post) => renderFeedPost({ item: post }))}
            </View>

            {/* Recommended Templates */}
            <View style={styles.templatesSection}>
              <Text style={styles.sectionTitle}>Recommended for You</Text>
              <FlatList
                data={recommendedTemplates}
                renderItem={renderTemplateItem}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.templatesContainer}
              />
            </View>
          </>
        )}
      </ScrollView>

      {/* Create Button */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('Create')}
      >
        <Ionicons name="add" size={24} color={theme.colors.white} />
      </TouchableOpacity>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {[
          { icon: 'home', label: 'Home', active: true },
          { icon: 'compass', label: 'Explore' },
          { icon: 'add-circle', label: 'Create' },
          { icon: 'images', label: 'Gallery' },
          { icon: 'person', label: 'Profile' },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.tabItem}
            onPress={() => {
              if (item.label === 'Create') {
                navigation.navigate('Create');
              } else if (item.label === 'Gallery') {
                navigation.navigate('Gallery');
              }
            }}
          >
            <Ionicons
              name={item.icon}
              size={24}
              color={item.active ? theme.colors.accentPrimary : theme.colors.textSecondary}
            />
            <Text
              style={[
                styles.tabLabel,
                item.active && styles.tabLabelActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.textSecondary,
  },
  headerTitle: {
    flexDirection: 'row',
  },
  headerTitleBlue: {
    ...theme.typography.heading,
    color: theme.colors.accentPrimary,
  },
  headerTitlePurple: {
    ...theme.typography.heading,
    color: theme.colors.secondary,
  },
  headerActions: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  headerButton: {
    padding: theme.spacing.xs,
  },
  content: {
    flex: 1,
  },
  storiesContainer: {
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  storyItem: {
    alignItems: 'center',
    width: 64,
  },
  storyImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: theme.colors.accentPrimary,
    padding: 2,
    backgroundColor: theme.colors.white,
  },
  storyImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  storyName: {
    ...theme.typography.caption,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.xs,
    textAlign: 'center',
  },
  featuredSection: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.subheading,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  featuredCard: {
    borderRadius: theme.borderRadius.card,
    overflow: 'hidden',
    ...theme.shadows.medium,
  },
  featuredImage: {
    width: '100%',
    height: 200,
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-end',
    padding: theme.spacing.md,
  },
  featuredInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: theme.colors.white,
  },
  featuredCreator: {
    marginLeft: theme.spacing.sm,
  },
  featuredCreatorName: {
    ...theme.typography.button,
    color: theme.colors.white,
  },
  featuredStats: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  featuredStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  featuredStatText: {
    ...theme.typography.caption,
    color: theme.colors.white,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xs,
    margin: theme.spacing.md,
    borderRadius: theme.borderRadius.button,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderRadius: theme.borderRadius.button,
  },
  activeTab: {
    backgroundColor: theme.colors.white,
    ...theme.shadows.light,
  },
  tabText: {
    ...theme.typography.button,
    color: theme.colors.textSecondary,
  },
  activeTabText: {
    color: theme.colors.accentPrimary,
  },
  feedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  feedPost: {
    width: (width - theme.spacing.md * 3) / 2,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.card,
    overflow: 'hidden',
    ...theme.shadows.light,
  },
  feedPostImageContainer: {
    position: 'relative',
  },
  feedPostImage: {
    width: '100%',
    height: 160,
  },
  templateBadge: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  templateBadgeText: {
    ...theme.typography.caption,
    color: theme.colors.white,
  },
  feedPostContent: {
    padding: theme.spacing.sm,
  },
  feedPostHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  feedPostAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  feedPostCreator: {
    ...theme.typography.caption,
    color: theme.colors.textPrimary,
    flex: 1,
  },
  feedPostStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing.xs,
  },
  feedPostStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  feedPostStatText: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  feedPostMore: {
    padding: theme.spacing.xs,
  },
  templatesSection: {
    padding: theme.spacing.md,
  },
  templatesContainer: {
    gap: theme.spacing.md,
  },
  templateItem: {
    width: 128,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.card,
    overflow: 'hidden',
    ...theme.shadows.light,
  },
  templateImageContainer: {
    height: 160,
  },
  templateImage: {
    width: '100%',
    height: '100%',
  },
  templateInfo: {
    padding: theme.spacing.sm,
  },
  templateName: {
    ...theme.typography.button,
    color: theme.colors.textPrimary,
  },
  templateUses: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  createButton: {
    position: 'absolute',
    bottom: 80,
    right: theme.spacing.md,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.accentPrimary,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.medium,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: theme.colors.white,
    borderTopWidth: 1,
    borderTopColor: theme.colors.textSecondary,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
  },
  tabLabel: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  tabLabelActive: {
    color: theme.colors.accentPrimary,
  },
  // Skeleton loader styles
  skeletonStories: {
    flexDirection: 'row',
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  skeletonStoryItem: {
    alignItems: 'center',
    width: 64,
  },
  skeletonCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.textSecondary,
    opacity: 0.1,
  },
  skeletonText: {
    width: 40,
    height: 12,
    backgroundColor: theme.colors.textSecondary,
    opacity: 0.1,
    borderRadius: theme.borderRadius.sm,
    marginTop: theme.spacing.xs,
  },
  skeletonFeatured: {
    padding: theme.spacing.md,
  },
  skeletonImage: {
    height: 200,
    backgroundColor: theme.colors.textSecondary,
    opacity: 0.1,
    borderRadius: theme.borderRadius.card,
    marginBottom: theme.spacing.sm,
  },
  skeletonTitle: {
    width: '60%',
    height: 20,
    backgroundColor: theme.colors.textSecondary,
    opacity: 0.1,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.xs,
  },
  skeletonSubtitle: {
    width: '40%',
    height: 16,
    backgroundColor: theme.colors.textSecondary,
    opacity: 0.1,
    borderRadius: theme.borderRadius.sm,
  },
  skeletonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: theme.spacing.md,
    gap: theme.spacing.md,
  },
  skeletonGridItem: {
    width: (width - theme.spacing.md * 3) / 2,
  },
});

export default HomeScreen; 