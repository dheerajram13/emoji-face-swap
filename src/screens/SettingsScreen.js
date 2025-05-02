import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../assets/styles/theme';

const SettingsScreen = ({ navigation }) => {
  const [settings, setSettings] = useState({
    realTimeAnimation: true,
    multiFaceMode: false,
    aiEmojiSuggestions: true,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const menuItems = [
    {
      title: 'Real-time Animation',
      description: 'Enable smooth transitions between emojis',
      key: 'realTimeAnimation',
      icon: 'flash',
    },
    {
      title: 'Multi-face Mode',
      description: 'Detect and swap multiple faces at once',
      key: 'multiFaceMode',
      icon: 'people',
    },
    {
      title: 'AI Emoji Suggestions',
      description: 'Get smart emoji recommendations based on expressions',
      key: 'aiEmojiSuggestions',
      icon: 'bulb',
    },
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
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        {menuItems.map((item, index) => (
          <View key={index} style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name={item.icon} size={24} color={theme.colors.accentPrimary} />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                <Text style={styles.settingDescription}>{item.description}</Text>
              </View>
            </View>
            <Switch
              value={settings[item.key]}
              onValueChange={() => toggleSetting(item.key)}
              trackColor={{ false: theme.colors.textSecondary + '40', true: theme.colors.accentPrimary }}
              thumbColor={theme.colors.white}
            />
          </View>
        ))}

        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="information-circle" size={24} color={theme.colors.accentPrimary} />
          <Text style={styles.menuText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="chatbubble" size={24} color={theme.colors.accentPrimary} />
          <Text style={styles.menuText}>Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="star" size={24} color={theme.colors.accentPrimary} />
          <Text style={styles.menuText}>Rate Us</Text>
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
  title: {
    ...theme.typography.heading,
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.md,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.card,
    marginBottom: theme.spacing.md,
    ...theme.shadows.light,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: theme.spacing.md,
    flex: 1,
  },
  settingTitle: {
    ...theme.typography.subheading,
    color: theme.colors.textPrimary,
  },
  settingDescription: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.textSecondary + '20',
    marginVertical: theme.spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.card,
    marginBottom: theme.spacing.md,
    ...theme.shadows.light,
  },
  menuText: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
    marginLeft: theme.spacing.md,
  },
});

export default SettingsScreen; 