// src/App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, SafeAreaView, StatusBar as RNStatusBar } from 'react-native';
import StatusBar from './components/StatusBar';
import BottomNavigation from './components/BottomNavigation';

// Screen imports
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SearchPropertiesScreen from './screens/SearchPropertiesScreen';
import DetailsScreen from './screens/DetailsScreen';
import InspectScreen from './screens/InspectScreen';
import InspectionStartScreen from './screens/InspectionStartScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  const [activeTab, setActiveTab] = useState('home');

  const ScreenWithBottomNav = ({ children, currentTab = 'home', navigation }) => (
    <SafeAreaView style={styles.container}>
      <RNStatusBar backgroundColor="#000" barStyle="light-content" />
      <StatusBar />
      <View style={styles.content}>
        {children}
      </View>
      <BottomNavigation 
        activeTab={currentTab} 
        setActiveTab={setActiveTab} 
        navigation={navigation}
      />
    </SafeAreaView>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" 
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        
        <Stack.Screen name="Home">
          {(props) => (
            <ScreenWithBottomNav currentTab="home" navigation={props.navigation}>
              <HomeScreen {...props} setActiveTab={setActiveTab} />
            </ScreenWithBottomNav>
          )}
        </Stack.Screen>
        
        <Stack.Screen name="SearchProperties">
          {(props) => (
            <ScreenWithBottomNav currentTab="search" navigation={props.navigation}>
              <SearchPropertiesScreen {...props} />
            </ScreenWithBottomNav>
          )}
        </Stack.Screen>
        
        <Stack.Screen name="Inspect">
          {(props) => (
            <ScreenWithBottomNav currentTab="inspect" navigation={props.navigation}>
              <InspectScreen {...props} />
            </ScreenWithBottomNav>
          )}
        </Stack.Screen>
        
        <Stack.Screen name="Profile">
          {(props) => (
            <ScreenWithBottomNav currentTab="profile" navigation={props.navigation}>
              <ProfileScreen {...props} />
            </ScreenWithBottomNav>
          )}
        </Stack.Screen>
        
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="InspectionStart" component={InspectionStartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});

export default App;
