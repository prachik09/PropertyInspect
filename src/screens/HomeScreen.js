// src/screens/HomeScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { mockStorage } from '../utils/mockStorage';
import { mockProperties } from '../utils/mockData';

const HomeScreen = ({ navigation, setActiveTab }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = mockStorage.getUser();
    setUser(userData);
  }, []);

  const currentTime = new Date().getHours();
  const getGreeting = () => {
    if (currentTime < 12) return 'Good morning';
    if (currentTime < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.userInfo}>
              {user?.profilePicture && (
                <View style={styles.profileContainer}>
                  <Image 
                    source={{ uri: user.profilePicture }} 
                    style={styles.profileImage}
                  />
                  <View style={styles.onlineIndicator} />
                </View>
              )}
              <View style={styles.userDetails}>
                <Text style={styles.greeting}>{getGreeting()},</Text>
                <Text style={styles.userName}>{user?.name || 'Inspector'}</Text>
                <Text style={styles.userRole}>{user?.role}</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.settingsButton}
              onPress={() => {
                setActiveTab('profile');
                navigation.navigate('Profile');
              }}
            >
              <Icon name="settings" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{mockProperties.length}</Text>
              <Text style={styles.statLabel}>Properties</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {mockProperties.filter(p => p.status === 'Available').length}
              </Text>
              <Text style={styles.statLabel}>Available</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>
                {mockProperties.filter(p => p.status === 'Pending').length}
              </Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.inspectButton]}
            onPress={() => {
              setActiveTab('inspect');
              navigation.navigate('Inspect');
            }}
          >
            <View style={styles.actionButtonContent}>
              <View style={styles.actionIcon}>
                <Icon name="camera" size={24} color="#fff" />
              </View>
              <View style={styles.actionText}>
                <Text style={styles.actionTitle}>Start Inspection</Text>
                <Text style={styles.actionSubtitle}>AI-powered property analysis</Text>
              </View>
              <Icon name="chevron-right" size={22} color="#fff" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.searchButton]}
            onPress={() => {
              setActiveTab('search');
              navigation.navigate('SearchProperties');
            }}
          >
            <View style={styles.actionButtonContent}>
              <View style={[styles.actionIcon, styles.searchIcon]}>
                <Icon name="search" size={24} color="#fff" />
              </View>
              <View style={styles.actionText}>
                <Text style={styles.actionTitle}>Search Properties</Text>
                <Text style={[styles.actionSubtitle, styles.searchSubtitle]}>Browse available properties</Text>
              </View>
              <Icon name="chevron-right" size={22} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Today's Schedule */}
        <View style={styles.scheduleCard}>
          <Text style={styles.scheduleTitle}>Today's Schedule</Text>
          <View style={styles.scheduleList}>
            {mockProperties.slice(0, 3).map(property => (
              <View key={property.id} style={styles.scheduleItem}>
                <Image source={{ uri: property.image }} style={styles.scheduleImage} />
                <View style={styles.scheduleInfo}>
                  <Text style={styles.schedulePropertyName}>{property.name}</Text>
                  <View style={styles.scheduleDateContainer}>
                    <Icon name="calendar" size={14} color="#9CA3AF" />
                    <Text style={styles.scheduleDate}>{property.inspectionDate}</Text>
                  </View>
                </View>
                <Icon name="chevron-right" size={18} color="#D1D5DB" />
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 24,
    paddingBottom: 100,
  },
  header: {
    backgroundColor: '#3B82F6',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContainer: {
    position: 'relative',
    marginRight: 16,
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 16,
    height: 16,
    backgroundColor: '#10B981',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  userDetails: {
    flex: 1,
  },
  greeting: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  userName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userRole: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
  },
  settingsButton: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statNumber: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  actionButton: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  inspectButton: {
    backgroundColor: '#3B82F6',
  },
  searchButton: {
    backgroundColor: '#10B981',
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 12,
    marginRight: 16,
  },
  searchIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  actionText: {
    flex: 1,
  },
  actionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  actionSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  searchSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  scheduleCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  scheduleList: {
    gap: 16,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
  },
  scheduleImage: {
    width: 56,
    height: 56,
    borderRadius: 16,
    marginRight: 16,
  },
  scheduleInfo: {
    flex: 1,
  },
  schedulePropertyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  scheduleDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleDate: {
    color: '#6B7280',
    fontSize: 14,
    marginLeft: 8,
  },
});

export default HomeScreen;
