// components/ConfirmationModal.tsx

import { AppTheme } from '@/constants/theme';
import { Box, Button, ButtonText, HStack, Text, VStack } from '@gluestack-ui/themed';
import { Modal } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from './ThemeProvider';

interface ConfirmationModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  confirmColor?: string;
  icon?: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  confirmColor = AppTheme.colors.error[500],
  icon = "logout"
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
          backgroundColor={isDark ? AppTheme.colors.gray[900] : "#ffffff"}
          borderRadius={AppTheme.borderRadius.xl}
          p={AppTheme.spacing.xl}
          w="100%"
          maxWidth={320}
        >
          <VStack alignItems="center" mb={AppTheme.spacing.lg}>
            <Box
              w={60}
              h={60}
              backgroundColor={confirmColor}
              borderRadius={AppTheme.borderRadius.xl}
              alignItems="center"
              justifyContent="center"
              mb={AppTheme.spacing.md}
            >
              <Icon name={icon} size={28} color="#ffffff" />
            </Box>

            <Text
              fontSize={AppTheme.typography.fontSizes.lg}
              fontWeight="700"
              color={isDark ? AppTheme.colors.gray[100] : AppTheme.colors.gray[900]}
              textAlign="center"
              mb={AppTheme.spacing.sm}
            >
              {title}
            </Text>

            <Text
              fontSize={AppTheme.typography.fontSizes.sm}
              color={isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[600]}
              textAlign="center"
              lineHeight={20}
            >
              {message}
            </Text>
          </VStack>

          <HStack space="sm">
            <Button
              flex={1}
              backgroundColor={AppTheme.colors.gray[300]}
              borderRadius={AppTheme.borderRadius.lg}
              h={48}
              onPress={onClose}
            >
              <ButtonText color={AppTheme.colors.gray[700]} fontWeight="600">
                Cancel
              </ButtonText>
            </Button>

            <Button
              flex={1}
              backgroundColor={confirmColor}
              borderRadius={AppTheme.borderRadius.lg}
              h={48}
              onPress={onConfirm}
            >
              <ButtonText color="#ffffff" fontWeight="600">
                {confirmText}
              </ButtonText>
            </Button>
          </HStack>
        </Box>
      </Box>
    </Modal>
  );
};
