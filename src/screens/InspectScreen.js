// src/screens/InspectScreen.js
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { mockProperties } from '../utils/mockData';

const PropertyItem = ({ property, navigation }) => (
  <View style={styles.propertyCard}>
    <View style={styles.cardContent}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: property.image }} style={styles.propertyImage} />
      </View>
      
      <View style={styles.propertyInfo}>
        <Text style={styles.propertyName} numberOfLines={1}>{property.name}</Text>
        <View style={styles.locationContainer}>
          <Icon name="map-pin" size={10} color="#EF4444" />
          <Text style={styles.location} numberOfLines={1}>{property.location}</Text>
        </View>
        <View style={styles.ratingStatusContainer}>
          <View style={styles.ratingContainer}>
            <Icon name="star" size={10} color="#F59E0B" />
            <Text style={styles.rating}>{property.rating}</Text>
          </View>
          <View style={[styles.statusChip, property.status === 'Available' ? styles.availableChip : styles.pendingChip]}>
            <Text style={styles.statusText}>{property.status}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate('Details', { property })}
        >
          <Text style={styles.detailsButtonText}>Details</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('InspectionStart', { propertyId: property.id, property })}
        >
          <Icon name="play" size={8} color="#fff" style={styles.playIcon} />
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
);

const InspectScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Properties to Inspect</Text>
          <Text style={styles.headerSubtitle}>{mockProperties.length} properties pending</Text>
        </View>
        
        <View style={styles.propertiesList}>
          {mockProperties.map(property => (
            <PropertyItem 
              key={property.id} 
              property={property} 
              navigation={navigation}
            />
          ))}
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
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    backgroundColor: '#3B82F6',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  propertiesList: {
    gap: 12,
  },
  propertyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    width: 80,
    height: 64,
  },
  propertyImage: {
    width: '100%',
    height: '100%',
  },
  propertyInfo: {
    flex: 1,
    padding: 12,
  },
  propertyName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  location: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    flex: 1,
  },
  ratingStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
    marginLeft: 4,
  },
  statusChip: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  availableChip: {
    backgroundColor: '#D1FAE5',
  },
  pendingChip: {
    backgroundColor: '#FEF3C7',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionButtons: {
    padding: 8,
    gap: 4,
  },
  detailsButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    color: '#3B82F6',
    fontSize: 12,
    fontWeight: '500',
  },
  startButton: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  playIcon: {
    marginRight: 4,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default InspectScreen;
