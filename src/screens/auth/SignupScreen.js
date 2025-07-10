import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { tokens } from '../../design/tokens';
import Button from '../../components/ui/Button';

const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { signup } = useAuth();

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    try {
      const result = await signup(email, password, name);
      if (!result.success) {
        Alert.alert('Signup Failed', result.error || 'An error occurred');
      }
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Fill in your details to get started</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              placeholderTextColor={tokens.colors.gray}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor={tokens.colors.gray}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Create a password"
              placeholderTextColor={tokens.colors.gray}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Text style={styles.hintText}>
              Must be at least 6 characters
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              placeholderTextColor={tokens.colors.gray}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>

          <Button
            onPress={handleSignup}
            loading={isLoading}
            disabled={isLoading}
            style={styles.signupButton}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By signing up, you agree to our{' '}
              <Text style={styles.linkText}>Terms of Service</Text> and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButton, { marginTop: 12 }]}>
              <Text style={styles.socialButtonText}>Continue with Apple</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: tokens.spacing.lg,
  },
  header: {
    marginTop: tokens.spacing.xl,
    marginBottom: tokens.spacing.xl,
  },
  title: {
    ...tokens.fonts.displayLg,
    color: tokens.colors.text,
    fontWeight: '700',
    marginBottom: tokens.spacing.xs,
  },
  subtitle: {
    ...tokens.fonts.body,
    color: tokens.colors.gray,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: tokens.spacing.lg,
  },
  label: {
    ...tokens.fonts.body,
    color: tokens.colors.text,
    marginBottom: tokens.spacing.sm,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    padding: tokens.spacing.md,
    fontSize: 16,
    color: tokens.colors.text,
    backgroundColor: tokens.colors.white,
  },
  hintText: {
    ...tokens.fonts.caption,
    color: tokens.colors.gray,
    marginTop: tokens.spacing.xs,
  },
  signupButton: {
    marginTop: tokens.spacing.md,
  },
  termsContainer: {
    marginVertical: tokens.spacing.lg,
  },
  termsText: {
    ...tokens.fonts.caption,
    color: tokens.colors.gray,
    textAlign: 'center',
    lineHeight: 20,
  },
  linkText: {
    color: tokens.colors.primary,
    textDecorationLine: 'underline',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: tokens.spacing.xl,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: tokens.colors.border,
  },
  dividerText: {
    ...tokens.fonts.caption,
    color: tokens.colors.gray,
    paddingHorizontal: tokens.spacing.md,
  },
  socialButtonsContainer: {
    marginBottom: tokens.spacing.xl,
  },
  socialButton: {
    backgroundColor: tokens.colors.white,
    borderWidth: 1,
    borderColor: tokens.colors.border,
    borderRadius: tokens.radius.md,
    padding: tokens.spacing.md,
    alignItems: 'center',
  },
  socialButtonText: {
    ...tokens.fonts.body,
    color: tokens.colors.text,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: tokens.spacing.xl,
  },
  footerText: {
    ...tokens.fonts.body,
    color: tokens.colors.gray,
  },
  footerLink: {
    ...tokens.fonts.body,
    color: tokens.colors.primary,
    fontWeight: '600',
  },
});

export default SignupScreen;
