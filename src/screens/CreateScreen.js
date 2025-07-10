import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Modal,
  Alert,
  Dimensions,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Slider from '@react-native-community/slider';
import { API } from '../config/api';
import { colors } from '../assets/styles/colors';

const { width } = Dimensions.get('window');

const CreateScreen = ({ navigation, route }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(route.params?.photoUri || null);
  const [selectedEmoji, setSelectedEmoji] = useState(1);
  const [previewReady, setPreviewReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSplitView, setShowSplitView] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [sliders, setSliders] = useState({
    blendIntensity: 75,
    expressionMatch: 60,
    colorAdjustment: 50,
  });
  const [refreshing, setRefreshing] = useState(false);

  const emojis = [
    { id: 1, emoji: '😀' },
    { id: 2, emoji: '😍' },
    { id: 3, emoji: '🤣' },
    { id: 4, emoji: '😎' },
    { id: 5, emoji: '🥳' },
    { id: 6, emoji: '😇' },
    { id: 7, emoji: '🤩' },
    { id: 8, emoji: '😜' },
  ];

  const handlePhotoUpload = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert("Permission required", "Please grant permission to access photos.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        await processImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      setError('Failed to select image. Please try again.');
    }
  };

  const handleTakePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert("Camera permission required", "Please grant camera permission to take photos.");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        await processImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      setError('Failed to take photo. Please try again.');
    }
  };

  const processImage = async (uri) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // First detect faces
      const detectionResult = await API.detectFaces(uri);
      
      if (!detectionResult.faces || detectionResult.faces.length === 0) {
        throw new Error('No faces detected in the image');
      }
      
      // Then process with emoji
      const emojiConfig = {
        emojiId: selectedEmoji,
        ...sliders
      };
      
      const processedImage = await API.processImage(uri, emojiConfig);
      
      // Create a local URI for the processed image
      const localUri = `${FileSystem.cacheDirectory}processed_${Date.now()}.jpg`;
      await FileSystem.writeAsStringAsync(localUri, processedImage, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
      setSelectedPhoto(localUri);
      setPreviewReady(true);
    } catch (error) {
      console.error('Error processing image:', error);
      setError(error.message || 'Failed to process image');
    } finally {
      setIsLoading(false);
      setIsProcessing(false);
    }
  };

  const handleSliderChange = (value, sliderName) => {
    const newSliders = {
      ...sliders,
      [sliderName]: value,
    };
    
    setSliders(newSliders);
    
    // If we have a photo and preview is ready, reprocess with new settings
    if (selectedPhoto && previewReady) {
      processImage(selectedPhoto);
    }
  };

  const resetSliders = () => {
    setSliders({
      blendIntensity: 75,
      expressionMatch: 60,
      colorAdjustment: 50,
    });
  };

  const handleTryAnother = () => {
    setSelectedPhoto(null);
    setPreviewReady(false);
  };

  const handleCreateSwap = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowConfirmDialog(false);
      // Navigate to result screen
      navigation.navigate('Result', { photoUri: selectedPhoto });
    }, 2000);
  };

  const handleNavigation = (screen) => {
    if (selectedPhoto && !isProcessing) {
      setShowConfirmDialog(true);
      setPendingNavigation(screen);
    } else {
      navigation.navigate(screen);
    }
  };

  const confirmNavigation = () => {
    if (pendingNavigation) {
      navigation.navigate(pendingNavigation);
    }
    setShowConfirmDialog(false);
    setPendingNavigation(null);
  };

  const cancelNavigation = () => {
    setShowConfirmDialog(false);
    setPendingNavigation(null);
  };

  const retakePhoto = () => {
    setSelectedPhoto(null);
    setPreviewReady(false);
    setError(null);
  };

  const handleRetry = () => {
    setError(null);
    if (selectedPhoto) {
      processImage(selectedPhoto);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    if (selectedPhoto) {
      processImage(selectedPhoto).finally(() => setRefreshing(false));
    } else {
      setRefreshing(false);
    }
  };

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Ionicons name="warning" size={60} color={colors.danger} style={styles.errorIcon} />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={handleRetry}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.retryButtonText}>Try Again</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Ionicons name="camera-off" size={60} color={colors.gray} style={styles.errorIcon} />
        <Text style={styles.errorText}>No access to camera</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => handleNavigation('Home')}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => handleNavigation('Home')}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create New Swap</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="help-circle" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={styles.photoInputContainer}>
          {!selectedPhoto ? (
            <TouchableOpacity
              style={styles.uploadArea}
              onPress={handlePhotoUpload}
            >
              <Ionicons name="camera" size={48} color={colors.accent} />
              <Text style={styles.uploadText}>Tap to select a photo</Text>
              <Text style={styles.uploadSubtext}>or use one of the options below</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.photoPreview}>
              <Image source={{ uri: selectedPhoto }} style={styles.previewImage} />
              {(isProcessing || isLoading) && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={colors.primary} />
                  <Text style={styles.loadingText}>
                    {isProcessing ? 'Processing...' : 'Applying changes...'}
                  </Text>
                </View>
              )}
            </View>
          )}

          <View style={styles.photoButtons}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleTakePhoto}
            >
              <Ionicons name="camera" size={20} color={colors.white} />
              <Text style={styles.primaryButtonText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handlePhotoUpload}
            >
              <Ionicons name="image" size={20} color={colors.accent} />
              <Text style={styles.secondaryButtonText}>Upload Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.emojiSection}>
          <Text style={styles.sectionTitle}>Select Emoji Template</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.emojiScroll}
          >
            {emojis.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.emojiItem,
                  selectedEmoji === item.id ? styles.emojiItemSelected : styles.emojiItemDefault,
                ]}
                onPress={() => setSelectedEmoji(item.id)}
              >
                <Text style={[
                  styles.emojiText,
                  selectedEmoji === item.id ? styles.emojiTextSelected : styles.emojiTextDefault,
                ]}>{item.emoji}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.adjustmentsSection}>
          <View style={styles.adjustmentsHeader}>
            <Text style={styles.sectionTitle}>Adjustments</Text>
            <TouchableOpacity onPress={resetSliders}>
              <Text style={styles.resetButton}>Reset</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.sliderContainer}>
            <View style={styles.sliderHeader}>
              <View style={styles.sliderLabel}>
                <Ionicons name="options" size={20} color={colors.accent} />
                <Text style={styles.sliderText}>Blend Intensity</Text>
              </View>
              <Text style={styles.sliderValue}>{sliders.blendIntensity}%</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={sliders.blendIntensity}
              onValueChange={(value) => handleSliderChange(value, 'blendIntensity')}
              minimumTrackTintColor={colors.accent}
              maximumTrackTintColor={colors.textSecondary}
              thumbTintColor={colors.accent}
            />
          </View>

          <View style={styles.sliderContainer}>
            <View style={styles.sliderHeader}>
              <View style={styles.sliderLabel}>
                <Ionicons name="happy" size={20} color={colors.accent} />
                <Text style={styles.sliderText}>Expression Match</Text>
              </View>
              <Text style={styles.sliderValue}>{sliders.expressionMatch}%</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={sliders.expressionMatch}
              onValueChange={(value) => handleSliderChange(value, 'expressionMatch')}
              minimumTrackTintColor={colors.accent}
              maximumTrackTintColor={colors.textSecondary}
              thumbTintColor={colors.accent}
            />
          </View>

          <View style={styles.sliderContainer}>
            <View style={styles.sliderHeader}>
              <View style={styles.sliderLabel}>
                <Ionicons name="color-palette" size={20} color={colors.accent} />
                <Text style={styles.sliderText}>Color Adjustment</Text>
              </View>
              <Text style={styles.sliderValue}>{sliders.colorAdjustment}%</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={sliders.colorAdjustment}
              onValueChange={(value) => handleSliderChange(value, 'colorAdjustment')}
              minimumTrackTintColor={colors.accent}
              maximumTrackTintColor={colors.textSecondary}
              thumbTintColor={colors.accent}
            />
          </View>
        </View>
      </ScrollView>

      <Modal
        visible={showConfirmDialog}
        transparent
        animationType="fade"
        onRequestClose={cancelNavigation}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Unsaved Changes</Text>
            <Text style={styles.modalText}>
              You have unsaved changes. Are you sure you want to leave?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={cancelNavigation}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmNavigation}
              >
                <Text style={styles.confirmButtonText}>Leave</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorIcon: {
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: colors.danger,
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  retryButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 150,
    alignItems: 'center',
  },
  retryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  helpButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  photoInputContainer: {
    padding: 16,
  },
  uploadArea: {
    height: width * 0.8,
    backgroundColor: colors.white,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.accent,
    borderStyle: 'dashed',
    marginBottom: 16,
  },
  uploadText: {
    fontSize: 18,
    color: colors.textPrimary,
    marginTop: 16,
  },
  uploadSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  photoPreview: {
    height: width * 0.8,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  processingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    padding: 16,
    borderRadius: 8,
    gap: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    color: colors.white,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.accent,
    gap: 4,
  },
  secondaryButtonText: {
    fontSize: 16,
    color: colors.accent,
  },
  emojiSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  emojiList: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
    padding: 8,
  },
  emojiItem: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  emojiItemSelected: {
    borderColor: colors.accent,
  },
  emojiItemDefault: {
    borderColor: colors.border,
  },
  emojiText: {
    fontSize: 32,
  },
  emojiTextSelected: {
    color: colors.accent,
  },
  emojiTextDefault: {
    color: colors.textSecondary,
  },
  sliderSection: {
    padding: 16,
  },
  sliderTitle: {
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  sliderContainer: {
    padding: 8,
  },
  slider: {
    height: 40,
  },
  sliderValue: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  resetButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.secondary,
  },
  resetButtonText: {
    fontSize: 16,
    color: colors.white,
  },
  createButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButtonText: {
    fontSize: 16,
    color: colors.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    width: '90%',
    maxWidth: 300,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  modalText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  modalButton: {
    padding: 16,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: colors.secondary,
  },
  cancelButtonText: {
    fontSize: 16,
    color: colors.white,
  },
  confirmButton: {
    backgroundColor: colors.accent,
  },
  confirmButtonText: {
    fontSize: 16,
    color: colors.white,
  },
});

export default CreateScreen; 