import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../assets/styles/colors';

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
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        {menuItems.map((item, index) => (
          <View key={index} style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons name={item.icon} size={24} color={colors.accentPrimary} />
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                <Text style={styles.settingDescription}>{item.description}</Text>
              </View>
            </View>
            <Switch
              value={settings[item.key]}
              onValueChange={() => toggleSetting(item.key)}
              trackColor={{ false: colors.textSecondary + '40', true: colors.accentPrimary }}
              thumbColor={colors.white}
            />
          </View>
        ))}

        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="information-circle" size={24} color={colors.accentPrimary} />
          <Text style={styles.menuText}>About</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="chatbubble" size={24} color={colors.accentPrimary} />
          <Text style={styles.menuText}>Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="star" size={24} color={colors.accentPrimary} />
          <Text style={styles.menuText}>Rate Us</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    marginRight: 16,
  },
  closeButton: {
    marginLeft: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginLeft: 16,
  },
  content: {
    flex: 1,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  settingDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: colors.textSecondary + '20',
    marginVertical: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuText: {
    fontSize: 16,
    color: colors.textPrimary,
    marginLeft: 12,
  },
});

export default SettingsScreen; 