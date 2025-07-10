import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { tokens } from '../../design/tokens';

const BottomNavBar = ({ state, descriptors, navigation }) => {
  const tabs = [
    {
      name: 'Home',
      icon: 'home-outline',
      activeIcon: 'home',
      route: 'Home',
    },
    {
      name: 'Camera',
      icon: 'camera-outline',
      activeIcon: 'camera',
      route: 'Camera',
      isSpecial: true,
    },
    {
      name: 'Gallery',
      icon: 'images-outline',
      activeIcon: 'images',
      route: 'Gallery',
    },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isFocused = state.index === index;
        const iconName = isFocused ? tab.activeIcon : tab.icon;

        if (tab.isSpecial) {
          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.specialButton}
              onPress={() => navigation.navigate(tab.route)}
              activeOpacity={0.8}
            >
              <Ionicons
                name={iconName}
                size={28}
                color={tokens.colors.white}
              />
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabButton}
            onPress={() => navigation.navigate(tab.route)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={iconName}
              size={24}
              color={isFocused ? tokens.colors.primary : tokens.colors.text}
            />
            <Text
              style={[
                styles.tabLabel,
                {
                  color: isFocused ? tokens.colors.primary : tokens.colors.text,
                },
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: tokens.colors.white,
    borderTopWidth: 1,
    borderTopColor: tokens.colors.grayLight,
    paddingVertical: tokens.spacing.sm,
    height: 70,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: tokens.spacing.sm,
  },
  specialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: tokens.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -30,
    shadowColor: tokens.colors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  tabLabel: {
    ...tokens.fonts.caption,
    marginTop: tokens.spacing.xs / 2,
  },
});

export default BottomNavBar;
