import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { API } from '../config/api';
import { colors } from '../assets/styles/colors';

const { width } = Dimensions.get('window');

const CameraScreen = ({ navigation }) => {
  const [cameraMode, setCameraMode] = useState('front');
  const [flashMode, setFlashMode] = useState('auto');
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (isCameraReady) {
      setIsFaceDetected(false);
      const timer = setTimeout(() => {
        setIsFaceDetected(true);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [cameraMode, isCameraReady]);

  const toggleCameraMode = () => {
    setCameraMode((prev) => (prev === 'front' ? 'back' : 'front'));
  };

  const toggleFlashMode = () => {
    const modes = ['auto', 'on', 'off'];
    const currentIndex = modes.indexOf(flashMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setFlashMode(modes[nextIndex]);
  };

  const capturePhoto = async () => {
    if (cameraRef.current) {
      try {
        setIsProcessing(true);
        setError(null);
        
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
          base64: true,
        });
        
        // Process the captured photo
        await processCapturedPhoto(photo.uri);
        
      } catch (error) {
        console.error('Error capturing photo:', error);
        setError('Failed to capture photo. Please try again.');
        setIsProcessing(false);
      }
    }
  };
  
  const processCapturedPhoto = async (photoUri) => {
    try {
      // First detect faces
      const detectionResult = await API.detectFaces(photoUri);
      
      if (!detectionResult.faces || detectionResult.faces.length === 0) {
        throw new Error('No faces detected in the photo');
      }
      
      // If face is detected, set the photo
      setCapturedPhoto(photoUri);
      
    } catch (error) {
      console.error('Error processing photo:', error);
      setError(error.message || 'Failed to process photo');
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    setError(null);
  };

  const usePhoto = () => {
    if (capturedPhoto) {
      navigation.navigate('Create', { photoUri: capturedPhoto });
    }
  };
  
  const handleRetry = () => {
    setError(null);
    if (capturedPhoto) {
      processCapturedPhoto(capturedPhoto);
    } else {
      capturePhoto();
    }
  };

  const getFlashIcon = () => {
    switch (flashMode) {
      case 'auto':
        return 'flash';
      case 'on':
        return 'flash';
      case 'off':
        return 'flash-off';
      default:
        return 'flash';
    }
  };

  if (hasPermission === null) {
    return <View style={styles.container} />;
  }

  // Render error state
  if (error) {
    return (
      <View style={styles.controls}>
        <TouchableOpacity 
          style={[styles.controlButton, isProcessing && styles.disabledButton]} 
          onPress={toggleCameraMode}
          disabled={isProcessing}
        >
          <Ionicons 
            name="camera-reverse" 
            size={32} 
            color={isProcessing ? colors.gray : 'white'} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.captureButton, isProcessing && styles.captureButtonDisabled]} 
          onPress={capturePhoto}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <View style={styles.captureButtonInner} />
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.controlButton, isProcessing && styles.disabledButton]} 
          onPress={toggleFlashMode}
          disabled={isProcessing}
        >
          <Ionicons 
            name={getFlashIcon()} 
            size={32} 
            color={isProcessing ? colors.gray : 'white'} 
          />
        </TouchableOpacity>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Ionicons name="camera-off" size={60} color={colors.gray} style={styles.errorIcon} />
        <Text style={styles.errorText}>No access to camera</Text>
      </View>
    );
  }

  // For web platform, show a placeholder since camera access is limited
  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Camera</Text>
        </View>
        <View style={styles.webPlaceholder}>
          <Ionicons name="camera" size={64} color={colors.textSecondary} />
          <Text style={styles.webPlaceholderText}>
            Camera access is limited on web. Please use the mobile app for full camera functionality.
          </Text>
          <TouchableOpacity
            style={styles.webButton}
            onPress={() => navigation.navigate('Create')}
          >
            <Text style={styles.webButtonText}>Upload Photo Instead</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={cameraMode === 'front' ? Camera.Constants.Type.front : Camera.Constants.Type.back}
          flashMode={flashMode}
          ref={cameraRef}
          onCameraReady={() => setIsCameraReady(true)}
          onMountError={(error) => {
            console.error('Camera mount error:', error);
            setError('Failed to load camera. Please restart the app.');
          }}
        >
          <View style={styles.faceGuidelines}>
            <View style={[
              styles.faceCircle,
              isFaceDetected && styles.faceCircleDetected,
            ]} />
          </View>

          {!isFaceDetected && (
            <View style={styles.faceDetectionStatus}>
              <Ionicons
                name="search"
                size={16}
                color="white"
                style={styles.statusIcon}
              />
              <Text style={styles.statusText}>
                Position your face in the circle
              </Text>
            </View>
          )}

          {!isCameraReady && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="white" />
              <Text style={styles.loadingText}>Initializing camera...</Text>
            </View>
          )}
        </Camera>
      </View>

      <View style={styles.controls}>
        {capturedPhoto ? (
          <View style={styles.previewControls}>
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={retakePhoto}
            >
              <Ionicons name="refresh" size={24} color="white" />
              <Text style={styles.retakeButtonText}>Retake</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.useButton}
              onPress={usePhoto}
            >
              <Ionicons name="checkmark" size={24} color="white" />
              <Text style={styles.useButtonText}>Use Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.cameraControls}>
            <TouchableOpacity
              style={[styles.controlButton, isProcessing && styles.disabledButton]}
              onPress={toggleCameraMode}
              disabled={isProcessing}
            >
              <Ionicons
                name="camera-reverse"
                size={28}
                color="white"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.captureButton, isProcessing && styles.captureButtonDisabled]}
              onPress={capturePhoto}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <View style={styles.captureButtonInner} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.controlButton, isProcessing && styles.disabledButton]}
              onPress={toggleFlashMode}
              disabled={isProcessing}
            >
              <Ionicons
                name={getFlashIcon()}
                size={28}
                color={isProcessing ? colors.gray : 'white'}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  cameraContainer: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorIcon: {
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  faceGuidelines: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  faceCircleDetected: {
    borderColor: colors.accent,
  },
  faceDetectionStatus: {
    position: 'absolute',
    top: '70%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  statusIcon: {
    marginBottom: 8,
  },
  statusText: {
    color: 'white',
    fontSize: 14,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    marginTop: 10,
  },
  controls: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  previewControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  retakeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  useButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 25,
    backgroundColor: colors.accent,
  },
  retakeButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
  },
  useButtonText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 5,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  captureButtonInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
  },
  disabledButton: {
    opacity: 0.5,
  },
  captureButtonDisabled: {
    opacity: 0.7,
    backgroundColor: colors.gray,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  backButton: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 18,
    color: colors.textPrimary,
  },
  flashButton: {
    padding: 16,
  },
  flashButtonActive: {
    backgroundColor: colors.accent,
    borderRadius: 8,
  },
  cameraContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  preview: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  faceGuidelines: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faceCircle: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    borderWidth: 2,
    borderColor: colors.white,
    opacity: 0.5,
  },
  faceCircleDetected: {
    borderColor: colors.accent,
    opacity: 1,
  },
  faceDetectionStatus: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
  },
  statusIcon: {
    marginRight: 8,
  },
  statusText: {
    color: colors.white,
    fontSize: 16,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: colors.white,
    marginTop: 16,
    fontSize: 16,
  },
  controls: {
    padding: 16,
  },
  previewControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  retakeButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.secondary,
  },
  retakeButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  useButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.accent,
  },
  useButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  flipButton: {
    padding: 16,
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  flashModeIndicator: {
    padding: 16,
  },
  flashModeText: {
    color: colors.white,
    fontSize: 14,
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 24,
  },
  webPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  webPlaceholderText: {
    color: colors.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  webButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.accent,
  },
  webButtonText: {
    color: colors.white,
    fontSize: 16,
  },
});

export default CameraScreen; 