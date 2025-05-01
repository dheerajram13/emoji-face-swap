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
import { theme } from '../assets/styles/theme';

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
            <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Camera</Text>
        </View>
        <View style={styles.webPlaceholder}>
          <Ionicons name="camera" size={64} color={theme.colors.textSecondary} />
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
          <Ionicons name="arrow-back" size={24} color={theme.colors.white} />
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
            color={theme.colors.white}
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
                  color={theme.colors.white}
                  style={styles.statusIcon}
                />
                <Text style={styles.statusText}>
                  Position your face in the circle
                </Text>
              </View>
            )}

            {!isCameraReady && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color={theme.colors.white} />
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
                color={theme.colors.white}
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
    backgroundColor: theme.colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
  },
  backButton: {
    padding: theme.spacing.sm,
  },
  headerTitle: {
    ...theme.typography.heading,
    color: theme.colors.white,
  },
  flashButton: {
    padding: theme.spacing.sm,
  },
  flashButtonActive: {
    backgroundColor: theme.colors.accentPrimary,
    borderRadius: theme.borderRadius.circle,
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
    borderColor: theme.colors.white,
    opacity: 0.5,
  },
  faceCircleDetected: {
    borderColor: theme.colors.accentPrimary,
    opacity: 1,
  },
  faceDetectionStatus: {
    position: 'absolute',
    bottom: theme.spacing.xl,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: theme.spacing.sm,
  },
  statusIcon: {
    marginRight: theme.spacing.xs,
  },
  statusText: {
    color: theme.colors.white,
    ...theme.typography.body,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: theme.colors.white,
    marginTop: theme.spacing.md,
    ...theme.typography.body,
  },
  controls: {
    padding: theme.spacing.md,
  },
  previewControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  retakeButton: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.button,
    backgroundColor: theme.colors.secondary,
  },
  retakeButtonText: {
    color: theme.colors.white,
    ...theme.typography.button,
  },
  useButton: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.button,
    backgroundColor: theme.colors.accentPrimary,
  },
  useButtonText: {
    color: theme.colors.white,
    ...theme.typography.button,
  },
  cameraControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  flipButton: {
    padding: theme.spacing.md,
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  flashModeIndicator: {
    padding: theme.spacing.md,
  },
  flashModeText: {
    color: theme.colors.white,
    ...theme.typography.caption,
  },
  errorText: {
    color: theme.colors.error,
    ...theme.typography.body,
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
  webPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  webPlaceholderText: {
    color: theme.colors.textSecondary,
    ...theme.typography.body,
    textAlign: 'center',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  webButton: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.button,
    backgroundColor: theme.colors.accentPrimary,
  },
  webButtonText: {
    color: theme.colors.white,
    ...theme.typography.button,
  },
});

export default CameraScreen; 