// src/config/googleAuth.js
// Google Authentication Configuration
// Replace these values with your actual Firebase project configuration

export const GOOGLE_AUTH_CONFIG = {
  // Get this from Firebase Console > Project Settings > General > Web app
  webClientId: 'YOUR_WEB_CLIENT_ID_FROM_FIREBASE_CONSOLE',
  
  // Optional configurations
  offlineAccess: true, // If you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // Restrict to a particular hosted domain (optional)
  forceConsentPrompt: true, // Force user to select account on each login
  accountName: '', // [Android] specifies an account name on the device that should be used
  
  // iOS specific
  iosClientId: 'YOUR_IOS_CLIENT_ID_FROM_FIREBASE_CONSOLE', // Optional, for iOS
  
  // Scopes you want to access (optional)
  scopes: [
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',
  ],
};

// Instructions to get your Web Client ID:
// 1. Go to Firebase Console (https://console.firebase.google.com/)
// 2. Select your project
// 3. Go to Project Settings (gear icon)
// 4. Scroll down to "Your apps" section
// 5. If you don't have a Web app, click "Add app" > Web
// 6. Copy the "Web client ID" from the Web app configuration
// 7. Replace 'YOUR_WEB_CLIENT_ID_FROM_FIREBASE_CONSOLE' above with your actual Web Client ID
