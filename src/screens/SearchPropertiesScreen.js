// src/screens/SearchPropertiesScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { mockProperties } from '../utils/mockData';

const PropertyCard = ({ property, onPress }) => (
  <TouchableOpacity style={styles.propertyCard} onPress={onPress}>
    <View style={styles.imageContainer}>
      <Image source={{ uri: property.image }} style={styles.propertyImage} />
      <View style={[styles.statusBadge, property.status === 'Available' ? styles.availableBadge : styles.pendingBadge]}>
        <Text style={styles.statusText}>{property.status}</Text>
      </View>
      <View style={styles.typeBadge}>
        <Text style={styles.typeText}>{property.type}</Text>
      </View>
    </View>
    
    <View style={styles.propertyInfo}>
      <View style={styles.propertyHeader}>
        <Text style={styles.propertyName}>{property.name}</Text>
        <View style={styles.ratingContainer}>
          <Icon name="star" size={16} color="#F59E0B" />
          <Text style={styles.rating}>{property.rating}</Text>
        </View>
      </View>
      
      <View style={styles.locationContainer}>
        <Icon name="map-pin" size={16} color="#EF4444" />
        <Text style={styles.location}>{property.location}</Text>
      </View>
      
      <View style={styles.priceContainer}>
        <Icon name="dollar-sign" size={20} color="#10B981" />
        <Text style={styles.price}>${property.price.toLocaleString()}</Text>
      </View>
      
      <View style={styles.amenitiesContainer}>
        {property.amenities.slice(0, 3).map((amenity, index) => (
          <View key={index} style={styles.amenityChip}>
            <Text style={styles.amenityText}>{amenity}</Text>
          </View>
        ))}
        {property.amenities.length > 3 && (
          <View style={styles.moreChip}>
            <Text style={styles.moreText}>+{property.amenities.length - 3} more</Text>
          </View>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

const SearchPropertiesScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      if (searchQuery.trim() === '') {
        setFilteredProperties(mockProperties);
      } else {
        const filtered = mockProperties.filter(property => {
          const searchLower = searchQuery.toLowerCase();
          return (
            property.name.toLowerCase().includes(searchLower) ||
            property.location.toLowerCase().includes(searchLower) ||
            property.amenities.some(amenity => amenity.toLowerCase().includes(searchLower)) ||
            property.type.toLowerCase().includes(searchLower)
          );
        });
        setFilteredProperties(filtered);
      }
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search properties..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
          {loading && (
            <ActivityIndicator color="#3B82F6" size="small" style={styles.loadingIcon} />
          )}
        </View>
        
        <View style={styles.searchFooter}>
          <Text style={styles.resultsText}>
            {filteredProperties.length} Properties
          </Text>
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="filter" size={16} color="#3B82F6" />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#3B82F6" size="large" />
          </View>
        ) : (
          <>
            {filteredProperties.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Icon name="search" size={64} color="#D1D5DB" />
                <Text style={styles.emptyTitle}>No properties found</Text>
                <Text style={styles.emptySubtitle}>Try adjusting your search terms</Text>
              </View>
            ) : (
              filteredProperties.map(property => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  onPress={() => navigation.navigate('Details', { property, readOnly: true })}
                />
              ))
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  searchHeader: {
    backgroundColor: '#fff',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 16,
    zIndex: 1,
  },
  searchInput: {
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    paddingLeft: 48,
    paddingRight: 48,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  loadingIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  searchFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultsText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  filterText: {
    color: '#3B82F6',
    fontWeight: '600',
    marginLeft: 8,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingBottom: 100,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 48,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  propertyCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 192,
  },
  propertyImage: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availableBadge: {
    backgroundColor: '#10B981',
  },
  pendingBadge: {
    backgroundColor: '#F59E0B',
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  typeBadge: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  propertyInfo: {
    padding: 20,
  },
  propertyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    color: '#6B7280',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    color: '#10B981',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  amenityChip: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  amenityText: {
    color: '#3B82F6',
    fontSize: 12,
    fontWeight: '500',
  },
  moreChip: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  moreText: {
    color: '#6B7280',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default SearchPropertiesScreen;
