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
} from 'react-native';
import { Camera } from 'expo-camera';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../assets/styles/colors';

const { width } = Dimensions.get('window');

const CameraScreen = ({ navigation }) => {
  const [cameraMode, setCameraMode] = useState('front');
  const [flashMode, setFlashMode] = useState('auto');
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

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
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: true,
        });
        setCapturedPhoto(photo.uri);
      } catch (error) {
        console.error('Error capturing photo:', error);
      }
    }
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
  };

  const usePhoto = () => {
    navigation.navigate('Create', { photoUri: capturedPhoto });
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

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
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
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Camera</Text>
        <TouchableOpacity
          style={[
            styles.flashButton,
            flashMode === 'on' && styles.flashButtonActive,
          ]}
          onPress={toggleFlashMode}
        >
          <Ionicons
            name={getFlashIcon()}
            size={24}
            color={colors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.cameraContainer}>
        {capturedPhoto ? (
          <Image source={{ uri: capturedPhoto }} style={styles.preview} />
        ) : (
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={cameraMode === 'front' ? 'front' : 'back'}
            flashMode={flashMode}
            onCameraReady={() => setIsCameraReady(true)}
          >
            <View style={styles.faceGuidelines}>
              <View
                style={[
                  styles.faceCircle,
                  isFaceDetected && styles.faceCircleDetected,
                ]}
              />
            </View>

            {!isFaceDetected && (
              <View style={styles.faceDetectionStatus}>
                <Ionicons
                  name="search"
                  size={16}
                  color={colors.textPrimary}
                  style={styles.statusIcon}
                />
                <Text style={styles.statusText}>
                  Position your face in the circle
                </Text>
              </View>
            )}

            {!isCameraReady && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color={colors.textPrimary} />
                <Text style={styles.loadingText}>Initializing camera...</Text>
              </View>
            )}
          </Camera>
        )}
      </View>

      <View style={styles.controls}>
        {capturedPhoto ? (
          <View style={styles.previewControls}>
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={retakePhoto}
            >
              <Text style={styles.retakeButtonText}>Retake</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.useButton}
              onPress={usePhoto}
            >
              <Text style={styles.useButtonText}>Use Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.cameraControls}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={toggleCameraMode}
            >
              <Ionicons
                name="camera-reverse"
                size={24}
                color={colors.textPrimary}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.captureButton}
              onPress={capturePhoto}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>

            <View style={styles.flashModeIndicator}>
              <Text style={styles.flashModeText}>{flashMode}</Text>
            </View>
          </View>
        )}
      </View>
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