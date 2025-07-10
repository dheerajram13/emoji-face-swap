import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { tokens } from '../../design/tokens';

const Card = ({
  children,
  onPress,
  style,
  variant = 'elevated',
  ...props
}) => {
  const variants = {
    elevated: {
      backgroundColor: tokens.colors.white,
      borderRadius: tokens.radius.card,
      padding: tokens.spacing.md,
      shadowColor: tokens.colors.text,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    outlined: {
      backgroundColor: tokens.colors.white,
      borderRadius: tokens.radius.card,
      borderWidth: 1,
      borderColor: tokens.colors.gray,
      padding: tokens.spacing.md,
    },
    filled: {
      backgroundColor: tokens.colors.grayLight,
      borderRadius: tokens.radius.card,
      padding: tokens.spacing.md,
    },
  };

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={[variants[variant], style]}
      onPress={onPress}
      activeOpacity={0.8}
      {...props}
    >
      {children}
    </Container>
  );
};

export default Card;
