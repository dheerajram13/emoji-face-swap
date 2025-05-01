# FaceSwap AI

A React Native application for creating and sharing emoji face swaps. Built with Expo and React Native.

## Features

- Camera integration with face detection
- Photo upload and gallery access
- Emoji selection and face swap creation
- Image adjustments and filters
- Social sharing capabilities
- Cross-platform support (iOS, Android, Web)

## Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development)
- Android Studio (for Android development)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/emoji-face-swap.git
cd emoji-face-swap
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

## Development

- `npm start` - Start the Expo development server
- `npm run android` - Start the Android app
- `npm run ios` - Start the iOS app
- `npm run web` - Start the web version

## Building for Production

### Web
```bash
npm run build:web
```

### Android
```bash
eas build -p android --profile preview
```

## Technologies Used

- React Native
- Expo
- React Navigation
- Expo Camera
- Expo Image Picker
- Expo Media Library
- React Native Reanimated

## License

MIT 