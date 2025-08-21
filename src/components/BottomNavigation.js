// src/components/BottomNavigation.js
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const BottomNavigation = ({ activeTab, setActiveTab, navigation }) => {
  const tabs = [
    { id: 'home', icon: 'home', label: 'Home', screen: 'Home' },
    { id: 'search', icon: 'search', label: 'Search', screen: 'SearchProperties' },
    { id: 'inspect', icon: 'camera', label: 'Inspect', screen: 'Inspect' },
    { id: 'profile', icon: 'user', label: 'Profile', screen: 'Profile' }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => {
                setActiveTab(tab.id);
                navigation.navigate(tab.screen);
              }}
              style={[styles.tab, isActive && styles.activeTab]}
            >
              <Icon 
                name={tab.icon} 
                size={18} 
                color={isActive ? '#fff' : '#9CA3AF'} 
              />
              <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 12,
    minWidth: 60,
  },
  activeTab: {
    backgroundColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#9CA3AF',
    marginTop: 2,
  },
  activeTabLabel: {
    color: '#fff',
  },
});

export default BottomNavigation;
