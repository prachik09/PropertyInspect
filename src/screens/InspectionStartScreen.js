// src/screens/InspectionStartScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { launchImageLibrary } from 'react-native-image-picker';
import { callGeminiAPI, callCLIPAPI } from '../utils/aiApis';

const InspectionStartScreen = ({ route, navigation }) => {
  const { propertyId, property } = route.params;
  const [recording, setRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectedAmenities, setDetectedAmenities] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRecord = async () => {
    if (recording) {
      setRecording(false);
      setLoading(true);
      
      setTimeout(async () => {
        const mockTranscription = "The property showcases excellent natural lighting throughout all rooms. Modern kitchen with stainless steel appliances. Living area is spacious with hardwood flooring. Overall condition is very good.";
        setTranscription(mockTranscription);
        
        try {
          const extractedKeywords = await callGeminiAPI(mockTranscription);
          setKeywords(extractedKeywords);
        } catch (error) {
          setKeywords(["natural lighting", "modern appliances", "spacious", "hardwood floors"]);
        }
        
        setLoading(false);
      }, 2500);
    } else {
      setRecording(true);
      setTranscription('');
      setKeywords([]);
    }
  };

  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel || response.error) {
        return;
      }

      if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        setSelectedImage(imageUri);
        setLoading(true);
        
        try {
          const detectedItems = await callCLIPAPI(imageUri);
          setDetectedAmenities(detectedItems);
        } catch (error) {
          setDetectedAmenities(["Kitchen Island", "Modern Appliances", "Granite Countertops"]);
        }
        
        setLoading(false);
      }
    });
  };

  const handleComplete = () => {
    Alert.alert(
      'Inspection Complete',
      'Inspection completed successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Inspect'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={18} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Inspection</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Property Header */}
        <View style={styles.propertyHeader}>
          <Image source={{ uri: property.image }} style={styles.propertyImage} />
          <View style={styles.propertyInfo}>
            <Text style={styles.propertyName}>{property.name}</Text>
            <View style={styles.locationContainer}>
              <Icon name="map-pin" size={16} color="#EF4444" />
              <Text style={styles.location}>{property.location}</Text>
            </View>
          </View>
        </View>

        {/* Voice Recording */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Icon name="mic" size={18} color="#3B82F6" />
            <Text style={styles.sectionTitle}>Voice Recording</Text>
          </View>
          
          <TouchableOpacity
            style={[styles.recordButton, recording && styles.recordingButton]}
            onPress={handleRecord}
            disabled={loading}
          >
            {recording ? (
              <View style={styles.recordingContent}>
                <View style={styles.recordingIndicator} />
                <Text style={styles.recordingText}>Recording...</Text>
              </View>
            ) : (
              <View style={styles.recordContent}>
                <Icon name="mic" size={20} color="#fff" />
                <Text style={styles.recordText}>Start Recording</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Photo Analysis */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Icon name="camera" size={18} color="#10B981" />
            <Text style={styles.sectionTitle}>Photo Analysis</Text>
          </View>
          
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleImageUpload}
            disabled={loading}
          >
            <Icon name="upload" size={18} color="#fff" />
            <Text style={styles.uploadText}>Upload Photo</Text>
          </TouchableOpacity>
          
          {selectedImage && (
            <View style={styles.imagePreview}>
              <Image source={{ uri: selectedImage }} style={styles.previewImage} />
            </View>
          )}
        </View>

        {/* AI Results */}
        {transcription ? (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>AI Transcription</Text>
            <View style={styles.transcriptionContainer}>
              <Text style={styles.transcriptionText}>{transcription}</Text>
            </View>
          </View>
        ) : null}

        {keywords.length > 0 && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Keywords</Text>
            <View style={styles.chipsContainer}>
              {keywords.map((keyword, index) => (
                <View key={index} style={styles.keywordChip}>
                  <Text style={styles.keywordText}>{keyword}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {detectedAmenities.length > 0 && (
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Detected Features</Text>
            <View style={styles.chipsContainer}>
              {detectedAmenities.map((amenity, index) => (
                <View key={index} style={styles.amenityChip}>
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {loading && (
          <View style={styles.loadingCard}>
            <ActivityIndicator color="#3B82F6" size="large" />
            <Text style={styles.loadingText}>Processing...</Text>
          </View>
        )}

        {/* Complete Button */}
        <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
          <Icon name="check" size={20} color="#fff" />
          <Text style={styles.completeText}>Complete Inspection</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  backButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    paddingBottom: 120,
  },
  propertyHeader: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  propertyImage: {
    width: 64,
    height: 64,
    borderRadius: 16,
    marginRight: 16,
  },
  propertyInfo: {
    flex: 1,
  },
  propertyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    color: '#6B7280',
    fontSize: 16,
    marginLeft: 8,
  },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginLeft: 12,
  },
  recordButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 24,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  recordingButton: {
    backgroundColor: '#EF4444',
  },
  recordingContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordingIndicator: {
    width: 12,
    height: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginRight: 12,
  },
  recordingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  recordContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  uploadButton: {
    backgroundColor: '#10B981',
    borderRadius: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  uploadText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  imagePreview: {
    marginTop: 16,
  },
  previewImage: {
    width: '100%',
    height: 160,
    borderRadius: 16,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 12,
  },
  transcriptionContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
  },
  transcriptionText: {
    color: '#1F2937',
    fontSize: 16,
    lineHeight: 24,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  keywordChip: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  keywordText: {
    color: '#3B82F6',
    fontSize: 14,
    fontWeight: '600',
  },
  amenityChip: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  amenityText: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '600',
  },
  loadingCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 32,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    alignItems: 'center',
  },
  loadingText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
  },
  completeButton: {
    backgroundColor: '#10B981',
    borderRadius: 24,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  completeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});

export default InspectionStartScreen;
