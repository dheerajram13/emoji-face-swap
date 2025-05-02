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
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../assets/styles/colors';

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

  const recommendedTemplates = [
    {
      id: 1,
      name: 'Fantasy Character',
      image: 'https://readdy.ai/api/search-image?query=3D%20cartoon%20avatar%20of%20a%20fantasy%20character%20with%20elf%20ears%20and%20glowing%20eyes%2C%20digital%20art%20style%2C%20vibrant%20colors%2C%20clean%20background%2C%20high%20quality%20render%2C%20centered%20composition%2C%20professional%20lighting%2C%20character%20design&width=400&height=300&seq=template1&orientation=landscape',
      uses: 1234,
    },
    {
      id: 2,
      name: 'Superhero',
      image: 'https://readdy.ai/api/search-image?query=3D%20cartoon%20avatar%20of%20a%20superhero%20character%20with%20mask%20and%20cape%2C%20digital%20art%20style%2C%20vibrant%20colors%2C%20clean%20background%2C%20high%20quality%20render%2C%20centered%20composition%2C%20professional%20lighting%2C%20character%20design&width=400&height=300&seq=template2&orientation=landscape',
      uses: 856,
    },
    {
      id: 3,
      name: 'Anime Style',
      image: 'https://readdy.ai/api/search-image?query=3D%20cartoon%20avatar%20in%20anime%20style%20with%20big%20eyes%20and%20colorful%20hair%2C%20digital%20art%20style%2C%20vibrant%20colors%2C%20clean%20background%2C%20high%20quality%20render%2C%20centered%20composition%2C%20professional%20lighting%2C%20character%20design&width=400&height=300&seq=template3&orientation=landscape',
      uses: 623,
    },
    {
      id: 4,
      name: 'Vintage Look',
      image: 'https://readdy.ai/api/search-image?query=3D%20cartoon%20avatar%20in%20vintage%20style%20with%20sepia%20tones%20and%20classic%20hairstyle%2C%20digital%20art%20style%2C%20warm%20colors%2C%20clean%20background%2C%20high%20quality%20render%2C%20centered%20composition%2C%20professional%20lighting%2C%20character%20design&width=400&height=300&seq=template4&orientation=landscape',
      uses: 456,
    },
  ];

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
            <Ionicons name="heart" size={12} color={colors.textSecondary} />
            <Text style={styles.feedPostStatText}>{item.likes.toLocaleString()}</Text>
          </View>
          <View style={styles.feedPostStat}>
            <Ionicons name="chatbubble" size={12} color={colors.textSecondary} />
            <Text style={styles.feedPostStatText}>{item.comments.toLocaleString()}</Text>
          </View>
          <TouchableOpacity style={styles.feedPostMore}>
            <Ionicons name="ellipsis-horizontal" size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderTemplateItem = ({ item }) => (
    <TouchableOpacity style={styles.templateItem}>
      <View style={styles.templateImageContainer}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.templateImage} 
          resizeMode="cover"
          onError={(error) => console.error('Image error:', error)}
          onLoad={() => console.log('Image loaded successfully')}
        />
      </View>
      <View style={styles.templateInfo}>
        <Text style={styles.templateName}>{item.name}</Text>
        <Text style={styles.templateUses}>{item.uses.toLocaleString()} uses</Text>
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
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {/* Main Content */}
      <View style={styles.content}>
        <ScrollView style={styles.scrollContent}>
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
                            <Ionicons name="heart" size={12} color={colors.white} />
                            <Text style={styles.featuredStatText}>{featuredSwap.likes.toLocaleString()}</Text>
                          </View>
                          <View style={styles.featuredStat}>
                            <Ionicons name="chatbubble" size={12} color={colors.white} />
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
                <FlatList
                  data={['For You', 'Trending', 'Following']}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.tabsContent}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={[styles.tab, activeTab === item && styles.activeTab]}
                      onPress={() => setActiveTab(item)}
                    >
                      <Text style={[styles.tabText, activeTab === item && styles.activeTabText]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item}
                />
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
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === 'ios' ? 0 : 20, // Fixed status bar height for Android
  },
  tabsContainer: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tabsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  tab: {
    marginRight: 16,
    padding: 8,
    borderRadius: 16,
  },
  activeTab: {
    backgroundColor: colors.accent,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.white,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  storiesContainer: {
    padding: 16,
    gap: 16,
  },
  storyItem: {
    alignItems: 'center',
    width: 64,
  },
  storyImageContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.accent,
  },
  storyImage: {
    width: '100%',
    height: '100%',
  },
  storyName: {
    fontSize: 12,
    color: colors.textPrimary,
    marginTop: 4,
  },
  featuredSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  featuredCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featuredImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
  },
  featuredInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  featuredCreator: {
    flex: 1,
  },
  featuredCreatorName: {
    fontSize: 16,
    color: colors.white,
    fontWeight: 'bold',
  },
  featuredStats: {
    flexDirection: 'row',
    marginTop: 8,
  },
  featuredStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  featuredStatText: {
    marginLeft: 4,
    color: colors.white,
  },
  feedPost: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  feedPostImageContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  feedPostImage: {
    width: '100%',
    height: '100%',
  },
  templateBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  templateBadgeText: {
    color: colors.white,
    fontSize: 12,
  },
  feedPostContent: {
    marginTop: 12,
  },
  feedPostHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  feedPostAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  feedPostCreator: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
  feedPostStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  feedPostStat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  feedPostStatText: {
    marginLeft: 4,
    color: colors.textSecondary,
  },
  feedPostMore: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 12,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  tabLabelActive: {
    color: colors.accent,
  },
  skeletonStories: {
    padding: 16,
    gap: 16,
  },
  skeletonStoryItem: {
    alignItems: 'center',
    width: 64,
  },
  skeletonCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.textSecondary,
    opacity: 0.1,
  },
  skeletonText: {
    width: 40,
    height: 12,
    backgroundColor: colors.textSecondary,
    opacity: 0.1,
    borderRadius: 8,
    marginTop: 4,
  },
  skeletonFeatured: {
    padding: 16,
  },
  skeletonImage: {
    height: 200,
    backgroundColor: colors.textSecondary,
    opacity: 0.1,
    borderRadius: 16,
    marginBottom: 8,
  },
  skeletonTitle: {
    width: '60%',
    height: 16,
    backgroundColor: colors.textSecondary,
    opacity: 0.1,
    borderRadius: 8,
    marginBottom: 4,
  },
  skeletonSubtitle: {
    width: '40%',
    height: 12,
    backgroundColor: colors.textSecondary,
    opacity: 0.1,
    borderRadius: 8,
  },
  skeletonGrid: {
    padding: 16,
    gap: 16,
  },
  skeletonGridItem: {
    width: '48%',
  },
  skeletonImage: {
    height: 150,
    backgroundColor: colors.textSecondary,
    opacity: 0.1,
    borderRadius: 12,
    marginBottom: 8,
  },
  skeletonTitle: {
    width: '70%',
    height: 14,
    backgroundColor: colors.textSecondary,
    opacity: 0.1,
    borderRadius: 8,
    marginBottom: 4,
  },
  skeletonSubtitle: {
    width: '50%',
    height: 12,
    backgroundColor: colors.textSecondary,
    opacity: 0.1,
    borderRadius: 8,
  },
});

export default HomeScreen;