import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import CreateScreen from '../screens/CreateScreen';
import GalleryScreen from '../screens/GalleryScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={({ focused }) => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        })}
      />
      <Tab.Screen 
        name="Create" 
        component={CreateScreen}
        options={({ focused }) => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={focused ? 'camera' : 'camera-outline'} size={size} color={color} />
          ),
        })}
      />
      <Tab.Screen 
        name="Gallery" 
        component={GalleryScreen}
        options={({ focused }) => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={focused ? 'images' : 'images-outline'} size={size} color={color} />
          ),
        })}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={({ focused }) => ({
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
