import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  ActivityIndicator,
  Modal,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../assets/styles/theme';

const { width } = Dimensions.get('window');
const ITEMS_PER_PAGE = 10;

const GalleryScreen = ({ navigation }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [galleryImages, setGalleryImages] = useState([]);
  const slideAnim = useRef(new Animated.Value(0)).current;

  // Generate sample gallery data
  useEffect(() => {
    const generateGalleryData = () => {
      const newImages = Array.from({ length: ITEMS_PER_PAGE }, (_, i) => {
        const index = (page - 1) * ITEMS_PER_PAGE + i;
        const isFavorite = Math.random() > 0.7;
        const daysAgo = Math.floor(Math.random() * 30);
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);

        return {
          id: index + 1,
          imageUrl: `https://picsum.photos/400/400?random=${index + 1}`,
          isFavorite,
          createdAt: date,
          title: `Face Swap ${index + 1}`,
        };
      });

      setGalleryImages((prev) => [...prev, ...newImages]);
      setIsLoading(false);
      setHasMore(page < 5); // Limit to 5 pages for demo
    };

    generateGalleryData();
  }, [page]);

  // Filter images based on active filter
  const filteredImages = galleryImages.filter((image) => {
    if (searchQuery) {
      return image.title.toLowerCase().includes(searchQuery.toLowerCase());
    }

    if (activeFilter === 'favorites') {
      return image.isFavorite;
    }

    if (activeFilter === 'recent') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      return new Date(image.createdAt) >= oneWeekAgo;
    }

    return true;
  });

  // Toggle favorite status
  const toggleFavorite = (id) => {
    setGalleryImages((prevImages) =>
      prevImages.map((image) =>
        image.id === id ? { ...image, isFavorite: !image.isFavorite } : image,
      ),
    );
  };

  // Format date for display
  const formatDate = (date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  // Handle image selection
  const handleImageSelect = (id) => {
    setSelectedImage(id);
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Close action menu
  const closeActionMenu = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSelectedImage(null);
    });
  };

  // Handle image actions
  const handleImageAction = (action, id) => {
    switch (action) {
      case 'view':
        console.log(`Viewing image ${id}`);
        break;
      case 'share':
        console.log(`Sharing image ${id}`);
        break;
      case 'edit':
        console.log(`Editing image ${id}`);
        break;
      case 'delete':
        setGalleryImages((prevImages) =>
          prevImages.filter((image) => image.id !== id),
        );
        break;
      default:
        break;
    }
    closeActionMenu();
  };

  const renderImageItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={() => handleImageSelect(item.id)}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => toggleFavorite(item.id)}
      >
        <Ionicons
          name={item.isFavorite ? 'heart' : 'heart-outline'}
          size={20}
          color={item.isFavorite ? theme.colors.accentPrimary : theme.colors.white}
        />
      </TouchableOpacity>
      <View style={styles.imageOverlay}>
        <Text style={styles.dateText}>{formatDate(new Date(item.createdAt))}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="images-outline" size={48} color={theme.colors.textSecondary} />
      <Text style={styles.emptyStateText}>
        {searchQuery
          ? 'No images match your search'
          : activeFilter === 'favorites'
          ? 'No favorite images yet'
          : activeFilter === 'recent'
          ? 'No recent images'
          : 'Your gallery is empty'}
      </Text>
      {searchQuery && (
        <TouchableOpacity
          style={styles.clearSearchButton}
          onPress={() => setSearchQuery('')}
        >
          <Text style={styles.clearSearchText}>Clear search</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderFilterButton = (filter, label) => (
    <TouchableOpacity
      style={[styles.filterButton, activeFilter === filter && styles.activeFilterButton]}
      onPress={() => setActiveFilter(filter)}
    >
      <Text
        style={[
          styles.filterButtonText,
          activeFilter === filter && styles.activeFilterButtonText,
        ]}
      >
        {label}
      </Text>
      {activeFilter === filter && <View style={styles.filterIndicator} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        {!showSearchBar ? (
          <>
            <Text style={styles.headerTitle}>Gallery</Text>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => setShowSearchBar(true)}
            >
              <Ionicons name="search" size={24} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.searchContainer}>
            <View style={styles.searchInputContainer}>
              <Ionicons
                name="search"
                size={20}
                color={theme.colors.textSecondary}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search gallery..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
              {searchQuery ? (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => setSearchQuery('')}
                >
                  <Ionicons
                    name="close-circle"
                    size={20}
                    color={theme.colors.textSecondary}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setShowSearchBar(false);
                setSearchQuery('');
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Filter Section */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {renderFilterButton('all', 'All')}
          {renderFilterButton('favorites', 'Favorites')}
          {renderFilterButton('recent', 'Recent')}
        </ScrollView>
      </View>

      {/* Gallery Grid */}
      <FlatList
        data={filteredImages}
        renderItem={renderImageItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.galleryGrid}
        ListEmptyComponent={renderEmptyState}
        onEndReached={() => {
          if (!isLoading && hasMore) {
            setPage((prevPage) => prevPage + 1);
            setIsLoading(true);
          }
        }}
        onEndReachedThreshold={0.5}
      />

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.accentPrimary} />
        </View>
      )}

      {/* Image Action Menu */}
      <Modal
        visible={selectedImage !== null}
        transparent
        animationType="fade"
        onRequestClose={closeActionMenu}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeActionMenu}
        >
          <Animated.View
            style={[
              styles.actionMenu,
              {
                transform: [
                  {
                    translateY: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [300, 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.actionMenuHandle} />
            <View style={styles.actionMenuContent}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleImageAction('view', selectedImage)}
              >
                <Ionicons name="eye" size={24} color={theme.colors.accentPrimary} />
                <Text style={styles.actionButtonText}>View full image</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleImageAction('share', selectedImage)}
              >
                <Ionicons name="share" size={24} color={theme.colors.accentPrimary} />
                <Text style={styles.actionButtonText}>Share</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => handleImageAction('edit', selectedImage)}
              >
                <Ionicons name="create" size={24} color={theme.colors.accentPrimary} />
                <Text style={styles.actionButtonText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.deleteButton]}
                onPress={() => handleImageAction('delete', selectedImage)}
              >
                <Ionicons name="trash" size={24} color={theme.colors.error} />
                <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
                  Delete
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelActionButton}
                onPress={closeActionMenu}
              >
                <Text style={styles.cancelActionButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
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
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerTitle: {
    ...theme.typography.heading,
    flex: 1,
    textAlign: 'center',
  },
  searchButton: {
    padding: theme.spacing.sm,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.input,
    paddingHorizontal: theme.spacing.sm,
  },
  searchIcon: {
    marginRight: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 40,
    ...theme.typography.body,
  },
  clearButton: {
    padding: theme.spacing.sm,
  },
  cancelButton: {
    marginLeft: theme.spacing.sm,
  },
  cancelButtonText: {
    ...theme.typography.button,
    color: theme.colors.accentPrimary,
  },
  filterContainer: {
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  filterButton: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
  },
  activeFilterButton: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.accentPrimary,
  },
  filterButtonText: {
    ...theme.typography.button,
    color: theme.colors.textSecondary,
  },
  activeFilterButtonText: {
    color: theme.colors.accentPrimary,
  },
  filterIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: theme.colors.accentPrimary,
  },
  galleryGrid: {
    padding: theme.spacing.sm,
  },
  imageContainer: {
    flex: 1,
    margin: theme.spacing.xs,
    aspectRatio: 1,
    borderRadius: theme.borderRadius.card,
    overflow: 'hidden',
    backgroundColor: theme.colors.white,
    ...theme.shadows.light,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: theme.spacing.sm,
    right: theme.spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dateText: {
    ...theme.typography.caption,
    color: theme.colors.white,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  emptyStateText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },
  clearSearchButton: {
    marginTop: theme.spacing.md,
  },
  clearSearchText: {
    ...theme.typography.button,
    color: theme.colors.accentPrimary,
  },
  loadingContainer: {
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  actionMenu: {
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: theme.borderRadius.card,
    borderTopRightRadius: theme.borderRadius.card,
  },
  actionMenuHandle: {
    width: 40,
    height: 4,
    backgroundColor: theme.colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginVertical: theme.spacing.sm,
  },
  actionMenuContent: {
    padding: theme.spacing.md,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  actionButtonText: {
    ...theme.typography.body,
    marginLeft: theme.spacing.md,
  },
  deleteButton: {
    borderBottomWidth: 0,
  },
  deleteButtonText: {
    color: theme.colors.error,
  },
  cancelActionButton: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.button,
    alignItems: 'center',
  },
  cancelActionButtonText: {
    ...theme.typography.button,
    color: theme.colors.textPrimary,
  },
});

export default GalleryScreen; 