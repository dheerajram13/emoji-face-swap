import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { tokens } from '../../design/tokens';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onPress,
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  ...props
}) => {
  const variants = {
    primary: {
      backgroundColor: tokens.colors.primary,
      borderColor: tokens.colors.primary,
    },
    secondary: {
      backgroundColor: tokens.colors.secondary,
      borderColor: tokens.colors.secondary,
    },
    accent: {
      backgroundColor: tokens.colors.accent,
      borderColor: tokens.colors.accent,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: tokens.colors.primary,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
  };

  const sizes = {
    sm: {
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      ...tokens.fonts.caption,
    },
    md: {
      paddingVertical: tokens.spacing.md,
      paddingHorizontal: tokens.spacing.lg,
      ...tokens.fonts.body,
    },
    lg: {
      paddingVertical: tokens.spacing.lg,
      paddingHorizontal: tokens.spacing.xl,
      ...tokens.fonts.subheading,
    },
  };

  return (
    <TouchableOpacity
      style={[
        {
          borderRadius: tokens.radius.btn,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: disabled ? 0.6 : 1,
          ...variants[variant],
          ...sizes[size],
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'ghost' || variant === 'outline' ? tokens.colors.primary : tokens.colors.white} 
          size="small" 
        />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={20}
              color={variant === 'ghost' || variant === 'outline' ? tokens.colors.primary : tokens.colors.white}
              style={{ marginRight: tokens.spacing.sm }}
            />
          )}
          <Text
            style={[
              {
                color: variant === 'ghost' || variant === 'outline' ? tokens.colors.primary : tokens.colors.white,
                fontWeight: '600',
                textAlign: 'center',
              },
              textStyle,
            ]}
          >
            {children}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
