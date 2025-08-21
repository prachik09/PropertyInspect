// src/screens/ProfileScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { mockStorage } from '../utils/mockStorage';

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = mockStorage.getUser();
    setUser(userData);
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              // Sign out from Google
              await GoogleSignin.signOut();
              
              // Clear local user data
              mockStorage.removeUser();
              
              // Navigate to login screen
              navigation.replace('Login');
            } catch (error) {
              console.log('Sign out error:', error);
              // Still clear local data and navigate even if Google sign-out fails
              mockStorage.removeUser();
              navigation.replace('Login');
            }
          },
        },
      ]
    );
  };

  const ProfileOption = ({ icon, title, onPress, color = '#3B82F6' }) => (
    <TouchableOpacity style={styles.profileOption} onPress={onPress}>
      <View style={styles.optionContent}>
        <View style={[styles.optionIcon, { backgroundColor: `${color}20` }]}>
          <Icon name={icon} size={20} color={color} />
        </View>
        <Text style={styles.optionTitle}>{title}</Text>
      </View>
      <Icon name="chevron-right" size={18} color="#D1D5DB" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileInfo}>
            {user?.profilePicture && (
              <Image source={{ uri: user.profilePicture }} style={styles.profileImage} />
            )}
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
              <Text style={styles.userRole}>{user?.role}</Text>
            </View>
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.settingsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Account Settings</Text>
          </View>
          
          <View style={styles.optionsContainer}>
            <ProfileOption
              icon="user"
              title="Edit Profile"
              onPress={() => Alert.alert('Feature', 'Edit Profile coming soon!')}
            />
            
            <ProfileOption
              icon="settings"
              title="Preferences"
              onPress={() => Alert.alert('Feature', 'Preferences coming soon!')}
            />
            
            <ProfileOption
              icon="bell"
              title="Notifications"
              onPress={() => Alert.alert('Feature', 'Notifications settings coming soon!')}
            />
            
            <ProfileOption
              icon="shield"
              title="Privacy & Security"
              onPress={() => Alert.alert('Feature', 'Privacy settings coming soon!')}
            />
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.settingsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>App Settings</Text>
          </View>
          
          <View style={styles.optionsContainer}>
            <ProfileOption
              icon="help-circle"
              title="Help & Support"
              onPress={() => Alert.alert('Support', 'Contact support at support@propertyinspect.com')}
              color="#10B981"
            />
            
            <ProfileOption
              icon="info"
              title="About"
              onPress={() => Alert.alert('About', 'PropertyInspect v1.0.0\nProfessional Property Management')}
              color="#10B981"
            />
            
            <ProfileOption
              icon="star"
              title="Rate App"
              onPress={() => Alert.alert('Rate App', 'Thank you for using PropertyInspect!')}
              color="#F59E0B"
            />
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="log-out" size={20} color="#fff" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* App Version */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>PropertyInspect v1.0.0</Text>
          <Text style={styles.copyrightText}>© 2025 PropertyInspect. All rights reserved.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  content: {
    flex: 1,
    padding: 24,
    paddingBottom: 120,
  },
  profileHeader: {
    backgroundColor: '#3B82F6',
    borderRadius: 24,
    padding: 32,
    marginBottom: 24,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginRight: 24,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  settingsSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  optionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  profileOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionIcon: {
    padding: 12,
    borderRadius: 16,
    marginRight: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  logoutButton: {
    backgroundColor: '#EF4444',
    borderRadius: 24,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 32,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  versionText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: '#D1D5DB',
    textAlign: 'center',
  },
});

export default ProfileScreen;
