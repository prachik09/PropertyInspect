# PropertyInspect CLI - React Native App

A professional property inspection mobile application built with React Native CLI.

## Features

- 🏠 Property Management
- 📷 AI-Powered Inspection
- 🎤 Voice Recording & Transcription
- 🔍 Smart Search & Filtering
- � **Real Google Authentication** (Firebase)
- 👤 User Profile Management
- 📱 Native Mobile Experience

## Prerequisites

- Node.js (>= 16)
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd PropInspectCLI
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies (iOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Configure Google Authentication**
   
   Before running the app, you need to set up Google Authentication:
   
   **Quick Setup:**
   1. Follow the detailed guide in `GOOGLE_AUTH_SETUP.md`
   2. Update `src/config/googleAuth.js` with your Firebase configuration
   3. Place Firebase configuration files in the correct locations

   **Required Files:**
   - `android/app/google-services.json` (from Firebase Console)
   - `ios/PropInspectCLI/GoogleService-Info.plist` (from Firebase Console)

5. **Configure React Native Vector Icons**
   
   **For Android:**
   - Add the following to `android/app/build.gradle`:
   ```gradle
   apply from: file("../../node_modules/react-native-vector-icons/platforms/android/build.gradle")
   ```

   **For iOS:**
   - Vector icons should be automatically configured after pod install

## Running the App

### Android
```bash
npm run android
```

### iOS
```bash
npm run ios
```

### Start Metro Bundler
```bash
npm start
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── StatusBar.js
│   └── BottomNavigation.js
├── screens/            # App screens
│   ├── LoginScreen.js
│   ├── HomeScreen.js
│   ├── SearchPropertiesScreen.js
│   ├── DetailsScreen.js
│   ├── InspectScreen.js
│   ├── InspectionStartScreen.js
│   └── ProfileScreen.js
├── utils/              # Utility functions and data
│   ├── mockData.js
│   ├── mockStorage.js
│   └── aiApis.js
└── App.js              # Main app component
```

## Key Dependencies

- **@react-navigation/native** - Navigation framework
- **@react-navigation/stack** - Stack navigator
- **react-native-vector-icons** - Icon library
- **react-native-image-picker** - Image selection
- **react-native-gesture-handler** - Gesture handling
- **react-native-screens** - Native screen optimization

## Features Overview

### 🔐 Authentication
- Google Sign-In simulation
- User session management
- Role-based access (Property Inspector)

### 🏠 Property Management
- Property listing and search
- Detailed property information
- Status management (Available, Pending, Sold)
- Property filtering and sorting

### 📷 AI-Powered Inspection
- Voice recording with transcription
- Photo analysis with feature detection
- Keyword extraction
- Automated report generation

### 👤 User Profile
- Profile management
- Settings and preferences
- App information and support

## Mock Data

The app uses mock data for demonstration purposes:
- Sample properties with images and details
- Simulated AI API responses
- Mock user authentication

## Customization

### Adding New Screens
1. Create a new screen file in `src/screens/`
2. Add navigation routes in `src/App.js`
3. Update bottom navigation if needed

### Styling
- All styles use React Native StyleSheet
- Consistent color scheme and design patterns
- Responsive design for different screen sizes

## Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx react-native start --reset-cache
   ```

2. **Android build issues**
   ```bash
   cd android && ./gradlew clean && cd ..
   npm run android
   ```

3. **iOS build issues**
   ```bash
   cd ios && pod install && cd ..
   npm run ios
   ```

### Icons not showing
- Ensure vector icons are properly linked
- For Android, verify the build.gradle configuration
- For iOS, check that pods are installed correctly

## Development

### Code Style
- Use functional components with hooks
- Follow React Native best practices
- Consistent naming conventions
- Proper error handling

### Testing
```bash
npm test
```

### Linting
```bash
npm run lint
```

## Future Enhancements

- [ ] Real API integration
- [ ] Offline support
- [ ] Push notifications
- [ ] Advanced AI features
- [ ] Report generation
- [ ] Multi-language support

## Support

For support and questions, contact the development team or refer to the React Native documentation.

## License

© 2025 PropertyInspect. All rights reserved.
