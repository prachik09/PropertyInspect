// src/screens/LoginScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { mockStorage } from '../utils/mockStorage';
import { GOOGLE_AUTH_CONFIG } from '../config/googleAuth';

const LoginScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Configure Google Sign-In
    GoogleSignin.configure({
      webClientId: GOOGLE_AUTH_CONFIG.webClientId,
      offlineAccess: GOOGLE_AUTH_CONFIG.offlineAccess,
      hostedDomain: GOOGLE_AUTH_CONFIG.hostedDomain,
      forceConsentPrompt: GOOGLE_AUTH_CONFIG.forceConsentPrompt,
      accountName: GOOGLE_AUTH_CONFIG.accountName,
      iosClientId: GOOGLE_AUTH_CONFIG.iosClientId,
      scopes: GOOGLE_AUTH_CONFIG.scopes,
    });

    // Check if user is already signed in
    checkSignInStatus();
  }, []);

  const checkSignInStatus = async () => {
    try {
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        const userInfo = await GoogleSignin.getCurrentUser();
        if (userInfo) {
          const user = {
            name: userInfo.user.name,
            email: userInfo.user.email,
            profilePicture: userInfo.user.photo,
            uid: userInfo.user.id,
            role: 'Property Inspector'
          };
          mockStorage.setUser(user);
          navigation.replace('Home');
        }
      }
    } catch (error) {
      console.log('Check sign in status error:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      
      // Check if device has Google Play Services
      await GoogleSignin.hasPlayServices();
      
      // Sign in with Google
      const userInfo = await GoogleSignin.signIn();
      
      // Create user object for app storage
      const user = {
        name: userInfo.user.name,
        email: userInfo.user.email,
        profilePicture: userInfo.user.photo,
        uid: userInfo.user.id,
        role: 'Property Inspector',
        idToken: userInfo.idToken,
        accessToken: userInfo.accessToken,
      };
      
      // Store user data
      mockStorage.setUser(user);
      
      // Navigate to home screen
      navigation.replace('Home');
      
    } catch (error) {
      setLoading(false);
      
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        Alert.alert('Sign In Cancelled', 'Sign in was cancelled by the user');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert('Sign In Progress', 'Sign in is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('Play Services Not Available', 'Google Play Services is not available on this device');
      } else {
        Alert.alert('Sign In Error', 'Something went wrong with Google Sign In. Please try again.');
        console.log('Google Sign In Error:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.decorativeElements}>
        <Animated.View style={[styles.floatingElement, styles.element1]} />
        <Animated.View style={[styles.floatingElement, styles.element2]} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Icon name="home" size={48} color="#fff" />
          </View>
          <Text style={styles.title}>PropertyInspect</Text>
          <Text style={styles.subtitle}>Staff Portal</Text>
          <Text style={styles.description}>Professional Property Management</Text>
        </View>

        <View style={styles.loginForm}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Staff Login</Text>
            <Text style={styles.formSubtitle}>Sign in with your Google account</Text>
          </View>
          
          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleGoogleSignIn}
            disabled={loading}
          >
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="#fff" size="small" />
                <Text style={styles.loadingText}>Authenticating...</Text>
              </View>
            ) : (
              <View style={styles.buttonContent}>
                <Icon name="globe" size={20} color="#fff" style={styles.buttonIcon} />
                <Text style={styles.buttonText}>Continue with Google</Text>
              </View>
            )}
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            Secure authentication • Staff access only
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B82F6',
    position: 'relative',
  },
  decorativeElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  floatingElement: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 50,
  },
  element1: {
    width: 80,
    height: 80,
    top: 80,
    left: 40,
  },
  element2: {
    width: 96,
    height: 96,
    bottom: 128,
    right: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    zIndex: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  loginForm: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  loginButton: {
    backgroundColor: '#3B82F6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonDisabled: {
    opacity: 0.5,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  disclaimer: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: 12,
    marginTop: 16,
  },
});

export default LoginScreen;
