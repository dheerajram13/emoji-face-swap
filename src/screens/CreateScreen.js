import React, { useState, useRef } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Slider from '@react-native-community/slider';
import { colors } from '../assets/styles/colors';

const { width } = Dimensions.get('window');

const CreateScreen = ({ navigation, route }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(route.params?.photoUri || null);
  const [selectedEmoji, setSelectedEmoji] = useState(1);
  const [previewReady, setPreviewReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSplitView, setShowSplitView] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState(null);
  const [sliders, setSliders] = useState({
    blendIntensity: 75,
    expressionMatch: 60,
    colorAdjustment: 50,
  });

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
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedPhoto(result.assets[0].uri);
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          setPreviewReady(true);
        }, 1500);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handleTakePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedPhoto(result.assets[0].uri);
        setIsProcessing(true);
        setTimeout(() => {
          setIsProcessing(false);
          setPreviewReady(true);
        }, 1500);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
    }
  };

  const handleSliderChange = (value, sliderName) => {
    setSliders({
      ...sliders,
      [sliderName]: value,
    });
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

      <ScrollView style={styles.content}>
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
              {isProcessing && (
                <View style={styles.processingOverlay}>
                  <ActivityIndicator size="large" color={colors.white} />
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