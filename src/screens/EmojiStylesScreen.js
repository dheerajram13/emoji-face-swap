import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { tokens } from '../design/tokens';
import { Ionicons } from '@expo/vector-icons';

const EMOJI_STYLES = [
  { id: '1', name: 'Smiley', emoji: '😊', image: 'https://picsum.photos/200/200?random=1' },
  { id: '2', name: 'Cool', emoji: '😎', image: 'https://picsum.photos/200/200?random=2' },
  { id: '3', name: 'Heart Eyes', emoji: '😍', image: 'https://picsum.photos/200/200?random=3' },
  { id: '4', name: 'Tongue Out', emoji: '😛', image: 'https://picsum.photos/200/200?random=4' },
  { id: '5', name: 'Sunglasses', emoji: '🕶️', image: 'https://picsum.photos/200/200?random=5' },
  { id: '6', name: 'Star Eyes', emoji: '🤩', image: 'https://picsum.photos/200/200?random=6' },
  { id: '7', name: 'Silly', emoji: '🤪', image: 'https://picsum.photos/200/200?random=7' },
  { id: '8', name: 'Blush', emoji: '☺️', image: 'https://picsum.photos/200/200?random=8' },
];

const EmojiStylesScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [styles, setStyles] = useState([]);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setStyles(EMOJI_STYLES);
      setLoading(false);
    }, 500);
  }, []);

  const handleSelectStyle = (style) => {
    setSelectedStyle(style.id);
    // Navigate to create screen with selected style
    navigation.navigate('Create', { style });
  };

  const renderStyleItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item,
        { 
          backgroundColor: colors.card,
          borderColor: selectedStyle === item.id ? colors.primary : colors.border,
          borderWidth: selectedStyle === item.id ? 2 : 1,
        }
      ]}
      onPress={() => handleSelectStyle(item)}
      activeOpacity={0.7}
    >
      <View style={[styles.emojiContainer, { backgroundColor: colors.primaryLight }]}>
        <Text style={styles.emojiText}>{item.emoji}</Text>
      </View>
      <Text style={[styles.styleName, { color: colors.text }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={styles}
        renderItem={renderStyleItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: tokens.spacing.lg,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: tokens.spacing.xl,
  },
  item: {
    flex: 1,
    margin: tokens.spacing.sm,
    padding: tokens.spacing.lg,
    borderRadius: tokens.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...tokens.shadows.sm,
  },
  emojiContainer: {
    width: 80,
    height: 80,
    borderRadius: tokens.radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: tokens.spacing.md,
  },
  emojiText: {
    fontSize: 36,
  },
  styleName: {
    ...tokens.fonts.body,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default EmojiStylesScreen;
