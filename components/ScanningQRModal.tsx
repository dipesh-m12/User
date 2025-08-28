// components/ScanningQRModal.tsx
import { AppTheme } from '@/constants/theme';
import { Box, Text, VStack, Pressable } from '@gluestack-ui/themed';
import React from 'react';
import { Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ScanningQRModalProps {
  visible: boolean;
  onCancel: () => void;
}

export const ScanningQRModal: React.FC<ScanningQRModalProps> = ({ visible, onCancel }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Box
        flex={1}
        backgroundColor="rgba(0,0,0,0.85)"
        alignItems="center"
        justifyContent="center"
        px={AppTheme.spacing.lg}
      >
        <Box
          backgroundColor="#ffffff"
          borderRadius={24}
          w="85%"
          maxWidth={320}
          px={AppTheme.spacing.xl}
          py={AppTheme.spacing['2xl']}
          alignItems="center"
          shadowColor="#000000"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.15}
          shadowRadius={8}
          elevation={6}
        >
          {/* Camera Icon */}
          <Box
            backgroundColor={AppTheme.colors.blue[100]}
            p={16}
            borderRadius={16}
            mb={AppTheme.spacing.md}
          >
            <Icon name="photo-camera" size={32} color={AppTheme.colors.blue[600]} />
          </Box>

          {/* Title */}
          <Text
            fontWeight="700"
            fontSize={20}
            color={AppTheme.colors.blue[900]}
            mb={AppTheme.spacing.sm}
          >
            Scanning QR Code
          </Text>

          {/* Subtitle */}
          <Text
            color={AppTheme.colors.gray[600]}
            fontSize={16}
            textAlign="center"
            mb={AppTheme.spacing.lg}
          >
            Position the QR code within the camera frame
          </Text>

          {/* Scanning Animation Placeholder */}
          <Box
            backgroundColor={AppTheme.colors.blue[50]}
            borderRadius={12}
            w={80}
            h={80}
            mb={AppTheme.spacing.xl}
            alignItems="center"
            justifyContent="center"
          >
            <Box
              backgroundColor={AppTheme.colors.blue[200]}
              borderRadius={8}
              w={60}
              h={60}
            />
          </Box>

          {/* Cancel Button */}
          <Pressable
            onPress={onCancel}
            backgroundColor={AppTheme.colors.gray[200]}
            borderRadius={AppTheme.borderRadius.lg}
            py={12}
            px={36}
            w="100%"
            alignItems="center"
          >
            <Text color={AppTheme.colors.gray[700]} fontWeight="700">
              Cancel Scan
            </Text>
          </Pressable>
        </Box>
      </Box>
    </Modal>
  );
};
//