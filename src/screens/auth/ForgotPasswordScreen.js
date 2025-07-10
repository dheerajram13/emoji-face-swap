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
import { tokens } from '../../design/tokens';
import Button from '../../components/ui/Button';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsEmailSent(true);
    } catch (error) {
      console.error('Error sending reset email:', error);
      Alert.alert('Error', 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>📧</Text>
          </View>
          <Text style={styles.title}>Check Your Email</Text>
          <Text style={styles.subtitle}>
            We've sent a password reset link to
          </Text>
          <Text style={styles.emailText}>{email}</Text>
          <Text style={styles.instructions}>
            Please check your email and follow the instructions to reset your password.
          </Text>
          
          <Button
            onPress={() => navigation.goBack()}
            style={styles.button}
            variant="primary"
          >
            Back to Login
          </Button>
          
          <View style={styles.footer}>
            <Text style={styles.footerText}>Didn't receive the email? </Text>
            <TouchableOpacity onPress={handleResetPassword} disabled={isLoading}>
              <Text style={styles.resendLink}>
                {isLoading ? 'Sending...' : 'Resend'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

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
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🔒</Text>
          </View>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.subtitle}>
            Enter the email associated with your account and we'll send you a link to reset your password.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
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

          <Button
            onPress={handleResetPassword}
            loading={isLoading}
            disabled={isLoading}
            style={styles.button}
            variant="primary"
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </Button>

          <TouchableOpacity
            style={styles.backToLoginButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backToLoginText}>
              Back to Login
            </Text>
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
  },
  content: {
    flex: 1,
    padding: tokens.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: tokens.colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: tokens.spacing.xl,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    ...tokens.fonts.displayMd,
    color: tokens.colors.text,
    fontWeight: '700',
    marginBottom: tokens.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...tokens.fonts.body,
    color: tokens.colors.gray,
    textAlign: 'center',
    marginBottom: tokens.spacing.xl,
    lineHeight: 22,
  },
  inputContainer: {
    width: '100%',
    marginBottom: tokens.spacing.xl,
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
  button: {
    width: '100%',
    marginBottom: tokens.spacing.lg,
  },
  backToLoginButton: {
    padding: tokens.spacing.sm,
  },
  backToLoginText: {
    ...tokens.fonts.body,
    color: tokens.colors.primary,
    fontWeight: '600',
  },
  emailText: {
    ...tokens.fonts.body,
    color: tokens.colors.text,
    fontWeight: '600',
    marginVertical: tokens.spacing.sm,
  },
  instructions: {
    ...tokens.fonts.body,
    color: tokens.colors.gray,
    textAlign: 'center',
    marginBottom: tokens.spacing.xl,
    lineHeight: 22,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingTop: tokens.spacing.xl,
  },
  footerText: {
    ...tokens.fonts.body,
    color: tokens.colors.gray,
  },
  resendLink: {
    ...tokens.fonts.body,
    color: tokens.colors.primary,
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen;
