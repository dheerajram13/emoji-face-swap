import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../assets/styles/theme';

const EmojiStyleScreen = ({ navigation }) => {
  const emojiStyles = [
    { name: 'Classic', emojis: ['😊', '😂', '😍', '🤔', '😎'] },
    { name: 'Animals', emojis: ['🐶', '🐱', '🐼', '🦊', '🐨'] },
    { name: 'Food', emojis: ['🍕', '🍔', '🍦', '🍩', '🍪'] },
    { name: 'Hearts', emojis: ['❤️', '💖', '💝', '💕', '💓'] },
    { name: 'Faces', emojis: ['😀', '😃', '😄', '😁', '😆'] },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Choose Emoji Style</Text>
      </View>

      <ScrollView style={styles.content}>
        {emojiStyles.map((style, index) => (
          <TouchableOpacity
            key={index}
            style={styles.styleCard}
            onPress={() => {
              // TODO: Implement style selection
              navigation.goBack();
            }}
          >
            <Text style={styles.styleName}>{style.name}</Text>
            <View style={styles.emojiContainer}>
              {style.emojis.map((emoji, emojiIndex) => (
                <Text key={emojiIndex} style={styles.emoji}>
                  {emoji}
                </Text>
              ))}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.textSecondary + '20',
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  title: {
    ...theme.typography.heading,
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.md,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  styleCard: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.card,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.light,
  },
  styleName: {
    ...theme.typography.subheading,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 32,
  },
});

export default EmojiStyleScreen; 