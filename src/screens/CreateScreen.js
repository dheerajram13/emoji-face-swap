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
import { theme } from '../assets/styles/theme';

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
          <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create New Swap</Text>
        <TouchableOpacity style={styles.helpButton}>
          <Ionicons name="help-circle" size={24} color={theme.colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.photoInputContainer}>
          {!selectedPhoto ? (
            <TouchableOpacity
              style={styles.uploadArea}
              onPress={handlePhotoUpload}
            >
              <Ionicons name="camera" size={48} color={theme.colors.accentPrimary} />
              <Text style={styles.uploadText}>Tap to select a photo</Text>
              <Text style={styles.uploadSubtext}>or use one of the options below</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.photoPreview}>
              <Image source={{ uri: selectedPhoto }} style={styles.previewImage} />
              {isProcessing && (
                <View style={styles.processingOverlay}>
                  <ActivityIndicator size="large" color={theme.colors.white} />
                </View>
              )}
            </View>
          )}

          <View style={styles.photoButtons}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleTakePhoto}
            >
              <Ionicons name="camera" size={20} color={theme.colors.white} />
              <Text style={styles.primaryButtonText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handlePhotoUpload}
            >
              <Ionicons name="image" size={20} color={theme.colors.accentPrimary} />
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
                  selectedEmoji === item.id && styles.emojiItemSelected,
                ]}
                onPress={() => setSelectedEmoji(item.id)}
              >
                <Text style={styles.emojiText}>{item.emoji}</Text>
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
                <Ionicons name="options" size={20} color={theme.colors.accentPrimary} />
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
              minimumTrackTintColor={theme.colors.accentPrimary}
              maximumTrackTintColor={theme.colors.textSecondary}
              thumbTintColor={theme.colors.accentPrimary}
            />
          </View>

          <View style={styles.sliderContainer}>
            <View style={styles.sliderHeader}>
              <View style={styles.sliderLabel}>
                <Ionicons name="happy" size={20} color={theme.colors.accentPrimary} />
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
              minimumTrackTintColor={theme.colors.accentPrimary}
              maximumTrackTintColor={theme.colors.textSecondary}
              thumbTintColor={theme.colors.accentPrimary}
            />
          </View>

          <View style={styles.sliderContainer}>
            <View style={styles.sliderHeader}>
              <View style={styles.sliderLabel}>
                <Ionicons name="color-palette" size={20} color={theme.colors.accentPrimary} />
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
              minimumTrackTintColor={theme.colors.accentPrimary}
              maximumTrackTintColor={theme.colors.textSecondary}
              thumbTintColor={theme.colors.accentPrimary}
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
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.textSecondary,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerTitle: {
    ...theme.typography.heading,
    color: theme.colors.textPrimary,
  },
  helpButton: {
    padding: theme.spacing.sm,
  },
  content: {
    flex: 1,
  },
  photoInputContainer: {
    padding: theme.spacing.md,
  },
  uploadArea: {
    height: width * 0.8,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.accentPrimary,
    borderStyle: 'dashed',
    marginBottom: theme.spacing.md,
  },
  uploadText: {
    ...theme.typography.subheading,
    color: theme.colors.textPrimary,
    marginTop: theme.spacing.md,
  },
  uploadSubtext: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  photoPreview: {
    height: width * 0.8,
    borderRadius: theme.borderRadius.card,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
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
    gap: theme.spacing.md,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.accentPrimary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.button,
    gap: theme.spacing.xs,
  },
  primaryButtonText: {
    ...theme.typography.button,
    color: theme.colors.white,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.white,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.button,
    borderWidth: 1,
    borderColor: theme.colors.accentPrimary,
    gap: theme.spacing.xs,
  },
  secondaryButtonText: {
    ...theme.typography.button,
    color: theme.colors.accentPrimary,
  },
  emojiSection: {
    padding: theme.spacing.md,
  },
  sectionTitle: {
    ...theme.typography.subheading,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  emojiScroll: {
    marginBottom: theme.spacing.md,
  },
  emojiItem: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
    ...theme.shadows.light,
  },
  emojiItemSelected: {
    borderWidth: 2,
    borderColor: theme.colors.accentPrimary,
  },
  emojiText: {
    fontSize: 32,
  },
  adjustmentsSection: {
    padding: theme.spacing.md,
  },
  adjustmentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  resetButton: {
    ...theme.typography.button,
    color: theme.colors.accentPrimary,
  },
  sliderContainer: {
    marginBottom: theme.spacing.lg,
  },
  sliderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  sliderLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  sliderText: {
    ...theme.typography.body,
    color: theme.colors.textPrimary,
  },
  sliderValue: {
    ...theme.typography.caption,
    color: theme.colors.textSecondary,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.card,
    padding: theme.spacing.lg,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    ...theme.typography.heading,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  modalText: {
    ...theme.typography.body,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.lg,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: theme.spacing.md,
  },
  modalButton: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.button,
  },
  cancelButton: {
    backgroundColor: theme.colors.background,
  },
  confirmButton: {
    backgroundColor: theme.colors.accentPrimary,
  },
  cancelButtonText: {
    ...theme.typography.button,
    color: theme.colors.textPrimary,
  },
  confirmButtonText: {
    ...theme.typography.button,
    color: theme.colors.white,
  },
});

export default CreateScreen; 