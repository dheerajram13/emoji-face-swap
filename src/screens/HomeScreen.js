import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, ScrollView } from 'react-native';
import { Camera, Settings, ImageIcon, Smile, Share2, PlusSquare } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* App Header */}
      <View style={styles.header}>
        <Text style={styles.appName}>EmojiSwap</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Settings size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Camera Button */}
      <View style={styles.cameraContainer}>
        <TouchableOpacity style={styles.cameraButton}>
          <Camera size={48} color="white" />
        </TouchableOpacity>
      </View>

      {/* Tagline */}
      <Text style={styles.tagline}>Transform your face into emoji</Text>

      {/* Recent Swaps */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Swaps</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <RecentSwapItem
            image={{ uri: 'https://picsum.photos/200/200?random=1' }}
            time="Today, 2:30 PM"
          />
          <RecentSwapItem
            image={{ uri: 'https://picsum.photos/200/200?random=2' }}
            time="Today, 2:30 PM"
          />
          <RecentSwapItem
            image={{ uri: 'https://picsum.photos/200/200?random=3' }}
            time="Yesterday, 5:15 PM"
          />
        </ScrollView>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <ImageIcon size={24} color="#666" />
          <Text style={styles.actionButtonText}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Share2 size={24} color="#666" />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <PlusSquare size={24} color="#666" />
          <Text style={styles.actionButtonText}>Templates</Text>
        </TouchableOpacity>
      </View>

      {/* Popular Styles */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Styles</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <StyleItem
            image={{ uri: 'https://picsum.photos/150/150?random=4' }}
            title="Smiley Face"
          />
          <StyleItem
            image={{ uri: 'https://picsum.photos/150/150?random=5' }}
            title="Heart Eyes"
          />
          <StyleItem
            image={{ uri: 'https://picsum.photos/150/150?random=6' }}
            title="Tongue Out"
          />
          <StyleItem
            image={{ uri: 'https://picsum.photos/150/150?random=7' }}
            title="Anime Style"
          />
        </ScrollView>
      </View>

      {/* Start Button */}
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>Start Swapping</Text>
      </TouchableOpacity>
    </View>
  );
};

const StatusBarIcon = ({ name }) => (
  <View style={styles.statusIcon}>
    <Text style={styles.statusIconText}>{name}</Text>
  </View>
);

const RecentSwapItem = ({ image, time }) => (
  <View style={styles.recentSwapItem}>
    <Image
      source={image}
      style={styles.recentSwapImage}
      resizeMode="cover"
    />
    <Text style={styles.recentSwapTime}>{time}</Text>
  </View>
);

const StyleItem = ({ image, title }) => (
  <View style={styles.styleItem}>
    <Image
      source={image}
      style={styles.styleItemImage}
      resizeMode="cover"
    />
    <Text style={styles.styleItemTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  settingsButton: {
    padding: 8,
  },
  cameraContainer: {
    alignItems: 'center',
    padding: 32,
  },
  cameraButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ff7eb3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagline: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  recentSwapItem: {
    width: 150,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  recentSwapImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  recentSwapTime: {
    padding: 8,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionButtonText: {
    marginTop: 8,
    color: '#666',
  },
  styleItem: {
    width: 120,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  styleItemImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  styleItemTitle: {
    padding: 8,
    color: '#333',
    textAlign: 'center',
  },
  startButton: {
    alignSelf: 'center',
    backgroundColor: '#ff7eb3',
    padding: 16,
    borderRadius: 24,
    marginVertical: 32,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
