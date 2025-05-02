import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../assets/styles/theme';

const { width } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const user = {
    name: 'Dheeraj',
    username: '@dheerajram13',
    bio: 'Emoji face swap enthusiast | Creator of amazing emoji transformations',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
    stats: {
      posts: 125,
      followers: 2456,
      following: 321,
    },
  };

  const posts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1573497019349-791102109858?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
      likes: 1245,
      comments: 87,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1582597357421-3833368f592f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
      likes: 3452,
      comments: 128,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1573497019349-791102109858?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80',
      likes: 2154,
      comments: 92,
    },
  ];

  const renderPost = ({ item }) => (
    <TouchableOpacity style={styles.postItem}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postStats}>
        <View style={styles.postStat}>
          <Ionicons name="heart" size={16} color={theme.colors.textSecondary} />
          <Text style={styles.statNumber}>{item.likes.toLocaleString()}</Text>
        </View>
        <View style={styles.postStat}>
          <Ionicons name="chatbubble" size={16} color={theme.colors.textSecondary} />
          <Text style={styles.statNumber}>{item.comments.toLocaleString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity 
              style={styles.editAvatarButton}
              onPress={() => setEditMode(true)}
            >
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              {editMode && (
                <View style={styles.editIconContainer}>
                  <Ionicons name="pencil" size={16} color={theme.colors.white} />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileUsername}>{user.username}</Text>
            <Text style={styles.profileBio}>{user.bio}</Text>
            <TouchableOpacity 
              style={styles.editProfileButton}
              onPress={() => setIsEditing(true)}
            >
              <Text style={styles.editProfileButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.stats.posts.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.stats.followers.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{user.stats.following.toLocaleString()}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* Posts Grid */}
        <View style={styles.postsContainer}>
          <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.postsGrid}
          />
        </View>

        {/* Settings Button */}
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="settings-outline" size={24} color={theme.colors.textSecondary} />
          <Text style={styles.settingsButtonText}>Settings</Text>
        </TouchableOpacity>
      </ScrollView>
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
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    marginRight: theme.spacing.md,
  },
  closeButton: {
    marginLeft: theme.spacing.md,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    marginRight: theme.spacing.lg,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  editAvatarButton: {
    position: 'relative',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.accentPrimary,
    borderRadius: 12,
    padding: 4,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  profileUsername: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  profileBio: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  editProfileButton: {
    backgroundColor: theme.colors.accentPrimary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  editProfileButtonText: {
    color: theme.colors.white,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: theme.spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: theme.colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  statLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  postsContainer: {
    paddingVertical: theme.spacing.md,
  },
  postsGrid: {
    padding: theme.spacing.sm,
  },
  postItem: {
    width: (width - theme.spacing.sm * 4) / 3,
    margin: theme.spacing.sm,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: theme.colors.card,
  },
  postImage: {
    width: '100%',
    height: 150,
  },
  postStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: theme.spacing.sm,
  },
  postStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 12,
    marginLeft: theme.spacing.xs,
    color: theme.colors.textSecondary,
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
  },
  settingsButtonText: {
    marginLeft: theme.spacing.sm,
    color: theme.colors.textSecondary,
  },
});

export default ProfileScreen;
