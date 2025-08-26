// components/AboutQVuewModal.tsx

import { AppTheme } from '@/constants/theme';
import { Box, Heading, HStack, Pressable, ScrollView, Text, VStack } from '@gluestack-ui/themed';
import { Modal, Dimensions } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from './ThemeProvider';

const { height: screenHeight } = Dimensions.get("window");

interface AboutQVuewModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const AboutQVuewModal: React.FC<AboutQVuewModalProps> = ({
  isVisible,
  onClose,
}) => {
  const { isDark } = useTheme();

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <Box flex={1} backgroundColor="rgba(0,0,0,0.5)" justifyContent="flex-end">
        <Box
          backgroundColor={isDark ? AppTheme.colors.gray[900] : "#fff"}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
          height={screenHeight * 0.88}
        >
          {/* Header */}
          <Box backgroundColor={AppTheme.colors.blue[600]} borderTopLeftRadius={20} borderTopRightRadius={20} p={AppTheme.spacing.lg}>
            <HStack justifyContent="space-between" alignItems="center">
              <Text
                fontSize={AppTheme.typography.fontSizes.lg}
                fontWeight="700"
                color="#fff"
              >
                About QVuew
              </Text>
              <Pressable onPress={onClose} p={AppTheme.spacing.xs}>
                <Icon name="close" size={24} color="#fff" />
              </Pressable>
            </HStack>
          </Box>

          {/* Content */}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: AppTheme.spacing.lg }}
            showsVerticalScrollIndicator={false}
          >
            <VStack alignItems="center" mb={AppTheme.spacing.lg}>
              {/* App Logo Icon */}
              <Box
                w={64}
                h={64}
                backgroundColor={AppTheme.colors.blue[100]}
                borderRadius={AppTheme.borderRadius.xl}
                alignItems="center"
                justifyContent="center"
                mb={AppTheme.spacing.md}
              >
                <Icon name="qr-code" size={38} color={AppTheme.colors.blue[600]} />
              </Box>
              <Heading size="lg" color={isDark ? "#fff" : AppTheme.colors.blue[900]} mb={AppTheme.spacing.xs}>
                QVuew
              </Heading>
              <Text
                color={AppTheme.colors.gray[500]}
                fontSize={AppTheme.typography.fontSizes.md}
                mb={AppTheme.spacing.xl}
              >
                Version 2.1.0
              </Text>
            </VStack>

            <VStack space="md">
              {/* What is QVuew section */}
              <Box backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.blue[50]} borderRadius={AppTheme.borderRadius.lg} p={AppTheme.spacing.lg}>
                <Text fontWeight="700" color={isDark ? "#fff" : AppTheme.colors.gray[900]} mb={AppTheme.spacing.xs}>
                  What is QVuew?
                </Text>
                <Text
                  color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[600]}
                  fontSize={AppTheme.typography.fontSizes.md}
                >
                  QVuew is a revolutionary queue management system that allows you to join queues digitally, track your position in real-time, and receive notifications when it’s your turn.
                </Text>
              </Box>

              {/* Key Features section */}
              <Box backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.blue[50]} borderRadius={AppTheme.borderRadius.lg} p={AppTheme.spacing.lg}>
                <Text fontWeight="700" color={isDark ? "#fff" : AppTheme.colors.gray[900]} mb={AppTheme.spacing.xs}>
                  Key Features
                </Text>
                <VStack space="xs">
                  <Text color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}>
                    • QR Code scanning for instant queue joining
                  </Text>
                  <Text color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}>
                    • Real-time queue position tracking
                  </Text>
                  <Text color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}>
                    • Push notifications for queue updates
                  </Text>
                  <Text color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}>
                    • Service selection and pricing transparency
                  </Text>
                  <Text color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}>
                    • Business discovery and reviews
                  </Text>
                </VStack>
              </Box>

              {/* Company Info section */}
              <Box backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.blue[50]} borderRadius={AppTheme.borderRadius.lg} p={AppTheme.spacing.lg}>
                <Text fontWeight="700" color={isDark ? "#fff" : AppTheme.colors.gray[900]} mb={AppTheme.spacing.xs}>
                  Company Info
                </Text>
                <Text color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}>
                  © 2024 QVuew Technologies Pvt. Ltd.
                  {'\n'}Developed in Mumbai, India
                </Text>
              </Box>
            </VStack>
          </ScrollView>
        </Box>
      </Box>
    </Modal>
  );
};
