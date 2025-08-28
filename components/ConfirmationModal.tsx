// components/ConfirmationModal.tsx

import { AppTheme } from '@/constants/theme';
import { Box, Button, ButtonText, HStack, Text, VStack } from '@gluestack-ui/themed';
import React, { ReactNode } from 'react';
import { Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from './ThemeProvider';

interface ConfirmationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;

  // 🎨 Customization
  confirmColor?: string;
  cancelColor?: string;
  backgroundColor?: string;
  titleColor?: string;
  messageColor?: string;

  // 🔔 Icon
  icon?: string; // MaterialIcons name
  iconElement?: ReactNode; // custom element instead of icon name
  iconBackgroundColor?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = AppTheme.colors.error[500],
  cancelColor = AppTheme.colors.gray[300],
  backgroundColor,
  titleColor,
  messageColor,
  icon = "help-outline",
  iconElement,
  iconBackgroundColor,
}) => {
  const { isDark } = useTheme();

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <Box flex={1} backgroundColor="rgba(0,0,0,0.5)" justifyContent="center" alignItems="center" px={AppTheme.spacing.lg}>
        <Box
          backgroundColor={backgroundColor || (isDark ? AppTheme.colors.gray[900] : "#ffffff")}
          borderRadius={AppTheme.borderRadius.xl}
          p={AppTheme.spacing.xl}
          w="100%"
          maxWidth={320}
        >
          <VStack alignItems="center" mb={AppTheme.spacing.lg}>
            <Box
              w={60}
              h={60}
              backgroundColor={iconBackgroundColor || confirmColor}
              borderRadius={AppTheme.borderRadius.xl}
              alignItems="center"
              justifyContent="center"
              mb={AppTheme.spacing.md}
            >
              {iconElement ? iconElement : <Icon name={icon} size={28} color="#ffffff" />}
            </Box>

            <Text
              fontSize={AppTheme.typography.fontSizes.lg}
              fontWeight="700"
              color={titleColor || (isDark ? AppTheme.colors.gray[100] : AppTheme.colors.gray[900])}
              textAlign="center"
              mb={AppTheme.spacing.sm}
            >
              {title}
            </Text>

            <Text
              fontSize={AppTheme.typography.fontSizes.sm}
              color={messageColor || (isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600])}
              textAlign="center"
              lineHeight={20}
            >
              {message}
            </Text>
          </VStack>

          <HStack space="sm">
            <Button
              flex={1}
              backgroundColor={cancelColor}
              borderRadius={AppTheme.borderRadius.lg}
              mr={AppTheme.spacing.sm}
              
              h={56}
              
              onPress={onClose}
            >
              <ButtonText color={AppTheme.colors.gray[700]} fontWeight="600" textAlign="center">
                {cancelText}
              </ButtonText>
            </Button>

            <Button
              flex={1}
              backgroundColor={confirmColor}
              borderRadius={AppTheme.borderRadius.lg}
              mr={AppTheme.spacing.sm}
              
              h={56}
              onPress={onConfirm}
            >
              <ButtonText color="#ffffff" fontWeight="600" textAlign="center">
                {confirmText}
              </ButtonText>
            </Button>
          </HStack>
        </Box>
      </Box>
    </Modal>
  );
};
