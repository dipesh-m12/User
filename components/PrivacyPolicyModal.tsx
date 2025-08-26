// components/PrivacyPolicyModal.tsx

import { AppTheme } from '@/constants/theme';
import { Box, Heading, HStack, Pressable, ScrollView, Text, VStack } from '@gluestack-ui/themed';
import { Modal, Dimensions } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from './ThemeProvider';

const { height: screenHeight } = Dimensions.get("window");

interface PrivacyPolicyModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
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
          height={screenHeight * 0.9}
        >
          {/* Header with Purple Background */}
          <Box 
            backgroundColor={AppTheme.colors.purple[600]} 
            borderTopLeftRadius={20} 
            borderTopRightRadius={20} 
            p={AppTheme.spacing.lg}
          >
            <HStack justifyContent="space-between" alignItems="center">
              <Text
                fontSize={AppTheme.typography.fontSizes.lg}
                fontWeight="700"
                color="#fff"
              >
                Privacy Policy
              </Text>
              <Pressable onPress={onClose} p={AppTheme.spacing.xs}>
                <Icon name="close" size={24} color="#fff" />
              </Pressable>
            </HStack>
          </Box>

          {/* Content */}
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ padding: AppTheme.spacing.lg, paddingBottom: AppTheme.spacing.xl }}
            showsVerticalScrollIndicator={false}
          >
            <VStack space="lg">

              {/* Last Updated */}
              <Box>
                <Text 
                  fontSize={AppTheme.typography.fontSizes.md}
                  fontWeight="700" 
                  color={isDark ? "#fff" : AppTheme.colors.gray[900]}
                  mb={AppTheme.spacing.xs}
                >
                  Last Updated: December 2024
                </Text>
                <Text
                  fontSize={AppTheme.typography.fontSizes.sm}
                  color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[600]}
                  lineHeight={20}
                >
                  QVuew Technologies respects your privacy and is committed to protecting your personal data.
                </Text>
              </Box>

              {/* Information We Collect */}
              <Box 
                backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.purple[50]} 
                borderRadius={AppTheme.borderRadius.lg} 
                p={AppTheme.spacing.lg}
              >
                <Text 
                  fontSize={AppTheme.typography.fontSizes.md}
                  fontWeight="700" 
                  color={isDark ? "#fff" : AppTheme.colors.gray[900]}
                  mb={AppTheme.spacing.sm}
                >
                  Information We Collect
                </Text>
                <VStack space="xs">
                  <Text 
                    fontSize={AppTheme.typography.fontSizes.sm}
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  >
                    • Personal information (name, email, phone number)
                  </Text>
                  <Text 
                    fontSize={AppTheme.typography.fontSizes.sm}
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  >
                    • Location data (when using location services)
                  </Text>
                  <Text 
                    fontSize={AppTheme.typography.fontSizes.sm}
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  >
                    • Queue and service usage data
                  </Text>
                  <Text 
                    fontSize={AppTheme.typography.fontSizes.sm}
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  >
                    • Device information and app usage analytics
                  </Text>
                </VStack>
              </Box>

              {/* How We Use Your Data */}
              <Box 
                backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.purple[50]} 
                borderRadius={AppTheme.borderRadius.lg} 
                p={AppTheme.spacing.lg}
              >
                <Text 
                  fontSize={AppTheme.typography.fontSizes.md}
                  fontWeight="700" 
                  color={isDark ? "#fff" : AppTheme.colors.gray[900]}
                  mb={AppTheme.spacing.sm}
                >
                  How We Use Your Data
                </Text>
                <VStack space="xs">
                  <Text 
                    fontSize={AppTheme.typography.fontSizes.sm}
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  >
                    • To provide queue management services
                  </Text>
                  <Text 
                    fontSize={AppTheme.typography.fontSizes.sm}
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  >
                    • To send notifications about your queue status
                  </Text>
                  <Text 
                    fontSize={AppTheme.typography.fontSizes.sm}
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  >
                    • To improve our services and user experience
                  </Text>
                  <Text 
                    fontSize={AppTheme.typography.fontSizes.sm}
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  >
                    • To ensure security and prevent fraud
                  </Text>
                </VStack>
              </Box>

              {/* Data Protection */}
              <Box 
                backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.purple[50]} 
                borderRadius={AppTheme.borderRadius.lg} 
                p={AppTheme.spacing.lg}
              >
                <Text 
                  fontSize={AppTheme.typography.fontSizes.md}
                  fontWeight="700" 
                  color={isDark ? "#fff" : AppTheme.colors.gray[900]}
                  mb={AppTheme.spacing.sm}
                >
                  Data Protection
                </Text>
                <Text
                  fontSize={AppTheme.typography.fontSizes.sm}
                  color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  lineHeight={20}
                >
                  We implement industry-standard security measures to protect your data. Your information is encrypted and stored securely on our servers.
                </Text>
              </Box>

              {/* Your Rights */}
              <Box 
                backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.purple[50]} 
                borderRadius={AppTheme.borderRadius.lg} 
                p={AppTheme.spacing.lg}
              >
                <Text 
                  fontSize={AppTheme.typography.fontSizes.md}
                  fontWeight="700" 
                  color={isDark ? "#fff" : AppTheme.colors.gray[900]}
                  mb={AppTheme.spacing.sm}
                >
                  Your Rights
                </Text>
                <VStack space="xs">
                  <Text 
                    fontSize={AppTheme.typography.fontSizes.sm}
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  >
                    • Access your personal data
                  </Text>
                  <Text 
                    fontSize={AppTheme.typography.fontSizes.sm}
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  >
                    • Request data correction or deletion
                  </Text>
                  <Text 
                    fontSize={AppTheme.typography.fontSizes.sm}
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  >
                    • Opt-out of marketing communications
                  </Text>
                  <Text 
                    fontSize={AppTheme.typography.fontSizes.sm}
                    color={isDark ? AppTheme.colors.gray[300] : AppTheme.colors.gray[700]}
                  >
                    • Data portability rights
                  </Text>
                </VStack>
              </Box>

              {/* Contact Information */}
              <Box 
                backgroundColor={isDark ? AppTheme.colors.gray[800] : AppTheme.colors.purple[50]} 
                borderRadius={AppTheme.borderRadius.lg} 
                p={AppTheme.spacing.lg}
              >
                <Text 
                  fontSize={AppTheme.typography.fontSizes.md}
                  fontWeight="700" 
                  color={isDark ? "#fff" : AppTheme.colors.gray[900]}
                  mb={AppTheme.spacing.sm}
                >
                  Contact Us
                </Text>
                <Text
                  fontSize={AppTheme.typography.fontSizes.sm}
                  color={AppTheme.colors.purple[600]}
                  lineHeight={20}
                >
                  For privacy-related questions, contact us at{'\n'}privacy@qvuew.com
                </Text>
              </Box>

              {/* Company Info */}
              <Box>
                <Text
                  fontSize={AppTheme.typography.fontSizes.xs}
                  color={isDark ? AppTheme.colors.gray[500] : AppTheme.colors.gray[500]}
                  textAlign="center"
                  mt={AppTheme.spacing.lg}
                >
                  © 2024 QVuew Technologies Pvt. Ltd.{'\n'}
                  Mumbai, India
                </Text>
              </Box>

            </VStack>
          </ScrollView>
        </Box>
      </Box>
    </Modal>
  );
};
