// src/screens/DetailsScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const DetailsScreen = ({ route, navigation }) => {
  const { property, readOnly = false } = route.params;
  const [editableProperty, setEditableProperty] = useState({ ...property });
  const [isEditing, setIsEditing] = useState(!readOnly);
  const [saving, setSaving] = useState(false);

  const updateField = (field, value) => {
    setEditableProperty(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      Alert.alert('Success', 'Property details updated successfully!');
      navigation.goBack();
    }, 1000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={18} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Property Details</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Property Image Header */}
        <View style={styles.imageHeader}>
          <Image source={{ uri: editableProperty.image }} style={styles.propertyImage} />
          <View style={styles.imageOverlay} />
          
          <View style={styles.imageContent}>
            <Text style={styles.propertyTitle}>{editableProperty.name}</Text>
            <View style={styles.imageFooter}>
              <View style={styles.ratingContainer}>
                <Icon name="star" size={18} color="#F59E0B" />
                <Text style={styles.ratingText}>{editableProperty.rating}</Text>
              </View>
              <View style={[styles.statusBadge, editableProperty.status === 'Available' ? styles.availableBadge : styles.pendingBadge]}>
                <Text style={styles.statusText}>{editableProperty.status}</Text>
              </View>
            </View>
          </View>
          
          {!readOnly && (
            <TouchableOpacity
              style={[styles.editButton, isEditing && styles.editButtonActive]}
              onPress={() => setIsEditing(!isEditing)}
            >
              <Icon name={isEditing ? "check" : "edit-2"} size={20} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Property Details Form */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Property Information</Text>
          
          <View style={styles.formContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Property ID</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={editableProperty.id}
                onChangeText={(text) => updateField('id', text)}
                editable={isEditing}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Location</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={editableProperty.location}
                onChangeText={(text) => updateField('location', text)}
                editable={isEditing}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={[styles.input, !isEditing && styles.inputDisabled]}
                value={editableProperty.price.toString()}
                onChangeText={(text) => updateField('price', parseInt(text) || 0)}
                editable={isEditing}
                keyboardType="numeric"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Overview</Text>
              <TextInput
                style={[styles.textArea, !isEditing && styles.inputDisabled]}
                value={editableProperty.overview}
                onChangeText={(text) => updateField('overview', text)}
                editable={isEditing}
                multiline
                numberOfLines={4}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Status</Text>
              <View style={[styles.input, !isEditing && styles.inputDisabled]}>
                <Text style={[styles.statusValue, !isEditing && styles.disabledText]}>
                  {editableProperty.status}
                </Text>
              </View>
            </View>

            {isEditing && !readOnly && (
              <TouchableOpacity
                style={[styles.saveButton, saving && styles.saveButtonDisabled]}
                onPress={handleSave}
                disabled={saving}
              >
                {saving ? (
                  <View style={styles.savingContainer}>
                    <ActivityIndicator color="#fff" size="small" />
                    <Text style={styles.savingText}>Saving...</Text>
                  </View>
                ) : (
                  <View style={styles.saveContent}>
                    <Icon name="save" size={18} color="#fff" />
                    <Text style={styles.saveText}>Save Changes</Text>
                  </View>
                )}
              </TouchableOpacity>
            )}
          </View>
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
  },
  imageHeader: {
    position: 'relative',
    height: 256,
  },
  propertyImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  imageContent: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
  },
  propertyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  imageFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
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
    fontSize: 14,
    fontWeight: '600',
  },
  editButton: {
    position: 'absolute',
    top: 24,
    right: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 16,
  },
  editButtonActive: {
    backgroundColor: '#10B981',
  },
  formContainer: {
    backgroundColor: '#fff',
    margin: 24,
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 24,
  },
  formContent: {
    gap: 20,
  },
  inputGroup: {
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    backgroundColor: '#fff',
  },
  inputDisabled: {
    backgroundColor: '#F9FAFB',
    color: '#6B7280',
    borderColor: '#E5E7EB',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    minHeight: 96,
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  disabledText: {
    color: '#6B7280',
  },
  saveButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 24,
    paddingVertical: 20,
    paddingHorizontal: 24,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginTop: 8,
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  savingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  savingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  saveContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 12,
  },
});

export default DetailsScreen;
